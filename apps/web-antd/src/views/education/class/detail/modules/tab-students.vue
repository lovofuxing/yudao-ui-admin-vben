<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getClassStudentPage } from '#/api/education/class/detail';
const props = defineProps<{ classId: number }>();
const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      {
        component: 'Input',
        fieldName: 'studentName',
        label: '学员姓名',
        componentProps: { allowClear: true },
      },
    ],
  },
  gridOptions: {
    columns: () => [
      { field: 'studentName', title: '学员姓名', minWidth: 120 },
      { field: 'phone', title: '联系方式', minWidth: 130 },
      { field: 'enrollDate', title: '入班日期', minWidth: 120 },
      { field: 'status', title: '状态', minWidth: 80 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, fv) =>
          await getClassStudentPage({
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
