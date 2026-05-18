<script lang="ts" setup>
import type { FileType } from 'ant-design-vue/es/upload/interface';

import { useVbenModal } from '@vben/common-ui';

import { message, Upload } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { useUpload } from '#/components/upload/use-upload';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 80,
    hideLabel: true,
  },
  layout: 'horizontal',
  schema: useFormSchema().map((item) => ({ ...item, label: '' })), // 去除label
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    modalApi.lock();
    // 提交表单
    const data = await formApi.getValues();
    try {
      await useUpload().httpRequest(data.file);
      // 关闭并提示
      await modalApi.close();
      emit('success');
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      modalApi.unlock();
    }
  },
});

/** 上传前 */
function beforeUpload(file: FileType) {
  formApi.setFieldValue('file', file);
  return false;
}
</script>

<template>
  <Modal :title="$t('infra.file.uploadTitle')">
    <Form class="mx-4">
      <template #file>
        <div class="w-full">
          <Upload.Dragger
            name="file"
            :max-count="1"
            accept=".jpg,.png,.gif,.webp"
            :before-upload="beforeUpload"
            list-type="picture-card"
          >
            <p class="ant-upload-drag-icon">
              <span class="icon-[ant-design--inbox-outlined] text-2xl"></span>
            </p>
            <p class="ant-upload-text">{{ $t('infra.common.uploadHint') }}</p>
            <p class="ant-upload-hint">
              {{ $t('infra.common.uploadFormatHint') }}
            </p>
          </Upload.Dragger>
        </div>
      </template>
    </Form>
  </Modal>
</template>
