<script lang="ts" setup>
import type { EducationFaceCheckinApi } from '#/api/education/checkin';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createEducationFaceCheckin,
  getEducationFaceCheckin,
  updateEducationFaceCheckin,
} from '#/api/education/checkin';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<EducationFaceCheckinApi.FaceCheckin>();

const getTitle = computed(() =>
  formData.value?.id
    ? $t('ui.actionTitle.edit', [$t('education.faceCheckin.title')])
    : $t('ui.actionTitle.create', [$t('education.faceCheckin.title')]),
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
      // 手动签到和设备签到当前统一保存为签到记录，后续再按来源拆接口。
      const data = (await formApi.getValues()) as EducationFaceCheckinApi.FaceCheckin;
      await (formData.value?.id
        ? updateEducationFaceCheckin({ ...data, id: formData.value.id })
        : createEducationFaceCheckin(data));
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
    const data = modalApi.getData<EducationFaceCheckinApi.FaceCheckin>();
    if (!data?.id) {
      await formApi.resetForm();
      return;
    }
    modalApi.lock();
    try {
      formData.value = await getEducationFaceCheckin(data.id);
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
