import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Team } from "../types";
import { teams } from "../utils/teams";
import clsx from "clsx";
import { Fragment, useState } from "react";

interface Props {
  onSelect: (selected: Team) => void;
}

export function TeamSelector(props: Props): JSX.Element {
  const [selected, setSelected] = useState<Team | null>(null);

  function onSelect(team: Team) {
    setSelected(team);
    props.onSelect(team);
  }

  return (
    <Listbox value={selected} onChange={onSelect}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-zinc-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm text-white">
          <span className="block truncate">{selected?.name ?? "Selecione a equipe"}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-zinc-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {teams.map((team) => (
              <Listbox.Option
                key={team.name}
                className={({ active }) =>
                  clsx("relative cursor-pointer select-none py-2 pl-10 pr-4 text-white", active && "bg-zinc-600")
                }
                value={team}
              >
                {({ selected }) => (
                  <>
                    <span className={clsx("block truncate", selected ? "font-medium" : "font-normal")}>
                      {team.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-300">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
