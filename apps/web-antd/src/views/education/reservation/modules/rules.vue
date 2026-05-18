<script lang="ts" setup>
import { useVbenForm } from '#/adapter/form';
import { Page } from '@vben/common-ui';
const [Form] = useVbenForm({
  commonConfig: { componentProps: { class: 'w-full' } },
  schema: () => [
    { component: 'Input', fieldName: 'startTime', label: '开始预约时间' },
    { component: 'Input', fieldName: 'endTime', label: '预约截止时间' },
    {
      component: 'InputNumber',
      fieldName: 'maxBookings',
      label: '预约次数限制',
      componentProps: { min: 1, class: 'w-full' },
    },
    {
      component: 'InputNumber',
      fieldName: 'cancelLimit',
      label: '取消预约限制',
      componentProps: { min: 0, class: 'w-full' },
    },
  ],
});
</script>
<template>
  <Page auto-content-height><Form /></Page>
</template>
