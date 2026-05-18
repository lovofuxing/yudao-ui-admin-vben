<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudentDeductionPage } from '#/api/education/student/detail';

const props = defineProps<{ studentId: number }>();

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      { component: 'Input', fieldName: 'courseName', label: '课程', componentProps: { allowClear: true } },
      { component: 'Input', fieldName: 'type', label: '扣课类型', componentProps: { allowClear: true } },
    ],
  },
  gridOptions: {
    columns: () => [
      { field: 'deductionTime', title: '扣课时间', minWidth: 150 },
      { field: 'courseName', title: '课程', minWidth: 130 },
      { field: 'deductHours', title: '扣课课时', minWidth: 80 },
      { field: 'type', title: '类型', minWidth: 100 },
      { field: 'operator', title: '操作人', minWidth: 100 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getStudentDeductionPage({ studentId: props.studentId, pageNo: page.currentPage, pageSize: page.pageSize, ...formValues });
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
