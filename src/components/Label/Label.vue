<template lang="pug">
div(:class="className")
  label(
    :id="labelID(id)",
    :for="id",
    :class="labelClassName",
  )
    Text(as="span", variant="bodyMd")
      slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import { Text } from '@/components';
import styles from '@/classes/Label.json';
import { labelID } from './utils';

interface LabelProps {
  /** A unique identifier for the label */
  id: string;
  /** Visually hide the label */
  hidden?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
}

const props = defineProps<LabelProps>();

const className = computed(() => classNames(
  styles.Label,
  props.hidden && styles.hidden,
));
const labelClassName = computed(() => classNames(
  styles.Text,
  props.requiredIndicator && styles.RequiredIndicator,
));

</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Label/Label.scss';
</style>
