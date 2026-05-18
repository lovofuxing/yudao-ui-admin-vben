<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudentPointsPage } from '#/api/education/student/detail';

const props = defineProps<{ studentId: number }>();

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: () => [
      {
        component: 'Input',
        fieldName: 'couponName',
        label: '优惠券名称',
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
      { field: 'couponName', title: '优惠券名称', minWidth: 130 },
      { field: 'type', title: '类型', minWidth: 80 },
      { field: 'threshold', title: '使用门槛', minWidth: 120 },
      { field: 'faceValue', title: '面值', minWidth: 80 },
      { field: 'acquireTime', title: '获取时间', minWidth: 120 },
      { field: 'expireTime', title: '有效期', minWidth: 120 },
      { field: 'usedTime', title: '使用时间', minWidth: 120 },
      { field: 'status', title: '状态', minWidth: 80 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getStudentPointsPage({
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
