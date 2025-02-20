<template lang="pug">
div(:class="styles.Navigation", :ref="setRef")
  Button(
    plain,
    :icon="ChevronLeftMinor",
    :disabled="isScrolledFarthestLeft",
    :accessibilityLabel="leftA11yLabel",
    @click="$emit('navigate-table-left')",
  )
  template(
    v-for="column, index in columnVisibilityData",
    :key="`pip-${index}`",
  )
    div(
      v-if="fixedFirstColumns <= index",
      :class="classNames(styles.Pip, column.isVisible && styles['Pip-visible'])",
    )
  Button(
    plain,
    :icon="ChevronRightMinor",
    :disabled="isScrolledFarthestRight",
    :accessibilityLabel="rightA11yLabel",
    @click="$emit('navigate-table-right')",
  )
</template>

<script setup lang="ts">
import { classNames } from '@/utilities/css';
import { UseI18n } from '@/use';
import { Button } from '@/components';
import ChevronLeftMinor from '@icons/ChevronLeftMinor.svg';
import ChevronRightMinor from '@icons/ChevronRightMinor.svg';
import styles from '@/classes/DataTable.json';
import type { ColumnVisibilityData } from '../../types';
import { ref } from 'vue';

interface NavigationProps {
  columnVisibilityData: ColumnVisibilityData[];
  isScrolledFarthestLeft?: boolean;
  isScrolledFarthestRight?: boolean;
  fixedFirstColumns: number;
  setRef?: (ref: any) => void;
}

defineProps<NavigationProps>();

const i18n = UseI18n();

const navigationRef = ref<HTMLDivElement | null>(null);

const leftA11yLabel = i18n.translate(
  'Polaris.DataTable.navAccessibilityLabel',
  { direction: 'left' },
);

const rightA11yLabel = i18n.translate(
  'Polaris.DataTable.navAccessibilityLabel',
  { direction: 'right' },
);

defineExpose({ el: navigationRef });
</script>

