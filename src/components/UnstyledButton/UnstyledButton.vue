<template lang="pug">
a(v-if="url && disabled", v-bind="commonProps")
  slot
UnstyledLink(
  v-else-if="url && !disabled",
  v-bind="interactiveProps",
  :url="url",
  :external="external",
  :download="download",
  v-on="linkListeners",
)
  slot
button(
  v-else,
  v-bind="commonProps",
  :role="role",
  :type="submit ? 'submit' : 'button'",
  :disabled="disabled",
  :aria-busy="loading ? true : undefined",
  :aria-controls="ariaControls",
  :aria-expanded="ariaExpanded",
  :aria-describedby="ariaDescribedBy",
  :aria-checked="ariaChecked",
  :aria-pressed="pressed",
  @click="handleClick",
  v-on="buttonListeners",
)
  slot
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { UnstyledLink } from '@/components/UnstyledLink';
import { useDisableClick } from '@/utilities/use-disable-interaction';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import { capitalize } from '@/utilities/capitalize';

interface Props {
  id?: string;
  url?: string;
  external?: boolean;
  download?: string | boolean;
  submit?: boolean;
  disabled?: boolean;
  loading?: boolean;
  pressed?: boolean;
  accessibilityLabel?: string;
  role?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaDescribedBy?: string;
  ariaChecked?: boolean;
  others?: Record<string, unknown>;
}

const props = defineProps<Props>();

const attrs = useAttrs();

const getEventList = (events: string[]) => {
  const eventBindings: Record<string, any> = { mouseup: handleMouseUpByBlurring };

  for (const event of events) {
    const eventName = `on${capitalize(event)}`;
    if (attrs[eventName]) {
      eventBindings[event] = attrs[eventName];
    }
  }

  return eventBindings;
}

const buttonListeners = getEventList(
  ['blur', 'focus', 'keydown', 'keypress', 'keyup', 'mouseover', 'touchstart'],
);

const handleClick = computed(() => useDisableClick(props.disabled, attrs.onClick as any))

const linkListeners = getEventList(['blur', 'click', 'focus', 'mouseover', 'touchstart']);

const commonProps = computed(() => ({
  id: props.id,
  class: attrs.class,
  'aria-label': props.accessibilityLabel,
}));

const interactiveProps = computed(() => ({
  ...commonProps.value,
  ...props.others,
  role: props.role,
}));
</script>
