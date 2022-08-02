export abstract class Server {
  public abstract port(): number;

  public abstract start(): Promise<void>;

  public onStart(): void {
    console.log(`Server started at http://127.0.0.1:${this.port()}`);
  }
}
