import clsx from 'clsx';
import { Text } from '../Text';

export interface Props<Option> {
  getDisplayValue: (option: Option) => string;
  option: Option;
  selected: boolean;
  active: boolean;
}

export function ComboboxOption<Option>(props: Props<Option>) {
  return (
    <div className={clsx('rounded-md p-2 bg-white cursor-pointer', (props.selected || props.active) && 'bg-gray-100')}>
      <Text className="truncate">{props.getDisplayValue(props.option)}</Text>
    </div>
  );
}
