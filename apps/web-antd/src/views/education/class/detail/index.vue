<script lang="ts" setup>
import type { ClassDetail } from '#/api/education/class/detail';

import { ref, watch } from 'vue';

import { Drawer, Tabs } from 'ant-design-vue';

import { getEducationClass } from '#/api/education/class';
import { $t } from '#/locales';

import Info from './modules/info.vue';
import TabOrders from './modules/tab-orders.vue';
import TabRecord from './modules/tab-record.vue';
import TabSchedule from './modules/tab-schedule.vue';
import TabScheduleConfig from './modules/tab-schedule-config.vue';
import TabStudents from './modules/tab-students.vue';

interface Props { classId?: number }
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'close'): void }>();

const detail = ref<ClassDetail>();
const loading = ref(false);
const activeTab = ref('students');

watch(() => props.classId, async (id) => {
  if (!id) return;
  loading.value = true;
  try {
    const cls = await getEducationClass(id);
    detail.value = { ...cls, capacity: 20, studentCount: 15, scheduleText: '周一/周四 10:00-11:30', startDate: '2026-05-01', endDate: '2026-08-31', teachMode: '线下', remark: '' } as ClassDetail;
  } finally { loading.value = false; }
}, { immediate: true });
</script>

<template>
  <Drawer :open="!!props.classId" :loading="loading" :title="$t('education.class.detail.title')" :width="'85%'" @close="emit('close')">
    <template v-if="detail">
      <Info :detail="detail" />
      <Tabs v-model:activeKey="activeTab" class="mt-4">
        <Tabs.TabPane key="students" :tab="$t('education.class.tab.students')"><TabStudents :class-id="props.classId!" /></Tabs.TabPane>
        <Tabs.TabPane key="schedule" :tab="$t('education.class.tab.schedule')"><TabSchedule :class-id="props.classId!" /></Tabs.TabPane>
        <Tabs.TabPane key="record" :tab="$t('education.class.tab.record')"><TabRecord :class-id="props.classId!" /></Tabs.TabPane>
        <Tabs.TabPane key="schedule-config" :tab="$t('education.class.tab.scheduleConfig')"><TabScheduleConfig :class-id="props.classId!" /></Tabs.TabPane>
        <Tabs.TabPane key="orders" :tab="$t('education.class.tab.orders')"><TabOrders :class-id="props.classId!" /></Tabs.TabPane>
      </Tabs>
    </template>
  </Drawer>
</template>
