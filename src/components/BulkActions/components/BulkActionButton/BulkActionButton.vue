<template lang="pug">
div(:class="styles.BulkActionButton", ref="bulkActionButton")
  Button(
    :external="external",
    :url="url",
    :accessibilityLabel="disclosure && !showContentInButton ? content : accessibilityLabel",
    :disclosure="disclosure && showContentInButton",
    :disabled="disabled",
    size="slim",
    :icon="disclosure && !showContentInButton ? HorizontalDotsMinor : undefined",
    @click="emits('action')",
  )
    | {{ buttonContent }}
  Indicator(v-if="indicator")
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Button, Indicator, Icon } from '@/components';
import HorizontalDotsMinor from '@icons/HorizontalDotsMinor.svg';
import styles from '@/classes/BulkActions.json';

interface BulkActionButtonProps {
  disclosure?: boolean;
  indicator?: boolean;
  url?: string;
  external?: boolean;
  content?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
  showContentInButton?: boolean;
}

const props = defineProps<BulkActionButtonProps>();

const emits = defineEmits<{
  (e: 'handle-measurement', width: number): void;
  (e: 'action'): void;
}>();

const bulkActionButton = ref<HTMLDivElement | null>(null);

const buttonContent = computed(() => {
  return props.disclosure && !props.showContentInButton ? undefined : props.content;
});

onMounted(() => {
  if (bulkActionButton.value) {
    const width = bulkActionButton.value.getBoundingClientRect().width;
    emits('handle-measurement', width);
  }
})
</script>

