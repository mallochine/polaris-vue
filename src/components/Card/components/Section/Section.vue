<template lang="pug">
div(:class="className")
  div(
    v-if="title || hasSlot(slots.title) || actions",
    :class="styles.SectionHeader",
  )
    Stack(v-if="actions", noItemWrap, alignment="baseline")
      StackItem(fill)
        slot(
          v-if="!isTextOnlyTitle",
          name="title",
        )
        Text(v-else, variant="headingSm", as="h3")
          slot(v-if="hasSlot(slots.title)", name="title")
          template(v-else) {{ title }}
      ButtonGroup
        ButtonFrom(
          v-for="action, index in actions",
          :key="index",
          :index="index",
          :action="action",
          :overrides="{ plain: true }",
        )
    template(v-else)
      slot(v-if="!isTextOnlyTitle", name="title")
      Text(v-else, variant="headingSm", as="h3")
        slot(v-if="hasSlot(slots.title)", name="title")
        template(v-else) {{ title }}
  slot
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { classNames } from '@/utilities/css';
import type { ComplexAction } from '@/utilities/interface';
import {
  ButtonGroup,
  ButtonFrom,
  Stack,
  StackItem,
  Text,
} from '@/components';
import { hasSlot } from '@/utilities/has-slot';
import styles from '@/classes/Card.json';

interface CardSectionProps {
  title?: string;
  subdued?: boolean;
  flush?: boolean;
  fullWidth?: boolean;
  /** Allow the card to be hidden when printing */
  hideOnPrint?: boolean;
  actions?: ComplexAction[];
}

const props = defineProps<CardSectionProps>();

const slots = useSlots();

const className = computed(() => {
  return classNames(
    styles.Section,
    props.flush && styles['Section-flush'],
    props.subdued && styles['Section-subdued'],
    props.fullWidth && styles['Section-fullWidth'],
    props.hideOnPrint && styles['Section-hideOnPrint'],
  );
});

const isTextOnlyTitle = computed(() => {
  if (slots.title && slots.title().length === 1) {
    if (slots.title()[0]?.type.toString() === 'Symbol(Text)' || slots.title()[0]?.type.toString() === 'Symbol()') {
      return true;
    } else {
      return slots.title()[0].children
        && slots.title()[0].children?.length === 1
        && (slots.title()[0].children?.[0].type.toString() === 'Symbol(Text)'
        || slots.title()[0].children?.[0].type.toString() === 'Symbol()');
    }
  }

  return true;
});
</script>
