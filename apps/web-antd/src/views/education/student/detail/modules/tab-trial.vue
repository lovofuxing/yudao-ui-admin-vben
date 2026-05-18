<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStudentTrialPage } from '#/api/education/student/detail';

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
      { field: 'trialDate', title: '试听日期', minWidth: 150 },
      { field: 'courseName', title: '课程名称', minWidth: 150 },
      { field: 'teacher', title: '授课老师', minWidth: 100 },
      { field: 'classroom', title: '教室', minWidth: 100 },
      { field: 'feedback', title: '反馈', minWidth: 250 },
      { field: 'status', title: '状态', minWidth: 100 },
    ],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getStudentTrialPage({
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
