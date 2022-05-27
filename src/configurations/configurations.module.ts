import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationsManager } from './configurations.manager';

const getEnvironmentFileTag = () => (process.env.NODE_ENV === 'production' ? '' : '.local');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env${getEnvironmentFileTag()}`,
    }),
  ],
  providers: [ConfigurationsManager],
  exports: [ConfigurationsManager],
})
export class ConfigurationsModule {}
