<script lang="ts" setup>
import type { EducationQuickDeductionApi } from '#/api/education/quickDeduction';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createEducationQuickDeduction,
  getEducationQuickDeduction,
  updateEducationQuickDeduction,
} from '#/api/education/quickDeduction';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<EducationQuickDeductionApi.QuickDeduction>();

const getTitle = computed(() =>
  formData.value?.id
    ? $t('ui.actionTitle.edit', [$t('education.quickDeduction.title')])
    : $t('ui.actionTitle.create', [$t('education.quickDeduction.title')]),
);

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: { class: 'w-full' },
    formItemClass: 'col-span-2',
    labelWidth: 96,
  },
  layout: 'horizontal',
  schema: useFormSchema(),
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    modalApi.lock();
    try {
      // 课时精度后续由后端按 0.1 课时校验，前端迁移期只保留字段。
      const data = (await formApi.getValues()) as EducationQuickDeductionApi.QuickDeduction;
      await (formData.value?.id
        ? updateEducationQuickDeduction({ ...data, id: formData.value.id })
        : createEducationQuickDeduction(data));
      await modalApi.close();
      emit('success');
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      modalApi.unlock();
    }
  },
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formData.value = undefined;
      await formApi.resetForm();
      return;
    }
    const data = modalApi.getData<EducationQuickDeductionApi.QuickDeduction>();
    if (!data?.id) {
      await formApi.resetForm();
      return;
    }
    modalApi.lock();
    try {
      formData.value = await getEducationQuickDeduction(data.id);
      await formApi.setValues(formData.value);
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>
