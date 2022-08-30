import clsx from 'clsx';

interface Props {
  active: boolean;
  selected: boolean;
  children: React.ReactNode;
}

export interface OptionProps<Option> {
  getDisplayValue: (option: Option) => string;
  option: Option;
  selected: boolean;
  active: boolean;
}

export function ComboboxOption(props: Props) {
  return (
    <div
      className={clsx(
        'outline-none select-none cursor-pointer',
        'px-3 py-1',
        'rounded-md',
        (props.active || props.selected) && 'bg-gray-100/75'
      )}
    >
      {props.children}
    </div>
  );
}
