import { parseErrorsFromAPI } from '@/lib/formik';
import { Button, Card, DateInput, Form, Select, Text } from '@/ui/components';
import { FormikHelpers } from 'formik';
import { Suspense } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { match } from 'ts-pattern';
import { date, InferType, object, string, StringSchema } from 'yup';
import { useMatchRegisterMutation } from './MatchRegisterMutation';
import { MatchKind, Teams, useMatchRegisterQuery } from './MatchRegisterQuery';

const matchRegisterSchema = object({
  matchKind: string().required('O tipo da partida é obrigatório') as StringSchema<MatchKind>,
  homeTeam: object({ id: string().defined() }).nullable().required('A equipe da casa é obrigatória'),
  awayTeam: object({ id: string().defined() })
    .nullable()
    .required('A equipe de fora é obrigatória')
    .test('sameTeam', 'A equipe de fora ser diferente da equipe da casa', function (awayTeam) {
      return awayTeam?.id !== this.parent.homeTeam?.id;
    }),
  scheduledTo: date().nullable().typeError('A data informada é inválida')
});

interface TeamSelectProps {
  label: string;
  name: string;
  teams: Teams;
}

function TeamSelection(props: TeamSelectProps) {
  return (
    <Select
      label={props.label}
      name={props.name}
      options={props.teams}
      placeholder="Selecione a equipe"
      getDisplayValue={team => team.nbaTeam.name}
      getValue={team => team.id}
      renderItem={optionProps => (
        <div className="flex items-center">
          <div className="h-7 w-7 rounded-full overflow-hidden bg-gray-200 relative z-0 mr-2">
            <img src={optionProps.option.nbaTeam.imageUrl} className="h-7 object-cover absolute bottom-0" />
          </div>
          <Text variant="small" className="truncate">
            {optionProps.option.nbaTeam.name}
          </Text>
        </div>
      )}
    />
  );
}

function MatchRegisterLazy() {
  const navigate = useNavigate();
  const { matchKinds, teams } = useMatchRegisterQuery();
  const [commit, isInFlight] = useMatchRegisterMutation();

  const initialValues = {
    matchKind: '',
    homeTeam: null,
    awayTeam: null,
    scheduledTo: null
  };

  function onMatchCreated() {
    toast.success('Partida criada com sucesso');
    navigate('/admin/matches');
  }

  function onSubmit(values: InferType<typeof matchRegisterSchema>, helpers: FormikHelpers<any>) {
    commit({
      variables: {
        input: {
          matchKind: values.matchKind,
          homeTeamId: values.homeTeam.id,
          awayTeamId: values.awayTeam.id,
          scheduledTo: values.scheduledTo
        }
      },
      onCompleted: data => {
        match(data.createMatch)
          .with({ __typename: 'CreateMatchPayload' }, onMatchCreated)
          .with({ __typename: 'ValidationInputError' }, error => helpers.setErrors(parseErrorsFromAPI(error.fields)))
          .run();
      }
    });
  }

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} validationSchema={matchRegisterSchema}>
      <Card className="space-y-4">
        <Text as="h2" variant="subtitle">
          Cadastrar partida
        </Text>
        <Select
          label="Tipo de partida"
          name="matchKind"
          placeholder="Selecione o tipo da partida"
          options={matchKinds}
          getDisplayValue={matchKind => matchKind}
          getValue={matchKind => matchKind}
          renderItem={optionProps => optionProps.option}
        />
        <TeamSelection label="Equipe casa" name="homeTeam" teams={teams} />
        <TeamSelection label="Equipe fora" name="awayTeam" teams={teams} />
        <DateInput label="Agendar para" name="scheduledTo" withTime />
        <Button type="submit" disabled={isInFlight} colorScheme="blue" className="ml-auto">
          Cadastrar
        </Button>
      </Card>
    </Form>
  );
}

export function MatchRegister() {
  return (
    <Suspense>
      <MatchRegisterLazy />
    </Suspense>
  );
}
