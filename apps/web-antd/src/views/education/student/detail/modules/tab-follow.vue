<script lang="ts" setup>
import type { StudentFollowRecord } from '#/api/education/student/detail';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudentFollowPage } from '#/api/education/student/detail';
import { $t } from '#/locales';

const props = defineProps<{ studentId: number }>();

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      {
        component: 'Input',
        fieldName: 'followType',
        label: '跟进方式',
        componentProps: { allowClear: true },
      },
      {
        component: 'Input',
        fieldName: 'content',
        label: '跟进内容',
        componentProps: { allowClear: true },
      },
    ],
  },
  gridOptions: {
    columns: () => [
      { field: 'followTime', title: '跟进时间', minWidth: 150 },
      { field: 'followType', title: '跟进方式', minWidth: 100 },
      { field: 'content', title: '跟进内容', minWidth: 250 },
      { field: 'operator', title: '跟进人', minWidth: 100 },
      { field: 'nextFollowTime', title: '下次跟进', minWidth: 120 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getStudentFollowPage({
            studentId: props.studentId,
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    toolbarConfig: { refresh: true, search: true },
  } as any,
});
</script>

<template>
  <Grid />
</template>
