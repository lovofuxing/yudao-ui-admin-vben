<script lang="ts" setup generic="T extends Record<string, any>">
import EducationSelector from './EducationSelector.vue';

/**
 * 学员选择器 —— 弹窗搜索并选择学员。
 *
 * @example
 * <StudentSelector
 *   v-model:open="visible"
 *   :search-schema="studentSearchSchema"
 *   :columns="studentColumns"
 *   :api="getStudentPage"
 *   title="选择学员"
 *   @confirm="onSelect"
 * />
 */
</script>

<template>
  <EducationSelector
    v-bind="$attrs"
    @update:open="$emit('update:open', $event)"
    @confirm="$emit('confirm', $event)"
    @cancel="$emit('cancel')"
  />
</template>
