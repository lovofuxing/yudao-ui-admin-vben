<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { DatePicker, Input } from 'ant-design-vue';
import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { $t } from '#/locales';

const emit = defineEmits(['success']);

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: { class: 'w-full' },
    formItemClass: 'col-span-2',
    labelWidth: 96,
  },
  layout: 'horizontal',
  schema: () => [
    {
      component: 'DatePicker',
      fieldName: 'suspendDate',
      label: '停课日期',
      rules: 'required',
      componentProps: { class: 'w-full' },
    },
    {
      component: 'DatePicker',
      fieldName: 'resumeDate',
      label: '复课日期',
      componentProps: { class: 'w-full' },
    },
    {
      component: 'InputTextArea',
      fieldName: 'remark',
      label: '停课备注',
      componentProps: { rows: 3 },
    },
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
  <Modal :title="$t('education.student.action.suspend')">
    <Form class="mx-4" />
  </Modal>
</template>
