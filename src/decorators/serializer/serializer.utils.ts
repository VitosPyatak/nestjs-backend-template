import { Type } from '@nestjs/common';
import { JSONPropertyStorage } from './serializer.service';

const jsonPropertyStorage = JSONPropertyStorage.instance;

export const serializeJSON = <T>(instance: Type, data): T => {
  const processNestedSerialization = (responseKey: string, value) => {
    const serializer = jsonPropertyStorage.getSerializationInstance(instance.name, responseKey);
    return serializer ? serializeJSON(serializer, value) : data[responseKey];
  };

  const reduceValueByType = (instanceObject, [key, value]: [string, any]) => {
    const propertyKey = jsonPropertyStorage.getProperty(instanceObject.constructor.name, key);
    if (propertyKey) instanceObject[propertyKey] = typeof value === 'object' ? processNestedSerialization(key, value) : value;
    return instanceObject;
  };

  const instanceObject = new instance();
  if (!jsonPropertyStorage.exists(instanceObject.constructor.name)) return data;
  return Object.entries(data).reduce(reduceValueByType, instanceObject);
};
