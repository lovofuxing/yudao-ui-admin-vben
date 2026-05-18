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
    { component: 'Select', fieldName: 'type', label: '沟通类型', rules: 'required', componentProps: { class: 'w-full', options: [{ label: '电话沟通', value: '电话沟通' }, { label: '微信沟通', value: '微信沟通' }, { label: '到店沟通', value: '到店沟通' }] } },
    { component: 'InputTextArea', fieldName: 'content', label: '沟通内容', rules: 'required', componentProps: { rows: 4 } },
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
  <Modal :title="$t('education.student.action.communicate')">
    <Form class="mx-4" />
  </Modal>
</template>
