import { DecoratorsManager } from '../decorator.manager';
import { serializerPreffix } from './serializer.configs';

export class JSONPropertyStorage extends DecoratorsManager<any> {
  static instance = new JSONPropertyStorage();

  private constructor() {
    super();
  }

  public addSerializationInstance = (targetName: string, propertyName: string, serializationInstance: Object) => {
    this.add(targetName, `${serializerPreffix}-${propertyName}`, serializationInstance);
  };

  public getSerializationInstance = (targetName: string, instanceName: string) => {
    return this.getProperty(targetName, `${serializerPreffix}-${instanceName}`);
  };
}
