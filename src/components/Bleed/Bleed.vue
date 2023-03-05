<template lang="pug">
div(
  :class="styles.Bleed",
  :style="style",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getResponsiveProps } from '@/utilities/css';
import type { ResponsiveProp } from '@/utilities/css';
import type { SpacingSpaceScale } from '@shopify/polaris-tokens';
import styles from '@/classes/Bleed.json';

type Spacing = ResponsiveProp<SpacingSpaceScale>;

interface Props {
  /** Negative horizontal space around children */
  marginInline?: Spacing;
  /** Negative vertical space around children */
  marginBlock?: Spacing;
  /** Negative top space around children */
  marginBlockStart?: Spacing;
  /** Negative bottom space around children */
  marginBlockEnd?: Spacing;
  /** Negative left space around children */
  marginInlineStart?: Spacing;
  /** Negative right space around children */
  marginInlineEnd?: Spacing;
}

const props = defineProps<Props>();

const getNegativeMargins = (direction: string) => {
  const xAxis = ['marginInlineStart', 'marginInlineEnd'];
  const yAxis = ['marginBlockStart', 'marginBlockEnd'];

  const directionValues: {[key: string]: Spacing | undefined} = {
    marginBlockStart: props.marginBlockStart,
    marginBlockEnd: props.marginBlockEnd,
    marginInlineStart: props.marginInlineStart,
    marginInlineEnd: props.marginInlineEnd,
    marginInline: props.marginInline,
    marginBlock: props.marginBlock,
  };

  if (directionValues[direction]) {
    return directionValues[direction];
  } else if (xAxis.includes(direction) && props.marginInline) {
    return directionValues.marginInline;
  } else if (yAxis.includes(direction) && props.marginBlock) {
    return directionValues.marginBlock;
  }
};

const negativeMarginBlockStart = getNegativeMargins('marginBlockStart');
const negativeMarginBlockEnd = getNegativeMargins('marginBlockEnd');
const negativeMarginInlineStart = getNegativeMargins('marginInlineStart');
const negativeMarginInlineEnd = getNegativeMargins('marginInlineEnd');

const style = computed(() => {
  const fullStyles = {
    ...getResponsiveProps(
      'bleed',
      'margin-block-start',
      'space',
      negativeMarginBlockStart,
    ),
    ...getResponsiveProps(
      'bleed',
      'margin-block-end',
      'space',
      negativeMarginBlockEnd,
    ),
    ...getResponsiveProps(
      'bleed',
      'margin-inline-start',
      'space',
      negativeMarginInlineStart,
    ),
    ...getResponsiveProps(
      'bleed',
      'margin-inline-end',
      'space',
      negativeMarginInlineEnd,
    ),
  };

  return Object.keys(fullStyles).reduce((acc, key) => {
    if (fullStyles[key] !== undefined) {
      acc[key] = fullStyles[key];
    }
    return acc;
  }, {} as Record<string, any>);
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Bleed/Bleed.scss';
</style>
