export function groupBy<Item, Key extends keyof any>(
  array: Item[],
  keyGetter: (item: Item) => Key
): Record<Key, Item[]> {
  return array.reduce((acc, item) => {
    const key = keyGetter(item);
    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);
    return acc;
  }, {} as Record<Key, Item[]>);
}
