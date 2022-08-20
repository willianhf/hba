import { useDebounce, useNBATeams, useSearchUsers } from '@/hooks';
import { parseErrorsFromAPI } from '@/lib/formik';
import { Button, Card, Combobox, Form, Text } from '@/ui/components';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { match } from 'ts-pattern';
import * as Yup from 'yup';
import { APPLY_TEAM_MUTATION } from './ApplyTeamMutation';
import { ApplyTeamMutation } from './__generated__/ApplyTeamMutation.graphql';

function SubCaptainCombobox() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [users, isLoading] = useSearchUsers(debouncedSearch);

  return (
    <Combobox
      name="coCaptainUser"
      label="Sub-capitão"
      inputPlaceholder="Buscar jogador"
      options={users}
      getDisplayValue={option => option.username}
      getKey={option => option.id}
      search={debouncedSearch}
      onSearchChange={setSearch}
      isLoading={isLoading}
      renderItem={optionProps => (
        <div className="flex items-center">
          <Text variant="small" className="truncate">
            {optionProps.getDisplayValue(optionProps.option)}
          </Text>
        </div>
      )}
    />
  );
}

function TeamCombobox() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const nbaTeams = useNBATeams(debouncedSearch);

  return (
    <Combobox
      name="nbaTeam"
      label="Equipe"
      inputPlaceholder="Buscar equipe"
      options={nbaTeams}
      getDisplayValue={option => option.name}
      getKey={option => option.id}
      search={debouncedSearch}
      onSearchChange={setSearch}
      renderItem={optionProps => (
        <div className="flex items-center">
          <div className="h-7 w-7 rounded-full overflow-hidden bg-gray-200 relative z-0 mr-2">
            <img src={optionProps.option.imageUrl} className="h-7 object-cover absolute bottom-0" />
          </div>
          <Text variant="small" className="truncate">
            {optionProps.getDisplayValue(optionProps.option)}
          </Text>
        </div>
      )}
    />
  );
}

interface ApplyTeamForm {
  nbaTeam: any;
  coCaptainUser: any;
}

const applyTeamSchema = Yup.object().shape({
  nbaTeam: Yup.object({ id: Yup.string().required() }).nullable().required('A equipe é obrigatória.'),
  coCaptainUser: Yup.object({ id: Yup.string().required() }).nullable().required('O sub-capitão é obrigatório.')
});

export function ApplyTeam() {
  const [commit, isInFlight] = useMutation<ApplyTeamMutation>(APPLY_TEAM_MUTATION);
  const navigate = useNavigate();

  function onApplyTeamSuccess() {
    toast.success('Inscrição enviada com sucesso. Agora é só aguardar a aprovação de um administrador.');
    navigate('/teams', { replace: true });
  }

  function onApplyTeamFailure(message: string) {
    toast.error(message);
  }

  async function onSubmit(values: Yup.InferType<typeof applyTeamSchema>, helpers: FormikHelpers<ApplyTeamForm>) {
    commit({
      variables: {
        input: {
          nbaTeamId: values.nbaTeam.id,
          coCaptainUserId: values.coCaptainUser.id
        }
      },
      onCompleted: data => {
        match(data.applyTeam)
          .with({ __typename: 'ApplyTeamPayload' }, onApplyTeamSuccess)
          .with({ __typename: 'ValidationError' }, error => onApplyTeamFailure(error.message))
          .with({ __typename: 'ValidationInputError' }, error => helpers.setErrors(parseErrorsFromAPI(error.fields)))
          .run();
      }
    });
  }

  return (
    <div className="space-y-2">
      <Text variant="title" as="h1">
        Inscrever equipe
      </Text>
      <Form
        initialValues={{ nbaTeam: null, coCaptainUser: null }}
        onSubmit={onSubmit}
        validationSchema={applyTeamSchema}
      >
        <Card className="space-y-2">
          <TeamCombobox />
          <SubCaptainCombobox />
          <Button type="submit" colorScheme="red" fillParent isLoading={isInFlight}>
            Aplicar
          </Button>
        </Card>
      </Form>
    </div>
  );
}

