<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import { message } from 'ant-design-vue';
import { useVbenForm } from '#/adapter/form';
import { $t } from '#/locales';
const emit = defineEmits(['success']);
const [Form, formApi] = useVbenForm({ commonConfig: { componentProps: { class: 'w-full' }, formItemClass: 'col-span-2', labelWidth: 96 }, layout: 'horizontal', schema: () => [{ component: 'DatePicker', fieldName: 'callDate', label: '点名日期', rules: 'required', componentProps: { class: 'w-full' } }, { component: 'Input', fieldName: 'courseName', label: '课程' }], showDefaultActions: false });
const [Modal, modalApi] = useVbenModal({ async onConfirm() { const { valid } = await formApi.validate(); if (!valid) return; modalApi.lock(); try { emit('success'); message.success($t('ui.actionMessage.operationSuccess')); await modalApi.close(); } finally { modalApi.unlock(); } }, onOpenChange(isOpen: boolean) { if (!isOpen) formApi.resetForm(); } });
</script><template><Modal :title="$t('education.class.action.callOver')"><Form class="mx-4" /></Modal></template>
