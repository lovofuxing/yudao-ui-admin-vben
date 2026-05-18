<script lang="ts" setup>
import { useVbenForm } from '#/adapter/form';
import { Page } from '@vben/common-ui';
import { message } from 'ant-design-vue';
import { $t } from '#/locales';
const [Form] = useVbenForm({ commonConfig: { componentProps: { class: 'w-full' } }, schema: () => [
  { component: 'Input', fieldName: 'checkinStart', label: '签到开始时间' },
  { component: 'Input', fieldName: 'checkinEnd', label: '签到截止时间' },
  { component: 'Select', fieldName: 'mode', label: '签到模式', componentProps: { options: [{ label: '刷脸签到', value: 'face' }, { label: '手动签到', value: 'manual' }] } },
  { component: 'Switch', fieldName: 'autoDeduct', label: '自动扣课' },
] });
</script><template><Page auto-content-height><Form /></Page></template>
