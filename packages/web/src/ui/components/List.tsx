interface Props<Option> {
  options: Option[] | readonly Option[];
  renderItem: (item: Option, index: number) => React.ReactNode;
  Empty?: React.ReactNode;
}

export function List<Option>(props: Props<Option>) {
  const isEmpty = props.options.length === 0;
  if (isEmpty) {
    return <>{props.Empty ?? null}</>;
  }

  return <div className="space-y-2">{props.options.map((item, index) => props.renderItem(item, index))}</div>;
}
