import { Type } from '@nestjs/common';
import { JSONPropertyStorage } from './serializer.service';
import { serializeJSON } from './serializer.utils';

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

export const SerializeResponse = (instance: Type) => {
  return (_, __, descriptor: PropertyDescriptor) => {
    const initialMethod = descriptor.value;
    descriptor.value = async function (...args) {
      const response = await initialMethod.apply(this, args);
      return serializeJSON(instance, response);
    };
  };
};
