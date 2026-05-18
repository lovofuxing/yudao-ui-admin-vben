<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudentGrowthPage } from '#/api/education/student/detail';

const props = defineProps<{ studentId: number }>();

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      { component: 'Input', fieldName: 'type', label: '类型', componentProps: { allowClear: true } },
      { component: 'Input', fieldName: 'content', label: '内容', componentProps: { allowClear: true } },
    ],
  },
  gridOptions: {
    columns: () => [
      { field: 'recordDate', title: '记录日期', minWidth: 120 },
      { field: 'type', title: '类型', minWidth: 100 },
      { field: 'content', title: '内容', minWidth: 300 },
      { field: 'attachments', title: '附件', minWidth: 100 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getStudentGrowthPage({ studentId: props.studentId, pageNo: page.currentPage, pageSize: page.pageSize, ...formValues });
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
