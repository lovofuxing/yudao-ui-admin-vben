<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudentSchedulePage } from '#/api/education/student/detail';

const props = defineProps<{ studentId: number }>();

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      {
        component: 'Input',
        fieldName: 'className',
        label: '班级',
        componentProps: { allowClear: true },
      },
      {
        component: 'Input',
        fieldName: 'courseName',
        label: '课程',
        componentProps: { allowClear: true },
      },
    ],
  },
  gridOptions: {
    columns: () => [
      { field: 'className', title: '班级', minWidth: 130 },
      { field: 'courseName', title: '课程', minWidth: 130 },
      { field: 'teacher', title: '授课老师', minWidth: 100 },
      { field: 'weekday', title: '上课星期', minWidth: 120 },
      { field: 'timeRange', title: '时间段', minWidth: 130 },
      { field: 'classroom', title: '教室', minWidth: 100 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getStudentSchedulePage({
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
