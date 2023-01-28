export class Helpers {
  public static groupBy<T>(arr: T[], selector: (item: T) => any): Record<any, T[]> {
    return arr.reduce((acc, item) => {
      const key = selector(item);
      const group = acc[key] || [];
      group.push(item);

      return { ...acc, [key]: group };
    }, {} as Record<any, T[]>);
  }
}
