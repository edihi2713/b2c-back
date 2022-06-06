import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { GeneralSettingsDTO } from 'src/schemas/common/generalSettingsDTO';

@Injectable()
export class RedisProvider {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getData(key: string, callback: () => any) {
    let redisData = await this.redis.get(key);
    if (!redisData) {
      redisData = await callback();
      await this.redis.set(
        key,
        JSON.stringify(redisData),
        'EX',
        process.env.TIMEOUT_GENERAL_CACHE || 300,
      );
    } else {
      return JSON.parse(redisData);
    }
    return redisData;
  }

  async refreshCache() {
    const keys = await this.redis.keys('*');
    keys.forEach((key: string) => {
      this.redis.del(key);
    });
  }

  async getBasicSettings(callback: () => any): Promise<GeneralSettingsDTO> {
    const key = 'getBasicSettings';
    let redisData = await this.redis.get(key);
    if (!redisData) {
      redisData = await callback();
      await this.redis.set(key, JSON.stringify(redisData), 'EX', 60 * 60 * 24);
    } else {
      return JSON.parse(redisData);
    }
    return redisData;
  }
}
