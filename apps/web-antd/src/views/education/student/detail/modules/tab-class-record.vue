<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudentClassRecordPage } from '#/api/education/student/detail';

const props = defineProps<{ studentId: number }>();

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      { component: 'Input', fieldName: 'className', label: '班级', componentProps: { allowClear: true } },
      { component: 'Input', fieldName: 'courseName', label: '课程', componentProps: { allowClear: true } },
      { component: 'Input', fieldName: 'status', label: '状态', componentProps: { allowClear: true } },
    ],
  },
  gridOptions: {
    columns: () => [
      { field: 'lessonDate', title: '上课日期', minWidth: 120 },
      { field: 'className', title: '上课班级', minWidth: 130 },
      { field: 'courseName', title: '课程', minWidth: 130 },
      { field: 'teacher', title: '授课老师', minWidth: 100 },
      { field: 'deductHours', title: '消耗课时', minWidth: 80 },
      { field: 'status', title: '状态', minWidth: 80 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getStudentClassRecordPage({ studentId: props.studentId, pageNo: page.currentPage, pageSize: page.pageSize, ...formValues });
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
