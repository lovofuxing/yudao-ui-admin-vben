<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getEducationLessonRecordPage } from '#/api/education/record';
const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      {
        component: 'Input',
        fieldName: 'studentName',
        label: '学员',
        componentProps: { allowClear: true },
      },
    ],
  },
  gridOptions: {
    columns: () => [
      { field: 'lessonDate', title: '补课日期', minWidth: 120 },
      { field: 'studentName', title: '学员', minWidth: 120 },
      { field: 'className', title: '补课班级', minWidth: 130 },
      { field: 'courseName', title: '课程', minWidth: 130 },
      { field: 'status', title: '状态', minWidth: 80 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, fv) =>
          await getEducationLessonRecordPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...fv,
          }),
      },
    },
    toolbarConfig: { refresh: true, search: true },
  } as any,
});
</script>
<template><Grid /></template>
