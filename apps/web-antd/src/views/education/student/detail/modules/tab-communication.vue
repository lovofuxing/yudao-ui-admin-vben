<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudentCommunicationPage } from '#/api/education/student/detail';

const props = defineProps<{ studentId: number }>();

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      {
        component: 'Input',
        fieldName: 'type',
        label: '类型',
        componentProps: { allowClear: true },
      },
      {
        component: 'Input',
        fieldName: 'content',
        label: '内容',
        componentProps: { allowClear: true },
      },
    ],
  },
  gridOptions: {
    columns: () => [
      { field: 'communicateTime', title: '沟通时间', minWidth: 150 },
      { field: 'type', title: '类型', minWidth: 100 },
      { field: 'content', title: '内容', minWidth: 300 },
      { field: 'operator', title: '操作人', minWidth: 100 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getStudentCommunicationPage({
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
