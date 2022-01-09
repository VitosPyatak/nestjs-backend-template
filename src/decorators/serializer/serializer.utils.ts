import { JSONPropertyStorage } from './serializer.service';

const jsonPropertyStorage = JSONPropertyStorage.instance;

export const serializeJSON = <T>(instance, data): T => {
  const processNestedSerialization = (responseKey: string, value) => {
    const serializer = jsonPropertyStorage.getSerializationInstance(instance.constructor.name, responseKey);
    return serializeJSON(new serializer(), value);
  };

  const reduceValueByType = (newInstance, [key, value]: [string, any]) => {
    const propertyKey = jsonPropertyStorage.getProperty(newInstance.constructor.name, key);
    if (propertyKey) newInstance[propertyKey] = typeof value === 'object' ? processNestedSerialization(key, value) : value;
    return newInstance;
  };

  if (!jsonPropertyStorage.exists(instance.constructor.name)) return data;
  return Object.entries(data).reduce(reduceValueByType, instance);
};
