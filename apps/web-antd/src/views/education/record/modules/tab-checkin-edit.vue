<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getEducationLessonRecordPage } from '#/api/education/record';
const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      {
        component: 'Input',
        fieldName: 'operator',
        label: '操作人',
        componentProps: { allowClear: true },
      },
    ],
  },
  gridOptions: {
    columns: () => [
      { field: 'lessonDate', title: '修改时间', minWidth: 150 },
      { field: 'studentName', title: '学员', minWidth: 120 },
      { field: 'courseName', title: '课程', minWidth: 130 },
      { field: 'status', title: '点名状态', minWidth: 80 },
      { field: 'operator', title: '操作人', minWidth: 100 },
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
