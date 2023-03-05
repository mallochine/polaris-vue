<template lang="pug">
component(
  :is="as",
  :class="className",
  :id="id",
  :ref="ref",
  :style="style",
)
  slot
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  getResponsiveProps,
  classNames,
} from '@/utilities/css';

import type { ResponsiveProp } from '@/utilities/css';

import type {
  ColorsActionTokenAlias,
  ColorsBackdropTokenAlias,
  ColorsBackgroundTokenAlias,
  ColorsOverlayTokenAlias,
  ColorsSurfaceTokenAlias,
  ShapeBorderWidthScale,
  DepthShadowAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import styles from '@/classes/Box.json';

type Element = 'div' | 'span' | 'section' | 'legend' | 'ul' | 'li';

type Overflow = 'hidden' | 'scroll';
type Position = 'relative' | 'absolute' | 'fixed' | 'sticky';

type ColorTokenScale =
  | 'text'
  | 'text-critical'
  | 'text-disabled'
  | 'text-highlight'
  | 'text-on-critical'
  | 'text-on-dark'
  | 'text-on-interactive'
  | 'text-on-primary'
  | 'text-primary'
  | 'text-primary-hovered'
  | 'text-primary-pressed'
  | 'text-subdued'
  | 'text-subdued-on-dark'
  | 'text-success'
  | 'text-warning';

type BorderTokenAlias =
  | 'base'
  | 'dark'
  | 'divider'
  | 'divider-on-dark'
  | 'transparent';

type Spacing = ResponsiveProp<SpacingSpaceScale>;

type BorderRadiusTokenScale =
  | '05'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | 'full';

type BackgroundColors =
  | ColorsBackdropTokenAlias
  | ColorsBackgroundTokenAlias
  | ColorsOverlayTokenAlias
  | ColorsActionTokenAlias
  | ColorsSurfaceTokenAlias;

interface Props {
  /** HTML Element type */
  as?: Element;
  /** Background color */
  background?: BackgroundColors;
  /** Border style */
  border?: BorderTokenAlias;
  /** Vertical end border style */
  borderBlockEnd?: BorderTokenAlias;
  /** Horizontal start border style */
  borderInlineStart?: BorderTokenAlias;
  /** Horizontal end border style */
  borderInlineEnd?: BorderTokenAlias;
  /** Vertical start border style */
  borderBlockStart?: BorderTokenAlias;
  /** Border radius */
  borderRadius?: BorderRadiusTokenScale;
  /** Vertical end horizontal start border radius */
  borderRadiusEndStart?: BorderRadiusTokenScale;
  /** Vertical end horizontal end border radius */
  borderRadiusEndEnd?: BorderRadiusTokenScale;
  /** Vertical start horizontal start border radius */
  borderRadiusStartStart?: BorderRadiusTokenScale;
  /** Vertical start horizontal end border radius */
  borderRadiusStartEnd?: BorderRadiusTokenScale;
  /** Border width */
  borderWidth?: ShapeBorderWidthScale;
  /** Vertical start border width */
  borderBlockStartWidth?: ShapeBorderWidthScale;
  /** Vertical end border width */
  borderBlockEndWidth?: ShapeBorderWidthScale;
  /** Horizontal start border width */
  borderInlineStartWidth?: ShapeBorderWidthScale;
  /** Horizontal end border width */
  borderInlineEndWidth?: ShapeBorderWidthScale;
  /** Color of children */
  color?: ColorTokenScale;
  /** HTML id attribute */
  id?: string;
  /** Minimum height of container */
  minHeight?: string;
  /** Minimum width of container */
  minWidth?: string;
  /** Maximum width of container */
  maxWidth?: string;
  /** Clip horizontal content of children */
  overflowX?: Overflow;
  /** Clip vertical content of children */
  overflowY?: Overflow;
  /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * padding='4'
   * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
   padding?: Spacing;
  /** Vertical start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockStart='4'
   * paddingBlockStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlockStart?: Spacing;
  /** Vertical end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockEnd='4'
   * paddingBlockEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlockEnd?: Spacing;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineStart='4'
   * paddingInlineStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInlineStart?: Spacing;
  /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineEnd='4'
   * paddingInlineEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInlineEnd?: Spacing;
  /** Aria role */
  role?: 'status' | 'presentation' | 'menu' | 'listbox' | 'combobox';
  /** Shadow on box */
  shadow?: DepthShadowAlias;
  /** Set tab order */
  tabIndex?: number;
  /** Width of container */
  width?: string;
  // These could be moved to new layout component(s) in the future
  /** Position of box */
  position?: Position;
  /** Top position of box */
  insetBlockStart?: Spacing;
  /** Bottom position of box */
  insetBlockEnd?: Spacing;
  /** Left position of box */
  insetInlineStart?: Spacing;
  /** Right position of box */
  insetInlineEnd?: Spacing;
  /** Opacity of box */
  opacity?: string;
  /** Outline style */
  outline?: BorderTokenAlias;
  /** Visually hide the contents during print */
  printHidden?: boolean;
  /** Visually hide the contents (still announced by screenreader) */
  visuallyHidden?: boolean;
  /** z-index of box */
  zIndex?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
});

