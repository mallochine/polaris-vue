<template lang="pug">
Choice(
  :id="uniqueId",
  :disabled="disabled",
  :labelHidden="labelHidden",
  @mouseover="mouseOver = true",
  @mouseout="mouseOver = false",
)
  template(#label, v-if="hasSlot(slots.label) || label")
    slot(v-if="hasSlot(slots.label)", name="label")
    template(v-else) {{ label }}
  template(#help-text, v-if="hasSlot(slots['help-text']) || helpText")
    slot(v-if="hasSlot(slots['help-text'])", name="help-text")
    template(v-else) {{ helpText }}
  span(:class="styles.RadioButton")
    input(
      :id="uniqueId",
      :name="name || uniqueId",
      :value="value",
      type="radio",
      :checked="isChecked",
      :disabled="disabled",
      :class="inputClassName",
      :aria-describedby="formattedAriaDescribedBy",
      @focus="$emit('focus')",
      @change="handleChange",
      @blur="handleBlur",
      @keyup="handleKeyup",
    )
    span(:class="backdropClassName")
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@/classes/RadioButton.json';
import { hasSlot } from '@/utilities/has-slot';
import { UseUniqueId } from '@/use';
import { Choice } from '../Choice';
import { helpTextID } from '../Choice/utils';

interface Props {
  /** Indicates the ID of the element that describes the the radio button */
  ariaDescribedBy?: string;
  /** Label for the radio button */
  label?: string;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Radio button is selected */
  checked?: boolean;
  /** Additional text to aid in use. This prop will be overriden by `help-text` slot. */
  helpText?: string;
  /** Disable input */
  disabled?: boolean;
  /** ID for form input */
  id?: string;
  /** Name for form input */
  name?: string;
  /** Value for form input */
  value?: string;
  /** Value for v-model binding */
  modelValue?: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (event: 'focus'): void
  (event: 'change', changeEvent: Event): void
  (event: 'update:modelValue', value: string): void
  (event: 'blur'): void
}>();

const keyFocused = ref(false);
const mouseOver = ref(false);

const slots = useSlots();
const helpTextSlot = computed(() => slots['help-text']?.());

const { useUniqueId } = UseUniqueId();
const uniqueId = computed(() => useUniqueId('RadioButton', props.id));

const isChecked = computed(() => props.checked || props.modelValue === props.value);

const backdropClassName = computed(() => classNames(
  styles.Backdrop,
  mouseOver.value && styles.hover,
));
const inputClassName = computed(() => classNames(
  styles.Input,
  keyFocused.value && styles.keyFocused,
));

const formattedAriaDescribedBy = computed(() => {
  const describedBy: string[] = [];

  if (props.ariaDescribedBy) {
    describedBy.push(props.ariaDescribedBy);
  }

  if (helpTextSlot.value) {
    describedBy.push(helpTextID(uniqueId.value));
  }

  return describedBy.length ? describedBy.join(' ') : undefined;
});

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;

  emits('change', event);
  emits('update:modelValue', target.value);
}

const handleBlur = (): void => {
  emits('blur');
  keyFocused.value = false;
};

const handleKeyup = (): void => {
  if (!keyFocused.value) {
    keyFocused.value = true;
  }
};
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/RadioButton/RadioButton.scss';
</style>
