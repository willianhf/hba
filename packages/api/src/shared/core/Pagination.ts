export class Pagination {
  public static paginate<T>(items: T[], page: number, perPage: number): T[] {
    return items.slice(page * perPage, (page + 1) * perPage);
  }

  public static totalPages(items: any[], perPage: number): number {
    return Math.max(Math.floor(items.length / perPage) - 1, 0);
  }
}
