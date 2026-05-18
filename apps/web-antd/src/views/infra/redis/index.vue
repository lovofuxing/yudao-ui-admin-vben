<script lang="ts" setup>
import type { InfraRedisApi } from '#/api/infra/redis';

import { onMounted, ref } from 'vue';

import { DocAlert, Page } from '@vben/common-ui';

import { Card } from 'ant-design-vue';

import { getRedisMonitorInfo } from '#/api/infra/redis';

import Commands from './modules/commands.vue';
import Info from './modules/info.vue';
import Memory from './modules/memory.vue';

const redisData = ref<InfraRedisApi.RedisMonitorInfo>();

/** 统一加载 Redis 数据 */
async function loadRedisData() {
  try {
    redisData.value = await getRedisMonitorInfo();
  } catch (error) {
    console.error('加载 Redis 数据失败', error);
  }
}

onMounted(() => {
  loadRedisData();
});
</script>

<template>
  <Page auto-content-height>
    <template #doc>
      <DocAlert
        :title="$t('infra.redis.docRedisCache')"
        url="https://doc.iocoder.cn/redis-cache/"
      />
      <DocAlert
        :title="$t('infra.redis.docLocalCache')"
        url="https://doc.iocoder.cn/local-cache/"
      />
    </template>

    <Card :title="$t('infra.redis.overview')">
      <Info :redis-data="redisData" />
    </Card>

    <div class="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card :title="$t('infra.redis.memoryUsage')">
        <Memory :redis-data="redisData" />
      </Card>

      <Card :title="$t('infra.redis.commandStats')">
        <Commands :redis-data="redisData" />
      </Card>
    </div>
  </Page>
</template>
