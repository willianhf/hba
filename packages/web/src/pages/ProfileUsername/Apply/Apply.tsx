import { Icon, Position, useAuth, useDebounce, useIcons, usePositions, usePreviousPath } from '@/hooks';
import { parseErrorsFromAPI } from '@/lib/formik';
import { DeepNonNullable } from '@/types/helpers';
import { BackButton, Button, Card, Combobox, Form, Select, Text } from '@/ui/components';
import clsx from 'clsx';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { graphql, useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { ConnectionHandler } from 'relay-runtime';
import { match } from 'ts-pattern';
import * as Yup from 'yup';
import { useNBAPlayers, type NBAPlayer } from './useNBAPlayers';
import { Apply_createPlayerMutation } from './__generated__/apply_createPlayerMutation.graphql';

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
  mutation Apply_createPlayerMutation($input: CreatePlayerInput!, $connections: [ID!]!) {
    createPlayer(input: $input) {
      __typename
      ... on CreatePlayerPayload {
        player @prependNode(connections: $connections, edgeTypeName: "UserPlayersConnectionEdge") {
          id
          ...PlayerFragment_player
          user {
            canRequestPlayer
          }
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

export function Apply() {
  const [playerSearch, setPlayerSearch] = useState('');
  const debouncedPlayerSearch = useDebounce(playerSearch);

  const [nbaPlayers, isNBAPlayersLoading] = useNBAPlayers(debouncedPlayerSearch);
  const icons = useIcons();
  const positions = usePositions();

  const [createPlayer, isInFlight] = useMutation<Apply_createPlayerMutation>(CREATE_PLAYER_MUTATION);

  const navigate = useNavigate();
  const previousPath = usePreviousPath();
  const auth = useAuth();

  function onCreatePlayerSuccess() {
    toast.success('Inscrição enviada com sucesso. Agora é só aguardar a aprovação de um administrador.');
    navigate('/players', { replace: true });
  }

  function onCreatePlayerFailure(message: string) {
    toast.error(message);
  }

  function onSubmit(
    values: DeepNonNullable<PlayerRegisterFormValues>,
    helpers: FormikHelpers<PlayerRegisterFormValues>
  ) {
    const playersConnectionId = ConnectionHandler.getConnectionID(auth.user!.id, 'Profile_players');

    createPlayer({
      variables: {
        input: {
          nbaPlayerId: values.player.id,
          positionId: values.position?.id,
          iconsIds: values.icons.map(icon => icon.id)
        },
        connections: [playersConnectionId]
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
      <div className="flex items-center mb-2">
        <BackButton to={previousPath} />
        <Text as="h1" variant="title">
          Inscreva-se
        </Text>
      </div>
      <Card>
        <Form initialValues={initialFormValues} onSubmit={onSubmit} validationSchema={playerRegisterSchema}>
          <div className="space-y-2 mb-4">
            <Combobox
              label="Jogador"
              name="player"
              inputPlaceholder="Buscar jogador"
              options={nbaPlayers}
              getDisplayValue={option => (option ? `${option?.firstName} ${option?.lastName}` : '')}
              getKey={option => option.id}
              search={debouncedPlayerSearch}
              onSearchChange={setPlayerSearch}
              isLoading={isNBAPlayersLoading}
              renderItem={optionProps => (
                <div
                  className={clsx(
                    'rounded-md p-2 bg-white cursor-pointer flex items-center',
                    (optionProps.selected || optionProps.active) && 'bg-gray-100'
                  )}
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 relative z-0 mr-2">
                    <img src={optionProps.option.imageUrl} className="h-8 object-cover absolute bottom-0" />
                  </div>
                  <Text className="truncate">{optionProps.getDisplayValue(optionProps.option)}</Text>
                </div>
              )}
            />
            <Select
              label="Posição"
              name="position"
              placeholder="Escolha sua posição"
              options={positions}
              getDisplayValue={option => option?.name ?? ''}
              getValue={option => option?.id}
              renderItem={optionProps => <span>{optionProps.option.name}</span>}
            />
            <Select
              label="Ícones"
              name="icons"
              placeholder="Selecione dois ícones"
              options={icons}
              getDisplayValue={option => option?.name ?? ''}
              getValue={option => option?.id}
              isMultiple
              renderItem={optionProps => <span>{optionProps.option.name}</span>}
            />
          </div>
          <Button type="submit" colorScheme="blue" fillParent isLoading={isInFlight}>
            Inscrever-se
          </Button>
        </Form>
      </Card>
    </div>
  );
}
