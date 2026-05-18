<script lang="ts" setup>
import type { StudentDetail } from '#/api/education/student/detail';

import { ref, watch } from 'vue';
import { Drawer } from 'ant-design-vue';
import { Tabs } from 'ant-design-vue';

import { getEducationStudent } from '#/api/education/student';
import { $t } from '#/locales';

import Info from './modules/info.vue';
import TabClassRecord from './modules/tab-class-record.vue';
import TabCommunication from './modules/tab-communication.vue';
import TabCourse from './modules/tab-course.vue';
import TabDeduction from './modules/tab-deduction.vue';
import TabFollow from './modules/tab-follow.vue';
import TabGrowth from './modules/tab-growth.vue';
import TabLeave from './modules/tab-leave.vue';
import TabPoints from './modules/tab-points.vue';
import TabSchedule from './modules/tab-schedule.vue';
import TabTrial from './modules/tab-trial.vue';

interface Props {
  studentId?: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'close'): void }>();

const detail = ref<StudentDetail>();
const loading = ref(false);
const activeTab = ref('follow');

watch(
  () => props.studentId,
  async (id) => {
    if (!id) return;
    loading.value = true;
    try {
      const student = await getEducationStudent(id);
      detail.value = {
        ...student,
        gender: '男',
        birthday: '2015-03-15',
        school: '阳光小学',
        grade: '三年级',
        address: '朝阳区阳光路 100 号',
      } as StudentDetail;
    } finally {
      loading.value = false;
    }
  },
  { immediate: true },
);
</script>

<template>
  <Drawer
    :open="!!props.studentId"
    :loading="loading"
    :title="$t('education.student.detail.title')"
    :width="'85%'"
    @close="emit('close')"
  >
    <template v-if="detail">
      <Info :detail="detail" />
      <Tabs v-model:activeKey="activeTab" class="mt-4">
        <Tabs.TabPane key="follow" :tab="$t('education.student.tab.follow')">
          <TabFollow :student-id="props.studentId!" />
        </Tabs.TabPane>
        <Tabs.TabPane key="trial" :tab="$t('education.student.tab.trial')">
          <TabTrial :student-id="props.studentId!" />
        </Tabs.TabPane>
        <Tabs.TabPane key="course" :tab="$t('education.student.tab.course')">
          <TabCourse :student-id="props.studentId!" />
        </Tabs.TabPane>
        <Tabs.TabPane
          key="class-record"
          :tab="$t('education.student.tab.classRecord')"
        >
          <TabClassRecord :student-id="props.studentId!" />
        </Tabs.TabPane>
        <Tabs.TabPane
          key="deduction"
          :tab="$t('education.student.tab.deduction')"
        >
          <TabDeduction :student-id="props.studentId!" />
        </Tabs.TabPane>
        <Tabs.TabPane
          key="schedule"
          :tab="$t('education.student.tab.schedule')"
        >
          <TabSchedule :student-id="props.studentId!" />
        </Tabs.TabPane>
        <Tabs.TabPane
          key="communication"
          :tab="$t('education.student.tab.communication')"
        >
          <TabCommunication :student-id="props.studentId!" />
        </Tabs.TabPane>
        <Tabs.TabPane key="growth" :tab="$t('education.student.tab.growth')">
          <TabGrowth :student-id="props.studentId!" />
        </Tabs.TabPane>
        <Tabs.TabPane key="leave" :tab="$t('education.student.tab.leave')">
          <TabLeave :student-id="props.studentId!" />
        </Tabs.TabPane>
        <Tabs.TabPane key="points" :tab="$t('education.student.tab.points')">
          <TabPoints :student-id="props.studentId!" />
        </Tabs.TabPane>
      </Tabs>
    </template>
  </Drawer>
</template>
