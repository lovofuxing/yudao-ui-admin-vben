<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getClassSchedulePage } from '#/api/education/class/detail';
const props = defineProps<{ classId: number }>();
const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      {
        component: 'Input',
        fieldName: 'teacher',
        label: '授课老师',
        componentProps: { allowClear: true },
      },
    ],
  },
  gridOptions: {
    columns: () => [
      { field: 'lessonDate', title: '上课日期', minWidth: 120 },
      { field: 'timeRange', title: '时间段', minWidth: 130 },
      { field: 'courseName', title: '课程', minWidth: 130 },
      { field: 'teacher', title: '授课老师', minWidth: 100 },
      { field: 'assistant', title: '助教', minWidth: 100 },
      { field: 'classroom', title: '教室', minWidth: 100 },
      { field: 'status', title: '状态', minWidth: 80 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, fv) =>
          await getClassSchedulePage({
            classId: props.classId,
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
