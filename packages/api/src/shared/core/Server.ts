export abstract class Server {
  protected abstract port(): number;

  public abstract start(): Promise<void>;

  protected onStart(): void {
    console.log(`Server started at http://127.0.0.1:${this.port()}`);
  }
}
