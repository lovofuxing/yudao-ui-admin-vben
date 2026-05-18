<script lang="ts" setup generic="T extends Record<string, any>">
import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { $t } from '#/locales';

/**
 * 教务通用选择器 —— 弹窗 + 可配置搜索表单 + 表格 + 确认。
 *
 * 查询条件、表格列、数据接口均由调用方通过 props 配置，组件内部不写死任何业务字段。
 * 适用于选择学员、选择课程、选择班级等场景。
 */

export interface EducationSelectorProps<T> {
  /** 弹窗是否打开，支持 v-model:open。 */
  open: boolean;
  /** 弹窗标题，走 $t 或直接传入。 */
  title: string;
  /** 搜索表单 schema，字段和组件由调用方定义。 */
  searchSchema: VbenFormSchema[];
  /** 表格列定义。组件会自动追加 checkbox 选择列。 */
  columns: VxeTableGridOptions<T>['columns'];
  /** 分页数据获取函数，接收 pageNo/pageSize 和搜索表单值。 */
  api: (
    params: { pageNo: number; pageSize: number } & Record<string, any>,
  ) => Promise<{ list: T[]; total: number }>;
  /** 行标识字段，默认 'id'。 */
  rowKey?: string;
  /** 是否支持多选，默认 false（单选）。 */
  multiple?: boolean;
}

const props = withDefaults(defineProps<EducationSelectorProps<T>>(), {
  rowKey: 'id',
  multiple: false,
});

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'confirm', rows: T[]): void;
  (e: 'cancel'): void;
}>();

const selectedRows = ref<T[]>([]);

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: () => props.searchSchema,
    submitOnChange: true,
  },
  gridOptions: {
    columns: () => [
      {
        type: props.multiple ? 'checkbox' : 'radio',
        width: 40,
      } as any,
      ...(props.columns ?? []),
    ],
    height: 400,
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await props.api({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      isHover: true,
      keyField: props.rowKey,
    },
    toolbarConfig: {
      refresh: true,
      search: true,
    },
  } as VxeTableGridOptions<T>,
  gridEvents: {
    checkboxAll: ({ records }: { records: T[] }) => {
      selectedRows.value = records;
    },
    checkboxChange: ({ records }: { records: T[] }) => {
      selectedRows.value = records;
    },
  },
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    if (selectedRows.value.length === 0) {
      return;
    }
    emit('confirm', [...selectedRows.value]);
    await modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      selectedRows.value = [];
      gridApi.query();
      emit('cancel');
    }
    emit('update:open', isOpen);
  },
});

/** 确认按钮仅在有选中行时可用。 */
watch(
  selectedRows,
  (rows) => {
    modalApi.setState({ confirmDisabled: rows.length === 0 });
  },
  { immediate: true },
);
</script>

<template>
  <Modal :title="title">
    <Grid />
  </Modal>
</template>
