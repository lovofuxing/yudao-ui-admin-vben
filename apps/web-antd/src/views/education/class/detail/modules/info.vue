<script lang="ts" setup>
import type { ClassDetail } from '#/api/education/class/detail';
import { Descriptions, Tag } from 'ant-design-vue';
import { $t } from '#/locales';
import {
  getEducationStatusColor,
  getEducationStatusText,
} from '../../../_utils/status';
defineProps<{ detail: ClassDetail }>();
</script>

<template>
  <Descriptions bordered :column="4" size="small" class="mb-4">
    <Descriptions.Item :label="$t('education.class.fields.className')">{{
      detail.className
    }}</Descriptions.Item>
    <Descriptions.Item :label="$t('education.class.fields.courseName')">{{
      detail.courseName
    }}</Descriptions.Item>
    <Descriptions.Item :label="$t('education.class.fields.headTeacher')">{{
      detail.headTeacher
    }}</Descriptions.Item>
    <Descriptions.Item :label="$t('education.class.fields.status')"
      ><Tag :color="getEducationStatusColor(detail.status)">{{
        getEducationStatusText(detail.status)
      }}</Tag></Descriptions.Item
    >
    <Descriptions.Item :label="$t('education.class.fields.classroom')">{{
      detail.classroom
    }}</Descriptions.Item>
    <Descriptions.Item :label="$t('education.class.fields.scheduleText')">{{
      detail.scheduleText
    }}</Descriptions.Item>
    <Descriptions.Item label="班级人数"
      >{{ detail.studentCount }}/{{ detail.capacity }}</Descriptions.Item
    >
    <Descriptions.Item label="授课模式">{{
      detail.teachMode
    }}</Descriptions.Item>
  </Descriptions>
</template>
