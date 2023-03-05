<template lang="pug">
Box(
  v-if="hasMultipleSections",
  as="li",
  role="presentation",
  :border-block-start="!isFirst ? 'divider' : undefined",
  :padding-block-start="!section.title ? '2' : undefined",
)
  SectionMarkup(
    v-bind="sectionMarkupProps",
    @action-any-item="emit('action-any-item')",
  )
    template(v-for="{prefixId} in section.items" #[`prefix-${prefixId}`])
      slot(:name="`prefix-${prefixId}`")
    template(v-for="{suffixId} in section.items" #[`suffix-${suffixId}`])
      slot(:name="`suffix-${suffixId}`")
SectionMarkup(
  v-else,
  v-bind="sectionMarkupProps",
  @action-any-item="emit('action-any-item')",
)
  template(v-for="{prefixId} in section.items" #[`prefix-${prefixId}`])
    slot(:name="`prefix-${prefixId}`")
  template(v-for="{suffixId} in section.items" #[`suffix-${suffixId}`])
    slot(:name="`suffix-${suffixId}`")
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import SectionMarkup from './SectionMarkup.vue';
import type { ActionListSection } from '../../utils';

interface SectionProps {
  /** Section of action items */
  section: ActionListSection;
  /** Should there be multiple sections */
  hasMultipleSections: boolean;
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'option' | 'menuitem' | string;
  /** Whether it is the first in a group of sections */
  isFirst?: boolean;
}

const props = defineProps<SectionProps>();

const emit = defineEmits<{ (event: 'action-any-item'): void }>();

const sectionMarkupProps = computed(() => {
  const { section, hasMultipleSections, actionRole } = props;
  return {
    section,
    hasMultipleSections,
    actionRole,
  };
});
</script>
