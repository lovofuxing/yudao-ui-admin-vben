<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { Select } from 'ant-design-vue';
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
      component: 'Select',
      fieldName: 'targetCourseId',
      label: '转入课程',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: $t('education.common.selectPlaceholder', ['课程']),
      },
    },
    {
      component: 'InputTextArea',
      fieldName: 'remark',
      label: '转课备注',
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
  <Modal :title="$t('education.student.action.transfer')">
    <Form class="mx-4" />
  </Modal>
</template>
