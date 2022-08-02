export abstract class BaseController {
  public abstract execute(dto: any): Promise<void | any>;
}
