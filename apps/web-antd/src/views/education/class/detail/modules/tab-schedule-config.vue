<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getClassScheduleConfigPage } from '#/api/education/class/detail';
const props = defineProps<{ classId: number }>();
const [Grid] = useVbenVxeGrid({ formOptions: { schema: () => [] }, gridOptions: { columns: () => [{ field: 'scheduleType', title: '排课方式', minWidth: 100 }, { field: 'weekday', title: '上课星期', minWidth: 120 }, { field: 'timeRange', title: '时间段', minWidth: 130 }, { field: 'teacher', title: '老师', minWidth: 100 }, { field: 'classroom', title: '教室', minWidth: 100 }, { field: 'startDate', title: '开始日期', minWidth: 120 }, { field: 'endDate', title: '结束日期', minWidth: 120 }], height: 'auto', proxyConfig: { ajax: { query: async ({ page }, fv) => await getClassScheduleConfigPage({ classId: props.classId, pageNo: page.currentPage, pageSize: page.pageSize, ...fv }) } }, toolbarConfig: { refresh: true, search: true } } as any });
</script><template><Grid /></template>
