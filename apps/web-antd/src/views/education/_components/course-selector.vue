<script lang="ts" setup generic="T extends Record<string, any>">
import EducationSelector from './EducationSelector.vue';

/**
 * 课程选择器 —— 弹窗搜索并选择课程。
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
