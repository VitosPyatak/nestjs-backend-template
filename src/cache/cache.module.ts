import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, CacheModuleOptions, Module } from '@nestjs/common';
import { ConfigurationsModule } from 'src/configurations/configurations.module';
import { ConfigurationsManager } from 'src/configurations/configurations.manager';
import { CacheService } from './cache.service';

const mapConfigsToCacheModuleOptions = ({ redis: redisConfigs }: ConfigurationsManager): CacheModuleOptions => ({
  store: redisStore,
  host: redisConfigs.host,
  port: redisConfigs.port,
  ttl: redisConfigs.ttl,
});

const CachingModule = CacheModule.registerAsync({
  imports: [ConfigurationsModule],
  inject: [ConfigurationsManager],
  useFactory: mapConfigsToCacheModuleOptions,
});

@Module({
  imports: [CachingModule],
  providers: [CacheService],
  exports: [CachingModule, CacheService],
})
export class RedisCacheModule {}
