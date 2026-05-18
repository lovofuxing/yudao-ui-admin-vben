<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getClassRecordPage } from '#/api/education/class/detail';
const props = defineProps<{ classId: number }>();
const [Grid] = useVbenVxeGrid({ formOptions: { schema: () => [{ component: 'Input', fieldName: 'studentName', label: '学员', componentProps: { allowClear: true } }, { component: 'Input', fieldName: 'status', label: '状态', componentProps: { allowClear: true } }] }, gridOptions: { columns: () => [{ field: 'lessonDate', title: '上课日期', minWidth: 120 }, { field: 'studentName', title: '学员', minWidth: 120 }, { field: 'courseName', title: '课程', minWidth: 130 }, { field: 'teacher', title: '老师', minWidth: 100 }, { field: 'deductHours', title: '消耗课时', minWidth: 80 }, { field: 'status', title: '状态', minWidth: 80 }], height: 'auto', proxyConfig: { ajax: { query: async ({ page }, fv) => await getClassRecordPage({ classId: props.classId, pageNo: page.currentPage, pageSize: page.pageSize, ...fv }) } }, toolbarConfig: { refresh: true, search: true } } as any });
</script><template><Grid /></template>
