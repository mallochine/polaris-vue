<template lang="pug">
DualThumb(
  v-if="isDualThumb",
  v-model="dualValue",
  v-bind="sharedProps",
  @input="handleChange",
  @focus="emits('focus')",
  @blur="emits('blur')",
)
  template(#label, v-if="hasSlot(slots.label) || label")
    slot(v-if="hasSlot(slots.label)", name="label")
    template(v-else) {{ label }}
  template(#help-text, v-if="hasSlot(slots['help-text']) || helpText")
    slot(v-if="hasSlot(slots['help-text'])", name="help-text")
    template(v-else) {{ helpText }}
  template(#prefix, v-if="hasSlot(slots.prefix) || prefix")
    slot(v-if="hasSlot(slots.prefix)", name="prefix")
    template(v-else) {{ prefix }}
  template(#suffix, v-if="hasSlot(slots.suffix) || suffix")
    slot(v-if="hasSlot(slots.suffix)", name="suffix")
    template(v-else) {{ suffix }}
SingleThumb(
  v-else,
  v-model="singleValue",
  v-bind="sharedProps",
  @input="handleChange",
  @focus="emits('focus')",
  @blur="emits('blur')",
)
  template(#label, v-if="hasSlot(slots.label) || label")
    slot(v-if="hasSlot(slots.label)", name="label")
    template(v-else) {{ label }}
  template(#help-text, v-if="hasSlot(slots['help-text']) || helpText")
    slot(v-if="hasSlot(slots['help-text'])", name="help-text")
    template(v-else) {{ helpText }}
  template(#prefix, v-if="hasSlot(slots.prefix) || prefix")
    slot(v-if="hasSlot(slots.prefix)", name="prefix")
    template(v-else) {{ prefix }}
  template(#suffix, v-if="hasSlot(slots.suffix) || suffix")
    slot(v-if="hasSlot(slots.suffix)", name="suffix")
    template(v-else) {{ suffix }}
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { UseUniqueId } from '@/use';
import type { LabelledProps } from '@/components/Labelled/utils';
import { hasSlot } from '@/utilities/has-slot';
import type { ErrorType } from '@/utilities/type';
import type { RangeSliderValue } from './types';
import { SingleThumb, DualThumb } from './components';

interface RangeSliderProps {
  /** Label for the range input. This prop will be overriden by `label` slot. */
  label?: string;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Initial value for range input */
  modelValue: RangeSliderValue;
  /** Additional text to aid in use. This prop will be overriden by `help-text` slot. */
  helpText?: string;
  /** Minimum possible value for range input */
  min?: number;
  /** Maximum possible value for range input */
  max?: number;
  /** Increment value for range input changes */
  step?: number;
  /** Provide a tooltip while sliding, indicating the current value */
  output?: boolean;
  /** Display an error message */
  error?: ErrorType;
  /** Disable input */
  disabled?: boolean;
  /** Element to display before the input. This prop will be overriden by `prefix` slot. */
  prefix?: string;
  /** Element to display after the input. This prop will be overriden by `suffix` slot. */
  suffix?: string;
}

const props = withDefaults(defineProps<RangeSliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
});

const emits = defineEmits<{
  (e: 'change', value: RangeSliderValue, id: string): void;
  (e: 'update:modelValue', value: RangeSliderValue, id: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}>();

const slots = useSlots();

const { useUniqueId } = UseUniqueId();
const id = useUniqueId('RangeSlider');

const isDualThumb = computed(() => Array.isArray(props.modelValue));

const singleValue = computed<number>(() => isDualThumb.value ? props.modelValue[0] : props.modelValue);

const dualValue = computed<[number, number]>(() => {
  return isDualThumb.value
    ? props.modelValue as [number, number]
    : [props.modelValue as number, (props.modelValue as number) + 1];
});

const sharedProps = computed(() => {
  const { label, modelValue, ...rest } = props;
  return {
    id,
    ...rest,
  };
});

const handleChange = (value: RangeSliderValue, thumbId: string) => {
  emits('change', value, thumbId);
  emits('update:modelValue', value, thumbId);
};
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/RangeSlider/RangeSlider.scss';
</style>
