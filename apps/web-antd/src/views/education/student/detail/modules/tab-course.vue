<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudentCoursePage } from '#/api/education/student/detail';

const props = defineProps<{ studentId: number }>();

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      {
        component: 'Input',
        fieldName: 'courseName',
        label: '课程名称',
        componentProps: { allowClear: true },
      },
      {
        component: 'Input',
        fieldName: 'status',
        label: '状态',
        componentProps: { allowClear: true },
      },
    ],
  },
  gridOptions: {
    columns: () => [
      { field: 'courseName', title: '课程名称', minWidth: 150 },
      { field: 'chargeType', title: '收费方式', minWidth: 100 },
      { field: 'totalHours', title: '总课时', minWidth: 80 },
      { field: 'remainingHours', title: '剩余课时', minWidth: 80 },
      { field: 'price', title: '价格(元)', minWidth: 100 },
      { field: 'enrollDate', title: '报读日期', minWidth: 120 },
      { field: 'status', title: '状态', minWidth: 80 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getStudentCoursePage({
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
