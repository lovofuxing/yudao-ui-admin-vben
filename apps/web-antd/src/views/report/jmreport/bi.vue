<script lang="ts" setup>
import { ref } from 'vue';

import { DocAlert, IFrame, Page } from '@vben/common-ui';
import { useAccessStore } from '@vben/stores';

import { $t } from '#/locales';

defineOptions({ name: 'JimuBI' });
const accessStore = useAccessStore();

const src = ref(
  `${import.meta.env.VITE_BASE_URL}/drag/list?token=${
    accessStore.refreshToken
  }`,
);
</script>

<template>
  <Page auto-content-height>
    <template #doc>
      <DocAlert :title="$t('report.bi.title')" url="https://doc.iocoder.cn/screen/" />
    </template>

    <IFrame :src="src" />
  </Page>
</template>
