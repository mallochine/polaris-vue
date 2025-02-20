<template lang="pug">
Labelled(
  :id="id",
  :error="error",
  :action="labelAction",
  :labelHidden="labelHidden",
  :requiredIndicator="requiredIndicator",
  :label="label",
  :helpText="helpText",
)
  template(#label, v-if="hasSlot(slots.label)")
    slot(name="label")
  template(#help-text, v-if="hasSlot(slots['help-text'])")
    slot(name="help-text")
  Connected
    template(#left, v-if="slots['connected-left']")
      slot(name="connected-left")
    template(#right, v-if="slots['connected-right']")
      slot(name="connected-right")
    div(
      :class="className",
      @click="handleClick",
    )
      div(
        v-if="slots.prefix || prefix",
        :id="`${id}Prefix`",
        :class="styles.Prefix",
        ref="prefixRef",
      )
        slot(v-if="hasSlot(slots.prefix)", name="prefix")
        template(v-else) {{ prefix }}

      div(
        v-if="hasSlot(slots['vertical-content']) || verticalContent",
        :class="styles.VerticalContent",
        :id="`${id}-VerticalContent`",
        ref="verticalContentRef",
        @click="handleClickChild",
      )
        slot(v-if="hasSlot(slots['vertical-content'])", name="vertical-content")
        template(v-else) {{ verticalContent }}
        component(
          :is="multiline ? 'textarea' : 'input'",
          :id="id",
          :name="name",
          :disabled="disabled",
          :readonly="readOnly",
          :role="role",
          :autofocus="autoFocus",
          :value="modelValue",
          :placeholder="placeholder",
          :style="style",
          :autocomplete="autoComplete",
          :class="inputClassName",
          :ref="multiline ? 'textareaRef' : 'inputRef'",
          :min="min",
          :max="max",
          :step="step",
          :minlength="minLength",
          :maxlength="maxLength",
          :spellcheck="spellCheck",
          :pattern="pattern",
          :inputMode="inputMode",
          :rows="rows",
          :type="inputType",
          :aria-describedby="formattedDescribedBy",
          :aria-labelledby="formattedLabelledBy",
          :aria-invalid="Boolean(error)",
          :aria-owns="ariaOwns",
          :aria-activedescendant="ariaActiveDescendant",
          :aria-autocomplete="ariaAutocomplete",
          :aria-controls="ariaControls",
          :aria-expanded="ariaExpanded",
          :aria-required="requiredIndicator",
          v-bind="normalizeAriaMultiline",
          @input="handleChange",
          @keydown="handleKeyPress",
          @focus="handleOnFocus",
          @blur="handleOnBlur",
        )
          template(v-if="multiline") {{ modelValue }}
      component(
        v-else,
        :is="multiline ? 'textarea' : 'input'",
        :id="id",
        :name="name",
        :disabled="disabled",
        :readonly="readOnly",
        :role="role",
        :autofocus="autoFocus",
        :value="modelValue",
        :placeholder="placeholder",
        :style="style",
        :autocomplete="autoComplete",
        :class="inputClassName",
        :ref="multiline ? 'textareaRef' : 'inputRef'",
        :min="min",
        :max="max",
        :step="step",
        :minlength="minLength",
        :maxlength="maxLength",
        :spellcheck="spellCheck",
        :pattern="pattern",
        :inputMode="inputMode",
        :rows="rows",
        :type="inputType",
        :aria-describedby="formattedDescribedBy",
        :aria-labelledby="formattedLabelledBy",
        :aria-invalid="Boolean(error)",
        :aria-owns="ariaOwns",
        :aria-activedescendant="ariaActiveDescendant",
        :aria-autocomplete="ariaAutocomplete",
        :aria-controls="ariaControls",
        :aria-expanded="ariaExpanded",
        :aria-required="requiredIndicator",
        v-bind="normalizeAriaMultiline",
        @input="handleChange",
        @keydown="handleKeyPress",
        @focus="handleOnFocus",
        @blur="handleOnBlur",
      )
        template(v-if="multiline") {{ modelValue }}
      div(
        v-if="hasSlot(slots.suffix) || suffix",
        :id="`${id}Suffix`",
        :class="styles.Suffix",
        ref="suffixRef",
      )
        slot(v-if="hasSlot(slots.suffix)", name="suffix")
        template(v-else) {{ suffix }}
      div(
        v-if="showCharacterCount",
        :class="characterCountClassName",
        :aria-label=characterCountLabel,
        :aria-live="focus ? 'polite' : 'off'",
        aria-atomic="true",
        @click="handleClickChild",
      )
        p {{ characterCountText }}
      button(
        type="button",
        v-if="clearButtonVisible && clearButton",
        :class="styles.ClearButton",
        :disabled="disabled",
        @click="handleClearButtonPress(id)",
      )
        Text(as="span", variant="bodySm", visually-hidden)
          | {{ i18n.translate('Polaris.Common.clear') }}
        Icon(:source="CircleCancelMinor", color="base")
      TextFieldSpinner(
        v-if="type === 'number' && step !== 0 && !disabled && !readOnly",
        ref="spinnerRef",
        @change="handleNumberChange",
        @mousedown="handleButtonPress",
        @mouseup="handleButtonRelease",
        @click="handleClickChild",
      )
      div(:class="backdropClassName")
      Resizer(
        v-if="multiline",
        :contents="normalizedValue || placeholder",
        :currentHeight="height",
        :minimumLines="typeof multiline === 'number' ? multiline : 1",
        @height-change="handleExpandingResize",
      )
</template>

<script setup lang="ts">
import { useSlots, ref, computed, watch } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import { UseUniqueId } from '@/use';
import styles from '@/classes/TextField.json';
import CircleCancelMinor from '@icons/CircleCancelMinor.svg';
import type { Error } from '@/utilities/type';
import { UseI18n } from '@/use';
import { hasSlot } from '@/utilities/has-slot';
import { Connected, Icon, Labelled } from '@/components';
import type { LabelledProps } from '../Labelled/utils';
import { helpTextID, labelID } from '../Labelled/utils';
import { Resizer, Spinner as TextFieldSpinner } from './components';

type Type =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'time'
  | 'week'
  | 'currency';

type Alignment = 'left' | 'center' | 'right';

type InputMode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';

interface NonMutuallyExclusiveProps {
  /** Content to vertically display above the input value */
  verticalContent?: string;
  /** Text to display before value */
  prefix?: string;
  /** Text to display after value */
  suffix?: string;
  /** Hint text to display */
  placeholder?: string;
  /** Initial value for the input */
  modelValue?: string;
  /** Additional hint text to display */
  helpText?: string;
  /** Label for the input */
  label?: string;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Disable the input */
  disabled?: boolean;
  /** Show a clear text button in the input */
  clearButton?: boolean;
  /** An inline autocomplete suggestion containing the input value. The characters that complete the input value are selected for ease of deletion on input change or keypress of Backspace/Delete. The selected substring is visually highlighted with subdued styling. */
  suggestion?: string;
  /** Disable editing of the input */
  readOnly?: boolean;
  /** Automatically focus the input */
  autoFocus?: boolean;
  /** Force the focus state on the input */
  focused?: boolean;
  /** Allow for multiple lines of input */
  multiline?: boolean | number;
  /** Error to display beneath the label */
  error?: Error;
  /** Determine type of input */
  type?: Type;
  /** Name of the input */
  name?: string;
  /** ID for the input */
  id?: string;
  /** Defines a specific role attribute for the input */
  role?: string;
  /** Limit increment value for numeric and date-time inputs */
  step?: number;
  /** Enable automatic completion by the browser. Set to "off" when you do not want the browser to fill in info */
  autoComplete: string;
  /** Mimics the behavior of the native HTML attribute, limiting the maximum value */
  max?: number | string;
  /** Maximum character length for an input */
  maxLength?: number;
  /** Maximum height of the input element. Only applies when `multiline` is `true` */
  maxHeight?: number | string;
  /** Mimics the behavior of the native HTML attribute, limiting the minimum value */
  min?: number | string;
  /** Minimum character length for an input */
  minLength?: number;
  /** A regular expression to check the value against */
  pattern?: string;
  /** Choose the keyboard that should be used on mobile devices */
  inputMode?: InputMode;
  /** Indicate whether value should have spelling checked */
  spellCheck?: boolean;
  /** Indicates the id of a component owned by the input */
  ariaOwns?: string;
  /** Indicates whether or not a Popover is displayed */
  ariaExpanded?: boolean;
  /** Indicates the id of a component controlled by the input */
  ariaControls?: string;
  /** Indicates the id of a related component’s visually focused element to the input */
  ariaActiveDescendant?: string;
  /** Indicates what kind of user input completion suggestions are provided */
  ariaAutocomplete?: string;
  /** Indicates whether or not the character count should be displayed */
  showCharacterCount?: boolean;
  /** Determines the alignment of the text in the input */
  align?: Alignment;
  /** Visual required indicator, adds an asterisk to label */
  requiredIndicator?: boolean;
  /** Indicates whether or not a monospaced font should be used */
  monospaced?: boolean;
  /** Indicates whether or not the entire input/text area text should be selected on focus */
  selectTextOnFocus?: boolean;
}

const i18n = UseI18n();

const props = withDefaults(defineProps<NonMutuallyExclusiveProps>(), {
  type: 'text',
  autoComplete: 'off',
});

const emits = defineEmits<{
  (event: 'focus', focusEvent: Event): void,
  (event: 'blur', blurEvent: Event): void,
  (event: 'change', payload: Event | string): void,
  (event: 'update:modelValue', value: string): void,
  (event: 'clear-button-click', id?: string): void,
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const textAreaRef = ref<HTMLTextAreaElement| null>(null);
const prefixRef = ref<HTMLDivElement | null>(null);
const suffixRef = ref<HTMLDivElement | null>(null);
const verticalContentRef = ref<HTMLDivElement | null>(null);

const slots = useSlots();
const connectedLeftSlot = computed(() => slots['connected-left']?.());
const connectedRightSlot = computed(() => slots['connected-right']?.());
const helpTextSlot = computed(() => slots['help-text']?.());
const prefixSlot = computed(() => slots.prefix?.());
const suffixSlot = computed(() => slots.suffix?.());
const verticalContentSlot = computed(() => slots.verticalContent?.());

const height = ref<number>();
const focus = ref<boolean>();
const buttonPressTimer = ref<number>();
const spinnerRef = ref<InstanceType<typeof TextFieldSpinner> | null>(null);

watch(
  () => props.focused,
  () => {
    const input = props.multiline ? textAreaRef.value : inputRef.value;
    if (!input || props.focused === undefined) {
      return;
    }

    props.focused ? input.focus() : input.blur();
  },
);

watch(
  [
    () => focus.value,
    () => props.modelValue,
    () => props.type,
    () => props.suggestion,
  ],
  () => {
    const isSupportedInputType =
      props.type === 'text' ||
      props.type === 'tel' ||
      props.type === 'search' ||
      props.type === 'url' ||
      props.type === 'password';

    if (!inputRef.value || !isSupportedInputType || !props.suggestion) {
      return;
    }

    inputRef.value.setSelectionRange(
      (props.modelValue as string).length,
      props.suggestion.length,
    );
  },
);

const { useUniqueId } = UseUniqueId();
const id = computed(() => useUniqueId('TextField', props.id));

const inputType = computed(() => props.type === 'currency' ? 'text' : props.type);
const rows = computed(() => {
  if (!props.multiline) {
    return undefined;
  }

  return typeof props.multiline === 'number' ? props.multiline : 1;
});

const clearButtonVisible = computed(() => normalizedValue.value !== '');
const style = computed(() => props.multiline && height.value
  ? { height: `${height.value}px` }
  : {},
);
const className = computed(() => classNames(
  styles.TextField,
  Boolean(normalizedValue.value) && styles.hasValue,
  props.disabled && styles.disabled,
  props.readOnly && styles.readOnly,
  props.error && styles.error,
  props.multiline && styles.multiline,
  focus.value && styles.focus,
));
const inputClassName = computed(() => {
  const inputAlignmentStyle = props.align
    && styles[variationName('Input-align', props.align) as keyof typeof styles];

  return classNames(
    styles.Input,
    inputAlignmentStyle,
    suffixSlot.value && styles['Input-suffixed'],
    props.clearButton && styles['Input-hasClearButton'],
    props.monospaced && styles.monospaced,
  );
});
const characterCountClassName = computed(() => classNames(
  styles.CharacterCount,
  props.multiline && styles.AlignFieldBottom,
));
const backdropClassName = computed(() => classNames(
  styles.Backdrop,
  connectedLeftSlot.value &&  styles['Backdrop-connectedLeft'],
  connectedRightSlot.value && styles['Backdrop-connectedRight'],
));

const normalizedValue = computed(() => props.suggestion ? props.suggestion : props.modelValue);
const normalizedStep = computed(() => props.step ? props.step : 1);
const normalizedMax = computed(() => props.max ? props.max : Infinity);
const normalizedMin = computed(() => props.min ? props.min : -Infinity);
const normalizeAriaMultiline = computed(() => {
  if (!props.multiline) {
    return undefined;
  }

  return Boolean(props.multiline) || props.multiline > 0
    ? {'aria-multiline': true}
    : undefined;
});

const characterCount = computed(() => (normalizedValue.value as string).length);
const characterCountLabel = computed(() => {
  return props.maxLength
    ? i18n.translate('Polaris.TextField.characterCountWithMaxLength', {
      count: characterCount.value,
      limit: props.maxLength,
    })
    : i18n.translate('Polaris.TextField.characterCount', {
      count: characterCount.value,
    });
});
const characterCountText = computed(() => !props.maxLength
  ? characterCount.value
  : `${characterCount.value}/${props.maxLength}`,
);

const formattedDescribedBy = computed(() => {
  const describedBy: string[] = [];

  if (props.error) {
    describedBy.push(`${id.value}Error`);
  }

  if (helpTextSlot.value) {
    describedBy.push(helpTextID(id.value));
  }

  if (props.showCharacterCount) {
    describedBy.push(`${id.value}-CharacterCounter`);
  }

  return describedBy.length
    ? describedBy.join(' ')
    : '';
});

const formattedLabelledBy = computed(() => {
  const labelledBy: string[] = [];

  if (prefixSlot.value) {
    labelledBy.push(`${id.value}-Prefix`);
  }

  if (suffixSlot.value) {
    labelledBy.push(`${id.value}-Suffix`);
  }

  if (verticalContentSlot.value) {
    labelledBy.push(`${id.value}-VerticalContent`);
  }

  labelledBy.unshift(labelID(id.value));

  return labelledBy.join(' ');
});

const handleExpandingResize = (value: number): void => {
  height.value = value;
};

const isPrefixOrSuffix = (target: HTMLElement | EventTarget) => {
  return (
    target instanceof HTMLElement
      && ((prefixRef.value && prefixRef.value.contains(target))
        || (suffixRef.value && suffixRef.value.contains(target)))
  );
};

const handleClick = (event: Event): void => {
  const target = event.target as HTMLInputElement;

  // For TextFields used with Combobox, focus needs to be set again even
  // if the TextField is already focused to trigger the logic to open the
  // Combobox activator
  const inputRefRole = inputRef.value?.getAttribute('role');
  if (target === inputRef.value && inputRefRole === 'combobox') {
    inputRef.value?.focus();
    handleOnFocus(event as FocusEvent);
    return;
  }

  if (
    isPrefixOrSuffix(target) ||
    isVerticalContent(target) ||
    isInput(target) ||
    isSpinner(target) ||
    focus.value
  ) {
    return;
  }

  inputRef.value?.focus();
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emits('update:modelValue', target.value);
  emits('change', event);
};

const handleClickChild = (event: Event) => {
  if (event.target && !isSpinner(event.target) && !isInput(event.target)) {
    event.stopPropagation();
  }

  const target = event.target as HTMLElement;

  if (
    isPrefixOrSuffix(target) ||
    isVerticalContent(target) ||
    isInput(target) ||
    focus.value
  ) {
    return;
  }

  focus.value = true;
}

const handleNumberChange = (step: number): void => {
  // Returns the length of decimal places in a number
  const dpl = (num: number) => (num.toString().split('.')[1] || []).length;
  const numericValue = props.modelValue ? parseFloat(props.modelValue) : 0;

  if (typeof numericValue !== 'number') {
    return;
  }

  /** Making sure the new value has the same length of decimal places as the
   * step / value has.
   */
  const decimalPlaces = Math.max(dpl(numericValue), dpl(normalizedStep.value));
  const newValue = Math.min(
    Number(normalizedMax.value),
    Math.max(numericValue + step * normalizedStep.value, Number(normalizedMin.value)),
  );

  emits('change', String(newValue.toFixed(decimalPlaces)));
  emits('update:modelValue', String(newValue.toFixed(decimalPlaces)));
};

const handleButtonRelease = (): void => {
  clearTimeout(buttonPressTimer.value);
};

const handleButtonPress = (): void => {
  const minInterval = 50;
  const decrementBy = 10;
  let interval = 200;
  const onChangeInterval = () => {
    if (interval > minInterval) {
      interval -= decrementBy;
    }

    handleNumberChange(0);
    buttonPressTimer.value = window.setTimeout(
      onChangeInterval,
      interval,
    );
  };

  buttonPressTimer.value = window.setTimeout(onChangeInterval, interval);
  document.addEventListener('mouseup', handleButtonRelease, {
    once: true,
  });
};

const handleClearButtonPress = (targetId: string): void => {
  emits('update:modelValue', '');
  emits('clear-button-click', targetId);
};

const handleKeyPress = (event: KeyboardEvent): void => {
  const { key, which } = { ...event };
  const numbersSpec = /[\d.eE+-]$/;

  if (props.type !== 'number' || which !== 13 || numbersSpec.test(key)) {
    return;
  }

  event.preventDefault();
};

const handleOnFocus = (event: FocusEvent): void => {
  focus.value = true;

  if (props.selectTextOnFocus && !props.suggestion) {
    const input = props.multiline ? textAreaRef : inputRef;
    input.value?.select();
  }

  emits('focus', event);
};

const handleOnBlur = (event: Event) => {
  focus.value = false;
  emits('blur', event);
};

function isVerticalContent(target: HTMLElement | EventTarget) {
  return (
    target instanceof HTMLElement &&
    verticalContentRef.value &&
    (verticalContentRef.value.contains(target) ||
      verticalContentRef.value.contains(document.activeElement))
  );
}

function isInput(target: HTMLElement | EventTarget) {
  return (
    target instanceof HTMLElement &&
    inputRef.value &&
    (inputRef.value.contains(target) ||
      inputRef.value.contains(document.activeElement))
  );
}

function isSpinner(target: Element | EventTarget) {
  return (
    target instanceof Element &&
    spinnerRef.value &&
    spinnerRef.value.el?.contains(target)
  );
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/TextField/TextField.scss';
</style>
