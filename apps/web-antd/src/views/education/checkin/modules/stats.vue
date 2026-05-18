<script lang="ts" setup>
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getEducationFaceCheckinPage } from '#/api/education/checkin';
const [Grid] = useVbenVxeGrid({ formOptions: { schema: () => [{ component: 'Input', fieldName: 'studentName', label: '学员', componentProps: { allowClear: true } }] }, gridOptions: { columns: () => [{ field: 'checkinDate', title: '日期', minWidth: 120 }, { field: 'checkinCount', title: '签到人数', minWidth: 100 }, { field: 'absentCount', title: '未签到', minWidth: 100 }, { field: 'deductTotal', title: '扣课总课时', minWidth: 100 }], height: 'auto', proxyConfig: { ajax: { query: async ({ page }, fv) => await getEducationFaceCheckinPage({ pageNo: page.currentPage, pageSize: page.pageSize, ...fv }) } }, toolbarConfig: { refresh: true, search: true } } as any });
</script><template><Grid /></template>