const style = computed(() => {
  const fullStyle = {
    '--pc-box-color': props.color ? `var(--p-${props.color})` : undefined,
    '--pc-box-background': props.background ? `var(--p-${props.background})` : undefined,
    '--pc-box-border': props.border ? `var(--p-border-${props.border})` : undefined,
    '--pc-box-border-block-end': props.borderBlockEnd
      ? `var(--p-border-${props.borderBlockEnd})`
      : undefined,
    '--pc-box-border-inline-start': props.borderInlineStart
      ? `var(--p-border-${props.borderInlineStart})`
      : undefined,
    '--pc-box-border-inline-end': props.borderInlineEnd
      ? `var(--p-border-${props.borderInlineEnd})`
      : undefined,
    '--pc-box-border-block-start': props.borderBlockStart
      ? `var(--p-border-${props.borderBlockStart})`
      : undefined,
    '--pc-box-border-radius': props.borderRadius
      ? `var(--p-border-radius-${props.borderRadius})`
      : undefined,
    '--pc-box-border-radius-end-start': props.borderRadiusEndStart
      ? `var(--p-border-radius-${props.borderRadiusEndStart})`
      : undefined,
    '--pc-box-border-radius-end-end': props.borderRadiusEndEnd
      ? `var(--p-border-radius-${props.borderRadiusEndEnd})`
      : undefined,
    '--pc-box-border-radius-start-start': props.borderRadiusStartStart
      ? `var(--p-border-radius-${props.borderRadiusStartStart})`
      : undefined,
    '--pc-box-border-radius-start-end': props.borderRadiusStartEnd
      ? `var(--p-border-radius-${props.borderRadiusStartEnd})`
      : undefined,
    '--pc-box-border-width': props.borderWidth
      ? `var(--p-border-width-${props.borderWidth})`
      : undefined,
    '--pc-box-border-block-start-width': props.borderBlockStartWidth
      ? `var(--p-border-width-${props.borderBlockStartWidth})`
      : undefined,
    '--pc-box-border-block-end-width': props.borderBlockEndWidth
      ? `var(--p-border-width-${props.borderBlockEndWidth})`
      : undefined,
    '--pc-box-border-inline-start-width': props.borderInlineStartWidth
      ? `var(--p-border-width-${props.borderInlineStartWidth})`
      : undefined,
    '--pc-box-border-inline-end-width': props.borderInlineEndWidth
      ? `var(--p-border-width-${props.borderInlineEndWidth})`
      : undefined,
    '--pc-box-min-height': props.minHeight,
    '--pc-box-min-width': props.minWidth,
    '--pc-box-max-width': props.maxWidth,
    '--pc-box-outline': props.outline ? `var(--p-border-${props.outline})` : undefined,
    '--pc-box-overflow-x': props.overflowX,
    '--pc-box-overflow-y': props.overflowY,
    ...getResponsiveProps(
      'box',
      'padding-block-end',
      'space',
      props.paddingBlockEnd || props.padding as string,
    ),
    ...getResponsiveProps(
      'box',
      'padding-block-start',
      'space',
      props.paddingBlockStart || props.padding as string,
    ),
    ...getResponsiveProps(
      'box',
      'padding-inline-start',
      'space',
      props.paddingInlineStart || props.padding as string,
    ),
    ...getResponsiveProps(
      'box',
      'padding-inline-end',
      'space',
      props.paddingInlineEnd || props.padding as string,
    ),
    '--pc-box-shadow': props.shadow ? `var(--p-shadow-${props.shadow})` : undefined,
    '--pc-box-width': props.width ? props.width : undefined,
    position: props.position ? props.position : undefined,
    '--pc-box-inset-block-start': props.insetBlockStart
      ? `var(--p-space-${props.insetBlockStart})`
      : undefined,
    '--pc-box-inset-block-end': props.insetBlockEnd
      ? `var(--p-space-${props.insetBlockEnd})`
      : undefined,
    '--pc-box-inset-inline-start': props.insetInlineStart
      ? `var(--p-space-${props.insetInlineStart})`
      : undefined,
    '--pc-box-inset-inline-end': props.insetInlineEnd
      ? `var(--p-space-${props.insetInlineEnd})`
      : undefined,
    zIndex: props.zIndex ? props.zIndex : undefined,
    opacity: props.opacity ? props.opacity : undefined,
  };

  // Remove all undefined values
  return Object.keys(fullStyle).reduce((acc, key) => {
    if (fullStyle[key] !== undefined) {
      acc[key] = fullStyle[key];
    }
    return acc;
  }, {} as Record<string, string>);
});

const className = classNames(
  styles.Box,
  props.visuallyHidden && styles.visuallyHidden,
  props.printHidden && styles.printHidden,
  props.as === 'ul' && styles.listReset,
);
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Box/Box.scss';
</style>
