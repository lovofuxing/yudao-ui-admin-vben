<script lang="ts" setup>
import type { StudentDetail } from '#/api/education/student/detail';

import { Descriptions, Tag } from 'ant-design-vue';

import { $t } from '#/locales';
import {
  getEducationStatusColor,
  getEducationStatusText,
} from '../../../_utils/status';

defineProps<{ detail: StudentDetail }>();
</script>

<template>
  <Descriptions bordered :column="4" size="small" class="mb-4">
    <Descriptions.Item :label="$t('education.student.fields.studentName')">
      {{ detail.studentName }}
    </Descriptions.Item>
    <Descriptions.Item :label="$t('education.student.fields.phone')">
      {{ detail.phone }}
    </Descriptions.Item>
    <Descriptions.Item label="性别">{{ detail.gender }}</Descriptions.Item>
    <Descriptions.Item label="生日">{{ detail.birthday }}</Descriptions.Item>
    <Descriptions.Item :label="$t('education.student.fields.className')">
      {{ detail.className }}
    </Descriptions.Item>
    <Descriptions.Item :label="$t('education.student.fields.courseName')">
      {{ detail.courseName }}
    </Descriptions.Item>
    <Descriptions.Item :label="$t('education.student.fields.advisor')">
      {{ detail.advisor }}
    </Descriptions.Item>
    <Descriptions.Item :label="$t('education.student.fields.status')">
      <Tag :color="getEducationStatusColor(detail.status)">
        {{ getEducationStatusText(detail.status) }}
      </Tag>
    </Descriptions.Item>
    <Descriptions.Item :label="$t('education.student.fields.remainingHours')">
      {{ detail.remainingHours }}
    </Descriptions.Item>
    <Descriptions.Item :label="$t('education.student.fields.enrollTime')">
      {{ detail.enrollTime }}
    </Descriptions.Item>
    <Descriptions.Item label="学校">{{ detail.school }}</Descriptions.Item>
    <Descriptions.Item label="年级">{{ detail.grade }}</Descriptions.Item>
  </Descriptions>
</template>
