export abstract class DecoratorsManager<T> {
  protected storage: Record<string, Record<string, T>> = {};

  public add = (targetKey: string, recordKey: string, value: T) => {
    this.createElementIfNotExist(targetKey);
    this.storage[targetKey][recordKey] = value;
  };

  public getAll = (targetKey: string) => {
    return this.storage[targetKey];
  };

  public getProperty = (targetKey: string, propertyKey: string) => {
    return this.getAll(targetKey)[propertyKey];
  };

  public exists = (targetKey: string) => {
    return !!this.getAll(targetKey);
  };

  public clearTargetStorage = (targetKey: string) => {
    delete this.storage[targetKey];
  };

  private createElementIfNotExist = (targetKey: string) => {
    if (!(targetKey in this.storage)) {
      this.storage[targetKey] = {};
    }
  };
}
