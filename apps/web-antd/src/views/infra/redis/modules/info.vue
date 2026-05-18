<script lang="ts" setup>
import type { InfraRedisApi } from '#/api/infra/redis';

import { useDescription } from '#/components/description';
import { $t } from '#/locales';

defineProps<{
  redisData?: InfraRedisApi.RedisMonitorInfo;
}>();

const [Descriptions] = useDescription({
  bordered: false,
  column: 6,
  class: 'mx-4',
  schema: [
    {
      field: 'info.redis_version',
      label: $t('infra.redis.fields.redisVersion'),
    },
    {
      field: 'info.redis_mode',
      label: $t('infra.redis.fields.runMode'),
      render: (val) => (val === 'standalone' ? $t('infra.redis.standalone') : $t('infra.redis.cluster')),
    },
    {
      field: 'info.tcp_port',
      label: $t('infra.redis.fields.port'),
    },
    {
      field: 'info.connected_clients',
      label: $t('infra.redis.fields.clientCount'),
    },
    {
      field: 'info.uptime_in_days',
      label: $t('infra.redis.fields.uptime'),
    },
    {
      field: 'info.used_memory_human',
      label: $t('infra.redis.fields.usedMemory'),
    },
    {
      field: 'info.used_cpu_user_children',
      label: $t('infra.redis.fields.usedCpu'),
      render: (val) => Number.parseFloat(val).toFixed(2),
    },
    {
      field: 'info.maxmemory_human',
      label: $t('infra.redis.fields.maxMemory'),
    },
    {
      field: 'info.aof_enabled',
      label: $t('infra.redis.fields.aofEnabled'),
      render: (val) => (val === '0' ? $t('infra.redis.no') : $t('infra.redis.yes')),
    },
    {
      field: 'info.rdb_last_bgsave_status',
      label: $t('infra.redis.fields.rdbStatus'),
    },
    {
      field: 'dbSize',
      label: $t('infra.redis.fields.keyCount'),
    },
    {
      field: 'info.instantaneous_input_kbps',
      label: $t('infra.redis.fields.networkIo'),
      render: (val, data) =>
        `${val}kps / ${data?.info?.instantaneous_output_kbps}kps`,
    },
  ],
});
</script>

<template>
  <Descriptions :data="redisData" />
</template>
