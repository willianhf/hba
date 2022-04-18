import { Icon, Position, useDebounce, useIcons, usePositions } from '@/hooks';
import { parseErrorsFromAPI } from '@/lib/formik';
import { DeepNonNullable } from '@/types/helpers';
import { Button, Card, Combobox, Form, Select, Text } from '@/ui/components';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { graphql, useMutation } from 'react-relay';
import { match } from 'ts-pattern';
import * as Yup from 'yup';
import { useNBAPlayers, type NBAPlayer } from './useNBAPlayers';
import { Register_createPlayerMutation } from './__generated__/Register_createPlayerMutation.graphql';

interface PlayerRegisterFormValues {
  player: NBAPlayer | null;
  position: Position | null;
  icons: Icon[];
}

const initialFormValues: PlayerRegisterFormValues = {
  player: null,
  position: null,
  icons: []
};

const playerRegisterSchema = Yup.object().shape({
  player: Yup.object().nullable().required('Escolha um jogador da NBA.'),
  position: Yup.object().nullable().required('Escolha uma posição.'),
  icons: Yup.array().length(2, 'Escolha dois ícones.')
});

const CREATE_PLAYER_MUTATION = graphql`
  mutation Register_createPlayerMutation($input: CreatePlayerInput!) {
    createPlayer(input: $input) {
      __typename
      ... on CreatePlayerPayload {
        player {
          id
        }
      }
      ... on ValidationInputError {
        code
        fields {
          field
          message
        }
        message
        name
      }
      ... on ApplicationError {
        message
        name
      }
    }
  }
`;

export function UserPlayerRegister() {
  const [playerSearch, setPlayerSearch] = useState('');
  const debouncedPlayerSearch = useDebounce(playerSearch);

  const [nbaPlayers, isNBAPlayersLoading] = useNBAPlayers(debouncedPlayerSearch);
  const icons = useIcons();
  const positions = usePositions();

  const [commit, isInFlight] = useMutation<Register_createPlayerMutation>(CREATE_PLAYER_MUTATION);

  function onCreatePlayerSuccess() {
    toast.success('Inscrição enviada com sucesso. Agora é só aguardar a aprovação de um administrador.');
  }

  function onCreatePlayerFailure(message: string) {
    toast.error(message);
  }

  function onSubmit(
    values: DeepNonNullable<PlayerRegisterFormValues>,
    helpers: FormikHelpers<PlayerRegisterFormValues>
  ) {
    commit({
      variables: {
        input: {
          nbaPlayerId: values.player.id,
          positionId: values.position?.id,
          iconsIds: values.icons.map(icon => icon.id)
        }
      },
      onCompleted: data => {
        match(data.createPlayer)
          .with({ __typename: 'CreatePlayerPayload' }, onCreatePlayerSuccess)
          .with({ __typename: 'ValidationInputError' }, error => helpers.setErrors(parseErrorsFromAPI(error.fields)))
          .with({ __typename: 'ApplicationError' }, error => onCreatePlayerFailure(error.message))
          .run();
      }
    });
  }

  return (
    <div>
      <Text as="h2" className="mb-1" variant="subtitle">
        Inscreva-se
      </Text>
      <Card>
        <Form initialValues={initialFormValues} onSubmit={onSubmit} validationSchema={playerRegisterSchema}>
          <div className="space-y-2">
            <Combobox
              label="Jogador"
              name="player"
              inputPlaceholder="Buscar jogador"
              options={nbaPlayers}
              getDisplayValue={option => (option ? `${option?.firstName} ${option?.lastName}` : '')}
              getValue={option => option?.id}
              search={debouncedPlayerSearch}
              onSearchChange={setPlayerSearch}
              isLoading={isNBAPlayersLoading}
            />
            <Select
              label="Posição"
              name="position"
              placeholder="Escolha sua posição"
              options={positions}
              getDisplayValue={option => option?.name ?? ''}
              getValue={option => option?.id}
            />
            <Select
              label="Ícones"
              name="icons"
              placeholder="Selecione dois ícones"
              options={icons}
              getDisplayValue={option => option?.name ?? ''}
              getValue={option => option?.id}
              isMultiple
            />
            <Button type="submit" colorScheme="blue" fillParent isLoading={isInFlight}>
              Inscrever-se
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
