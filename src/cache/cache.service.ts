import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) public readonly cacheManager: Cache) {}

  public get = (key: string) => {
    return this.cacheManager.get(key);
  };

  public set = (key: string, value) => {
    return this.cacheManager.set(key, value);
  };

  public exists = (key: string) => {
    return this.cacheManager.get(key).then((value) => !!value);
  };

  public store() {
    return this.cacheManager.store;
  }
}
