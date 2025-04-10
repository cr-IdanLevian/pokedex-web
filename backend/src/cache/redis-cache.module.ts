import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ioRedisStore } from '@tirke/node-cache-manager-ioredis';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => ({
        store: ioRedisStore,
        host:
          process.env.NODE_ENV === 'development'
            ? 'localhost'
            : process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
        ttl: parseInt(process.env.REDIS_TTL) || 300,
        tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
      }),
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
