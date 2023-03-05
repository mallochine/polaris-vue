<template lang="pug">
Box(
  :background="background",
  :padding="padding",
  shadow="card",
  :border-radius="hasBorderRadius ? '2' : undefined",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type {
  BreakpointsAlias,
  ColorsActionTokenAlias,
  ColorsBackdropTokenAlias,
  ColorsBackgroundTokenAlias,
  ColorsOverlayTokenAlias,
  ColorsSurfaceTokenAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';
import { breakpoints } from '@shopify/polaris-tokens';
import { Box } from '@/components';
import type { ResponsiveProp } from '@/utilities/css';

type BackgroundColors =
  | ColorsBackdropTokenAlias
  | ColorsBackgroundTokenAlias
  | ColorsOverlayTokenAlias
  | ColorsActionTokenAlias
  | ColorsSurfaceTokenAlias;

type Spacing = ResponsiveProp<SpacingSpaceScale>;

interface Props {
  /** Background color
   * @default 'surface'
   */
  background?: BackgroundColors;
  /** The spacing around the card
   * @default {xs: '4', sm: '5'}
   * @example
   * padding='4'
   * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  padding?: Spacing;
  /** Border radius value above a set breakpoint */
  roundedAbove?: BreakpointsAlias;
}

const props = withDefaults(defineProps<Props>(), {
  background: 'surface',
  padding: { xs: '4', sm: '5' },
});

const hasBorderRadius = computed(() => {
  if (props.roundedAbove && breakpoints[`${props.roundedAbove}Up`]) {
    return true;
  }

  return !props.roundedAbove;
});

</script>
