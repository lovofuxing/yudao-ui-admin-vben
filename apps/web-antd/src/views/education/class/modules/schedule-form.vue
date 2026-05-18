<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import { message } from 'ant-design-vue';
import { useVbenForm } from '#/adapter/form';
import { $t } from '#/locales';
const emit = defineEmits(['success']);
const [Form, formApi] = useVbenForm({ commonConfig: { componentProps: { class: 'w-full' }, formItemClass: 'col-span-2', labelWidth: 96 }, layout: 'horizontal', schema: () => [{ component: 'Input', fieldName: 'courseName', label: '课程', rules: 'required' }, { component: 'Input', fieldName: 'teacher', label: '授课老师', rules: 'required' }, { component: 'Input', fieldName: 'classroom', label: '教室' }, { component: 'Input', fieldName: 'timeRange', label: '时间段' }], showDefaultActions: false });
const [Modal, modalApi] = useVbenModal({ async onConfirm() { const { valid } = await formApi.validate(); if (!valid) return; modalApi.lock(); try { emit('success'); message.success($t('ui.actionMessage.operationSuccess')); await modalApi.close(); } finally { modalApi.unlock(); } }, onOpenChange(isOpen: boolean) { if (!isOpen) formApi.resetForm(); } });
</script><template><Modal :title="$t('education.class.action.schedule')"><Form class="mx-4" /></Modal></template>
