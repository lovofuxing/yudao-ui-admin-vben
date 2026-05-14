<script lang="ts" setup>
import type { EducationFaceDeductionApi } from '#/api/education/faceDeduction';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createEducationFaceDeduction,
  getEducationFaceDeduction,
  updateEducationFaceDeduction,
} from '#/api/education/faceDeduction';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<EducationFaceDeductionApi.FaceDeduction>();

const getTitle = computed(() =>
  formData.value?.id
    ? $t('ui.actionTitle.edit', [$t('education.faceDeduction.title')])
    : $t('ui.actionTitle.create', [$t('education.faceDeduction.title')]),
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
      // 摄像头识别服务未接入前，识别结果以可编辑记录方式预览。
      const data = (await formApi.getValues()) as EducationFaceDeductionApi.FaceDeduction;
      await (formData.value?.id
        ? updateEducationFaceDeduction({ ...data, id: formData.value.id })
        : createEducationFaceDeduction(data));
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
    const data = modalApi.getData<EducationFaceDeductionApi.FaceDeduction>();
    if (!data?.id) {
      await formApi.resetForm();
      return;
    }
    modalApi.lock();
    try {
      formData.value = await getEducationFaceDeduction(data.id);
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
