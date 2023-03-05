<template lang="pug">
component(
  :is="as",
  :class="className",
  :style="style",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type {
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';
import type { ResponsiveProp } from '@/utilities/css';
import { classNames, getResponsiveProps } from '@/utilities/css';

import styles from '@/classes/AlphaStack.json';

type Align = 'start' | 'end' | 'center';

type Element = 'div' | 'ul' | 'ol' | 'fieldset';

type Gap = ResponsiveProp<SpacingSpaceScale>;

interface Props {
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Horizontal alignment of children
   * @default 'start'
   */
  align?: Align;
  /** Toggle children to be full width
   * @default false
   */
   fullWidth?: boolean;
  /** The spacing between children */
  gap?: Gap;
  /** HTML id attribute */
  id?: string;
  /** Reverse the render order of child items
   * @default false
   */
  reverseOrder?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  align: 'start',
  spacing: '4',
  fullWidth: false,
  reverseOrder: false,
});

const className = computed(() => classNames(
  styles.AlphaStack,
  props.fullWidth && styles.fullWidth,
  props.as === 'ul' && styles.listReset,
  props.as === 'fieldset' && styles.fieldsetReset,
));

const style = computed(() => {
  return {
    '--pc-stack-align': props.align ? `${props.align}` : '',
    '--pc-stack-order': props.reverseOrder ? 'column-reverse' : 'column',
    ...getResponsiveProps('stack', 'gap', 'space', props.gap),
  };
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/AlphaStack/AlphaStack.scss';
</style>
