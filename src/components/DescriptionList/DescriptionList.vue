<template lang="pug">
dl(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@/classes/DescriptionList.json';

const props = withDefaults(defineProps<{
  /**
   * Determines the spacing between list items
   * @default 'loose'
   */
  spacing?: 'loose' | 'tight';
}>(),
{
  spacing: 'loose',
});

const className = computed(() => {
  return classNames(
    styles.DescriptionList,
    props.spacing === 'tight' && styles.spacingTight,
  );
});
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/DescriptionList/DescriptionList.scss';
</style>
