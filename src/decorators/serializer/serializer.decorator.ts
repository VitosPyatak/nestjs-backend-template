import { JSONPropertyStorage } from './serializer.service';

const jsonPropertySerializer = JSONPropertyStorage.instance;

export const JSONProperty = (propertyName?: string, serializationInstance?: Object) => {
  return (target: Object, propertyKey: string) => {
    const finalPropertyName = propertyName || propertyKey;
    jsonPropertySerializer.add(target.constructor.name, finalPropertyName, propertyKey);
    if (serializationInstance) {
      jsonPropertySerializer.addSerializationInstance(target.constructor.name, finalPropertyName, serializationInstance);
    }
  };
};
