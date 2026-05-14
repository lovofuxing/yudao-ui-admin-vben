import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:graduation-cap',
      order: 30,
      title: $t('education.title'),
    },
    name: 'EducationCenter',
    path: '/education',
    redirect: '/education/student',
    children: [
      {
        component: () => import('#/views/education/student/index.vue'),
        meta: {
          icon: 'lucide:user-round',
          title: $t('education.student.title'),
        },
        name: 'EducationStudent',
        path: '/education/student',
      },
      {
        component: () => import('#/views/education/course/index.vue'),
        meta: {
          icon: 'lucide:book-open',
          title: $t('education.course.title'),
        },
        name: 'EducationCourse',
        path: '/education/course',
      },
      {
        component: () => import('#/views/education/class/index.vue'),
        meta: {
          icon: 'lucide:users-round',
          title: $t('education.class.title'),
        },
        name: 'EducationClass',
        path: '/education/class',
      },
      {
        component: () => import('#/views/education/schedule/index.vue'),
        meta: {
          icon: 'lucide:calendar-days',
          title: $t('education.schedule.title'),
        },
        name: 'EducationSchedule',
        path: '/education/schedule',
      },
      {
        component: () => import('#/views/education/record/index.vue'),
        meta: {
          icon: 'lucide:clipboard-list',
          title: $t('education.lessonRecord.title'),
        },
        name: 'EducationRecord',
        path: '/education/record',
      },
      {
        component: () => import('#/views/education/reservation/index.vue'),
        meta: {
          icon: 'lucide:calendar-check',
          title: $t('education.reservation.title'),
        },
        name: 'EducationReservation',
        path: '/education/reservation',
      },
      {
        component: () => import('#/views/education/quickDeduction/index.vue'),
        meta: {
          icon: 'lucide:badge-minus',
          title: $t('education.quickDeduction.title'),
        },
        name: 'EducationQuickDeduction',
        path: '/education/quickDeduction',
      },
      {
        component: () => import('#/views/education/faceDeduction/index.vue'),
        meta: {
          icon: 'lucide:scan-face',
          title: $t('education.faceDeduction.title'),
        },
        name: 'EducationFaceDeduction',
        path: '/education/faceDeduction',
      },
      {
        component: () => import('#/views/education/checkin/index.vue'),
        meta: {
          icon: 'lucide:badge-check',
          title: $t('education.faceCheckin.title'),
        },
        name: 'EducationCheckin',
        path: '/education/checkin',
      },
    ],
  },
];

export default routes;
