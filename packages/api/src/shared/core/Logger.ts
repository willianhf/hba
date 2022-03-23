export class Logger {
  static create(prefix: string) {
    return (message?: any) => {
      console.log(prefix, message);
    };
  }
}
