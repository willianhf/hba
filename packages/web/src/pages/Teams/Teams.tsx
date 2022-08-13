import { useDebounce, useNBATeams, useUsers } from '@/hooks';
import { Button, Card, Combobox, Form, Text } from '@/ui/components';
import { useState } from 'react';

function SubCaptainCombobox() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [users, isLoading] = useUsers(debouncedSearch);

  return (
    <Combobox
      name="coCaptain"
      label="Sub-capitão"
      inputPlaceholder="Buscar jogador"
      options={users}
      getDisplayValue={option => option.username}
      getValue={option => option?.id}
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

export function Teams() {
  const [nbaTeamSearch, setNBATeamSearch] = useState('');
  const debouncedNBATeamSearch = useDebounce(nbaTeamSearch);
  const nbaTeams = useNBATeams(debouncedNBATeamSearch);

  async function onSubmit() {}

  return (
    <div className="space-y-2">
      <Text variant="title" as="h1">
        Times
      </Text>
      <Form initialValues={{}} onSubmit={onSubmit}>
        <Card className="space-y-2">
          <Combobox
            name="nbaTeam"
            label="Equipe"
            inputPlaceholder="Buscar time"
            options={nbaTeams}
            getDisplayValue={option => option.name}
            getValue={option => option?.id}
            search={debouncedNBATeamSearch}
            onSearchChange={setNBATeamSearch}
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
          <SubCaptainCombobox />
          <Button type="submit" colorScheme="red" className="ml-auto">Aplicar</Button>
        </Card>
      </Form>
    </div>
  );
}
