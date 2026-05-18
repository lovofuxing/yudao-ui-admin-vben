<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudentLeavePage } from '#/api/education/student/detail';

const props = defineProps<{ studentId: number }>();

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      { component: 'Input', fieldName: 'reason', label: '原因', componentProps: { allowClear: true } },
      { component: 'Input', fieldName: 'status', label: '状态', componentProps: { allowClear: true } },
    ],
  },
  gridOptions: {
    columns: () => [
      { field: 'startDate', title: '开始日期', minWidth: 120 },
      { field: 'endDate', title: '结束日期', minWidth: 120 },
      { field: 'reason', title: '请假原因', minWidth: 200 },
      { field: 'status', title: '状态', minWidth: 80 },
      { field: 'approver', title: '审批人', minWidth: 100 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getStudentLeavePage({ studentId: props.studentId, pageNo: page.currentPage, pageSize: page.pageSize, ...formValues });
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
