<template lang="pug">
fieldset(
  :id="finalName",
  :class="className",
  :aria-invalid="error !== null",
)
  legend(v-if="$slots.default", :class="styles.Title")
    Text(as="span", variant="bodyMd")
      slot
  ul(:class="styles.Choices")
    li(
      v-for="choice, index in choices",
      :key="index",
      :class="styles.ChoiceItem",
    )
      component(
        :is="allowMultiple ? Checkbox : RadioButton",
        :name="finalName",
        :id="id",
        :value="choice.value",
        :checked="isChoiceSelected(choice)",
        :disabled="choice.disabled || disabled",
        :ariaDescribedBy="error && choice.describedByError ? errorTextID(finalName) : null",
        @change="handleChange",
      )
        template(#label, v-if="choice.label")
          span {{ choice.label }}
        template(#help-text, v-if="choice.helpText")
          span {{ choice.helpText }}
      div(
        v-if="typeof choice.renderChildren === 'string'",
        v-html="choice.renderChildren",
        :class="styles.ChoiceChildren",
      )
      component(
        v-else
        :is="choice.renderChildren",
        :class="styles.ChoiceChildren",
      )
  div(v-if="error", :class="styles.ChoiceError")
    InlineError(:fieldID="finalName", :message="error")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import { UseUniqueId } from '@/use';
import styles from '@/classes/ChoiceList.json';
import type { ErrorType } from '@/utilities/type';
import { Checkbox, RadioButton, InlineError, Text } from '@/components';
import { errorTextID } from '../InlineError/utils';

interface Choice {
  value: string;
  label: string;
  disabled?: boolean;
  helpText?: string;
  describedByError?: boolean;
  renderChildren?: string | Record<string, unknown>;
}

interface Props {
  /** Collection of choices */
  choices: Choice[];
  /** V-model will automatically bind to this prop */
  modelValue: string | string[];
  /** Name for form input */
  name?: string;
  /** Allow merchants to select multiple options at once */
  allowMultiple?: boolean;
  /** Toggles display of the title */
  titleHidden?: boolean;
  /** Display an error message */
  error?: ErrorType;
  /** A unique identifier for the choice */
  id?: string;
  /** Disable all choices */
  disabled?: boolean;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (event: 'change', changeEvent: Event): void
  (event: 'update:modelValue', value: string | string[]): void
}>();

const { useUniqueId } = UseUniqueId();
const uniqueId = computed(() => useUniqueId('ChoiceList', props.name));
const finalName = computed(() => props.allowMultiple
  ? `${uniqueId.value}[]`
  : uniqueId.value,
);

const className = computed(() => classNames(
  styles.ChoiceList,
  props.titleHidden && styles.titleHidden,
));

const isChoiceSelected = (choice: Choice): boolean => (
  props.allowMultiple
    ? props.modelValue.includes(choice.value)
    : props.modelValue === choice.value
);

const updateSelectedChoices = (event: Event): string | string[] => {
  const target = event.target as HTMLInputElement;

  if (target.checked) {
    return props.allowMultiple
      ? [...props.modelValue, target.value]
      : target.value;
  }

  return Array.isArray(props.modelValue)
    ? props.modelValue.filter((val) => val !== target.value)
    : [];
};

const handleChange = (event: Event): void => {
  emits('update:modelValue', updateSelectedChoices(event));
  emits('change', event);
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/ChoiceList/ChoiceList.scss';
</style>
