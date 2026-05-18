<script lang="ts" setup>
import type { AnalysisOverviewItem } from '@vben/common-ui';
import type { TabOption } from '@vben/types';

import {
  AnalysisChartCard,
  AnalysisChartsTabs,
  AnalysisOverview,
} from '@vben/common-ui';
import {
  SvgBellIcon,
  SvgCakeIcon,
  SvgCardIcon,
  SvgDownloadIcon,
} from '@vben/icons';

import { $t } from '#/locales';

import AnalyticsTrends from './analytics-trends.vue';
import AnalyticsVisitsData from './analytics-visits-data.vue';
import AnalyticsVisitsSales from './analytics-visits-sales.vue';
import AnalyticsVisitsSource from './analytics-visits-source.vue';
import AnalyticsVisits from './analytics-visits.vue';

const overviewItems: AnalysisOverviewItem[] = [
  {
    icon: SvgCardIcon,
    title: $t('dashboard.analytics.overview.users'),
    totalTitle: $t('dashboard.analytics.overview.totalUsers'),
    totalValue: 120_000,
    value: 2000,
  },
  {
    icon: SvgCakeIcon,
    title: $t('dashboard.analytics.overview.visits'),
    totalTitle: $t('dashboard.analytics.overview.totalVisits'),
    totalValue: 500_000,
    value: 20_000,
  },
  {
    icon: SvgDownloadIcon,
    title: $t('dashboard.analytics.overview.downloads'),
    totalTitle: $t('dashboard.analytics.overview.totalDownloads'),
    totalValue: 120_000,
    value: 8000,
  },
  {
    icon: SvgBellIcon,
    title: $t('dashboard.analytics.overview.usage'),
    totalTitle: $t('dashboard.analytics.overview.totalUsage'),
    totalValue: 50_000,
    value: 5000,
  },
];

const chartTabs: TabOption[] = [
  {
    label: $t('dashboard.analytics.charts.trends'),
    value: 'trends',
  },
  {
    label: $t('dashboard.analytics.charts.monthlyVisits'),
    value: 'visits',
  },
];
</script>

<template>
  <div class="p-5">
    <AnalysisOverview :items="overviewItems" />
    <AnalysisChartsTabs :tabs="chartTabs" class="mt-5">
      <template #trends>
        <AnalyticsTrends />
      </template>
      <template #visits>
        <AnalyticsVisits />
      </template>
    </AnalysisChartsTabs>

    <div class="mt-5 w-full md:flex">
      <AnalysisChartCard
        class="mt-5 md:mt-0 md:mr-4 md:w-1/3"
        :title="$t('dashboard.analytics.charts.visitCount')"
      >
        <AnalyticsVisitsData />
      </AnalysisChartCard>
      <AnalysisChartCard
        class="mt-5 md:mt-0 md:mr-4 md:w-1/3"
        :title="$t('dashboard.analytics.charts.visitSource')"
      >
        <AnalyticsVisitsSource />
      </AnalysisChartCard>
      <AnalysisChartCard
        class="mt-5 md:mt-0 md:w-1/3"
        :title="$t('dashboard.analytics.charts.visitSales')"
      >
        <AnalyticsVisitsSales />
      </AnalysisChartCard>
    </div>
  </div>
</template>
