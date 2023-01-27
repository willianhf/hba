
export class TextTable {
  private readonly columns: Record<string, string[]> = {};

  public cell(column: string, value: string): this {
    this.columns[column] ??= [];
    this.columns[column].push(value);

    return this;
  }

  private getColumnPadding(column: string): number {
    const rows = this.columns[column];
    return Math.max(...rows.map(row => row.length), column.length);
  }

  private getColumnsHeader(): string {
    const columns = Object.keys(this.columns);
    return columns
      .map((column, index) => {
        const isFirst = index === 0;
        const columnPadding = this.getColumnPadding(column);
        return `${isFirst ? '|' : ''} ${column.padEnd(columnPadding, ' ')} |`;
      })
      .join('');
  }

  private getHeaderSeparatorRow(): string {
    const columns = Object.keys(this.columns);
    return columns
      .map((column, index) => {
        const isFirst = index === 0;
        const isLast = index === columns.length - 1;
        const columnPadding = this.getColumnPadding(column) + 2;
        return `${isFirst ? '|' : ''}${'-'.repeat(columnPadding)}${isLast ? '|' : '+'}`;
      })
      .join('');
  }

  private getRows(): string[] {
    const rowsLength = Math.max(...Object.values(this.columns).map(row => row.length), 1);
    return new Array(rowsLength).fill(0).map((_, index) => {
      return Object.entries(this.columns)
        .map(([column, rows], idx) => {
          const isFirst = idx === 0;
          const columnPadding = this.getColumnPadding(column);
          const row = rows.at(index) ?? '';
          return `${isFirst ? '|' : ''} ${row.padEnd(columnPadding, ' ')} |`;
        })
        .join('');
    });
  }

  public render(): string {
    const columnsHeader = this.getColumnsHeader();
    const separatorRow = this.getHeaderSeparatorRow();
    const rows = this.getRows();

    return [columnsHeader, [separatorRow, ...rows].join('\n')].join('\n');
  }
}
