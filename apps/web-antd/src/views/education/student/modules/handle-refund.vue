<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { $t } from '#/locales';

const emit = defineEmits(['success']);

const [Form, formApi] = useVbenForm({
  commonConfig: { componentProps: { class: 'w-full' }, formItemClass: 'col-span-2', labelWidth: 96 },
  layout: 'horizontal',
  schema: () => [
    { component: 'InputNumber', fieldName: 'refundHours', label: '退课课时', rules: 'required', componentProps: { class: 'w-full', min: 1 } },
    { component: 'InputNumber', fieldName: 'refundAmount', label: '退款金额(元)', rules: 'required', componentProps: { class: 'w-full', min: 0 } },
    { component: 'InputTextArea', fieldName: 'remark', label: '退课备注', componentProps: { rows: 3 } },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    modalApi.lock();
    try {
      emit('success');
      message.success($t('ui.actionMessage.operationSuccess'));
      await modalApi.close();
    } finally {
      modalApi.unlock();
    }
  },
  onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formApi.resetForm();
    }
  },
});
</script>

<template>
  <Modal :title="$t('education.student.action.refund')">
    <Form class="mx-4" />
  </Modal>
</template>
