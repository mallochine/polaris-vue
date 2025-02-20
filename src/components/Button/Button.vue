<template lang="pug">
div(
  v-if="connectedDisclosure",
  :class="styles.ConnectedDisclosureWrapper",
)
  ButtonMarkup(
    v-bind="buttonMarkupProps",
    v-on="listeners",
  )
    slot
  Popover(
    preferredAlignment="right",
    :active="disclosureActive",
    @close="toggleDisclosureActive",
  )
    template(#activator)
      button(
        type="button",
        :class="connectedDisclosureClassName",
        :aria-disabled="connectedDisclosureData.disabled",
        :tabIndex="connectedDisclosureData.disabled ? -1 : undefined",
        :aria-label="connectedDisclosureData.disclosureLabel",
        :aria-describedby="ariaDescribedBy",
        :aria-checked="ariaChecked",
        @click="handleClick",
        @mouseup="handleMouseUpByBlurring",
      )
        span
          Icon(:source="CaretDownMinor")
    template(#content)
      ActionList(
        :items="connectedDisclosure.actions",
        @action-any-item="toggleDisclosureActive",
      )
        template(v-for="{prefixId} in connectedDisclosure.actions" #[`prefix-${prefixId}`])
          slot(:name="`prefix-${prefixId}`")
        template(v-for="{suffixId} in connectedDisclosure.actions" #[`suffix-${suffixId}`])
          slot(:name="`suffix-${suffixId}`")
ButtonMarkup(
  v-else,
  v-bind="buttonMarkupProps",
  v-on="listeners",
)
  slot
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import CaretDownMinor from '@icons/CaretDownMinor.svg';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import { capitalize } from '@/utilities/capitalize';
import { useDisableClick } from '@/utilities/use-disable-interaction';
import type { IconSource } from '@/utilities/type';
import styles from '@/classes/Button.json';
import type { ConnectedDisclosure } from './utils';
import { Popover } from '../Popover';
import { ActionList } from '../ActionList';
import { Icon } from '../Icon';
import ButtonMarkup from './ButtonMarkup.vue';

interface Props {
  /** A unique identifier for the button */
  id?: string;
  /** A destination to link to, rendered in the href attribute of a link */
  url?: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Tells the browser to download the url instead of opening it.
   * Provides a hint for the downloaded filename if it is a string value */
  download?: string | boolean;
  /** Allows the button to submit a form */
  submit?: boolean;
  /** Disables the button, disallowing merchant interaction */
  disabled?: boolean;
  /** Replaces button text with a spinner while a background action is being performed */
  loading?: boolean;
  /** Sets the button in a pressed state */
  pressed?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** A valid WAI-ARIA role to define the semantic value of this element */
  role?: string;
  /** Id of the element the button controls */
  ariaControls?: string;
  /** Tells screen reader the controlled element is expanded */
  ariaExpanded?: boolean;
  /** Indicates the ID of the element that describes the button */
  ariaDescribedBy?: string;
  /** Indicates the current checked state of the button when acting as a toggle or switch */
  ariaChecked?: boolean;
  /**
   * Provides extra visual weight and identifies the primary action in a set of buttons
   */
  primary?: boolean;
  /**
   * Indicates a dangerous or potentially negative action
   */
  destructive?: boolean;
  /**
   * Changes the size of the button, giving it more or less padding
   * @values slim | medium | large
   */
  size?: 'slim' | 'medium' | 'large';
  /**
   * Changes the inner text alignment of the button
   * @values left | center | right
   */
  textAlign?: 'left' | 'right' | 'center' | 'start' | 'end';
  /**
   * Gives the button a subtle alternative to the default button styling,
   * appropriate for certain backdrops
   */
  outline?: boolean;
  /**
   * Indicates a dangerous or potentially negative action
   */
  fullWidth?: boolean;
  /**
   * Displays the button with a disclosure icon. Defaults to `down` when set to true
   * @values down | up | select | boolean
   */
  disclosure?: 'down' | 'up' | 'select' | boolean;
  /**
   * Renders a button that looks like a link
   */
  plain?: boolean;
  /**
   * Makes plain and outline Button colors (text, borders, icons) the same as the current text color
   * Also adds an underline to `plain` Buttons
   */
  monochrome?: boolean;
  /**
   * Removes underline from button text (including on interaction)when monochrome and plain are true
   */
  removeUnderline?: boolean;
  /**
   * Icon to display to the left of the button content.
   */
  icon?: IconSource;
  /**
   * Disclosure button connected right of the button. Toggles a popover action list.
   */
  connectedDisclosure?: ConnectedDisclosure;
  /** Indicates whether or not the button is the primary navigation link when rendered inside of an `IndexTable.Row` */
  dataPrimaryLink?: boolean;
}

const MAX_RANDOM_NUMBER = 99999;

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  disclosure: undefined,
  textAlign: undefined,
  url: '',
});

const slots = useSlots();
const attrs = useAttrs();

const hasChildren = !!slots.default;

const disclosureActive = ref<boolean>(false);

const listeners = computed(() => {
  const events = ['blur', 'click', 'focus', 'keydown', 'keypress', 'keyup', 'mouseover', 'touchstart', 'pointerdown'];
  const eventBindings: Record<string, unknown> = {};

  for (const event of events) {
    const eventName = `on${capitalize(event)}`;

    if (attrs[eventName]) {
      eventBindings[event] = attrs[eventName];
    }
  }

  return eventBindings;
});

const isDisabled = computed(() => props.disabled || props.loading);

const className = computed(() => {
  const textAlignVariation = props.textAlign
    && variationName('textAlign', props.textAlign) as keyof typeof styles;
  const sizeVariation = props.size && variationName('size', props.size) as keyof typeof styles;

  return classNames(
    styles.Button,
    props.primary && styles.primary,
    props.outline && styles.outline,
    props.destructive && styles.destructive,
    isDisabled.value && styles.disabled,
    props.loading && styles.loading,
    props.plain && styles.plain,
    props.pressed && !props.disabled && !props.url && styles.pressed,
    props.monochrome && styles.monochrome,
    props.size !== 'medium' && sizeVariation && styles[sizeVariation],
    textAlignVariation && styles[textAlignVariation],
    props.fullWidth && styles.fullWidth,
    props.icon && !hasChildren && styles.iconOnly,
    props.connectedDisclosure && styles.connectedDisclosure,
    props.removeUnderline && styles.removeUnderline,
  );
});

const connectedDisclosureClassName = computed(() => {
  const textAlignVariation = props.textAlign
    && variationName('textAlign', props.textAlign) as keyof typeof styles;
  const sizeVariation = props.size && variationName('size', props.size) as keyof typeof styles;

  return classNames(
    styles.Button,
    props.primary && styles.primary,
    props.outline && styles.outline,
    props.size !== 'medium' && sizeVariation && styles[sizeVariation],
    textAlignVariation && styles[textAlignVariation],
    props.destructive && styles.destructive,
    props.connectedDisclosure && props.connectedDisclosure.disabled && styles.disabled,
    styles.iconOnly,
    styles.ConnectedDisclosure,
    props.monochrome && styles.monochrome,
  );
});

const commonProps = computed(() => {
  const { id, accessibilityLabel, role, ariaDescribedBy } = props;

  return {
    id,
    class: className.value,
    accessibilityLabel,
    role,
    ariaDescribedBy,
    'data-primary-link': props.dataPrimaryLink,
  };
});

const linkProps = computed(() => {
  const { url, external, download } = props;

  return { url, external, download };
});

const actionProps = computed(() => {
  const { submit, loading, pressed } = props;

  return {
    submit,
    loading,
    pressed,
    disabled: isDisabled.value,
  };
});

const buttonMarkupProps = computed(() => {
  const { removeUnderline, disclosure, loading, icon } = props;

  return {
    commonProps: commonProps.value,
    linkProps: linkProps.value,
    actionProps: actionProps.value,
    removeUnderline,
    children: hasChildren,
    disclosure,
    loading,
    icon,
  };
});

const connectedDisclosureData = computed(() => {
  if (props.connectedDisclosure) {
    const {
      disabled,
      accessibilityLabel: disclosureLabel = 'Related actions',
    } = props.connectedDisclosure;

    return { disabled, disclosureLabel };
  }

  return {};
});

const toggleDisclosureActive = () => {
  disclosureActive.value = !disclosureActive.value;
};

const handleClick = computed(
  () => useDisableClick(connectedDisclosureData.value.disabled, toggleDisclosureActive),
);
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Button/Button.scss';
</style>
