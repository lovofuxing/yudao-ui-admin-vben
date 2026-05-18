<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getClassOrderPage } from '#/api/education/class/detail';
const props = defineProps<{ classId: number }>();
const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      {
        component: 'Input',
        fieldName: 'studentName',
        label: '学员',
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
      { field: 'orderNo', title: '订单号', minWidth: 150 },
      { field: 'studentName', title: '学员', minWidth: 120 },
      { field: 'amount', title: '金额(元)', minWidth: 100 },
      { field: 'chargeType', title: '收费方式', minWidth: 100 },
      { field: 'status', title: '状态', minWidth: 80 },
      { field: 'createTime', title: '创建时间', minWidth: 150 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, fv) =>
          await getClassOrderPage({
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
