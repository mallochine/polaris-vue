<template lang="pug">
PositionedOverlay(
  :id="id",
  :fullWidth="fullWidth",
  :active="active",
  :activator="activator",
  :classNames="className",
  :preferInputActivator="preferInputActivator",
  :fixed="fixed",
  :preferredPosition="preferredPosition",
  :preferredAlignment="preferredAlignment",
  :zIndexOverride="zIndexOverride",
  @scroll-out="handleScrollOut",
  @change-content-styles="changeContentStyles",
)
  div(:class="styles.FocusTracker", tabIndex="0", @focus="handleFocusFirstItem")
  div(:class="styles.Wrapper")
    div(
      :id="id",
      :tabIndex="autofocusTarget === 'none' ? undefined : -1",
      :style="contentStyles",
      :class="contentClassNames",
      ref="contentRef",
    )
      slot(name="extra-content")
      Pane(
        :sectioned="sectioned",
        :fixed="fixed",
        :capture-overscroll="captureOverscroll",
        @scrolled-to-bottom="$emit('scrolled-to-bottom')",
      )
        slot(
          name="overlay",
        )
  div(:class="styles.FocusTracker", tabIndex="0", @focus="handleFocusLastItem")
  EventListener(event="click", :handler="handleClick")
  EventListener(event="touchstart", :handler="handleClick")
  KeypressListener(:keyCode="Key.Escape", :handler="handleEscape")
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { classNames } from '@/utilities/css';
import { motion } from '@shopify/polaris-tokens';
import { findFirstKeyboardFocusableNode } from '@/utilities/focus';
import { PositionedOverlay } from '@/components/PositionedOverlay';
import { EventListener } from '@/components/EventListener';
import { KeypressListener } from '@/components/KeypressListener';
import { Key } from '@/components/KeypressListener/utils';
import styles from '@/classes/Popover.json';
import type { PositionedOverlayProps } from '@/components/PositionedOverlay/utils';
import { PopoverCloseSource, nodeContainsDescendant, TransitionStatus } from '../../utils';
import type { PopoverAutofocusTarget } from '../../utils';
import { Pane } from '../Pane';

export interface PopoverOverlayProps {
  fullWidth?: boolean;
  fullHeight?: boolean;
  fluidContent?: boolean;
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
  active: boolean;
  id: string;
  zIndexOverride?: number;
  activator: HTMLElement;
  preferInputActivator?: PositionedOverlayProps['preferInputActivator'];
  sectioned?: boolean;
  fixed?: boolean;
  hideOnPrint?: boolean;
  autofocusTarget?: PopoverAutofocusTarget;
  preventCloseOnChildOverlayClick?: boolean;
  captureOverscroll?: boolean;
}

const props = withDefaults(defineProps<PopoverOverlayProps>(), {
  preferredPosition: 'below',
  preferredAlignment: 'center',
  preferInputActivator: true,
  autofocusTarget: 'container',
  zIndexOverride: undefined,
});

const emit = defineEmits<{ (event: 'close', source: PopoverCloseSource): void; (event: 'scrolled-to-bottom'): void }>();

const transitionStatus = ref<TransitionStatus>(TransitionStatus.Exited);
const contentRef = ref<HTMLElement | null>(null);
const enteringTimer = ref<number | null>(null);
const exitingTimer = ref<number | null>(null);
const contentStyles = ref<any>({});

const changeTransitionStatus = (status: TransitionStatus) => {
  transitionStatus.value = status;
  // Forcing a reflow to enable the animation
  if (contentRef.value) {contentRef.value.getBoundingClientRect();}
};

const clearTransitionTimeout = () => {
  if (enteringTimer.value) {
    window.clearTimeout(enteringTimer.value);
  }

  if (exitingTimer.value) {
    window.clearTimeout(exitingTimer.value);
  }
};

watch(
  () => props.active,
  () => {
    const beforeStatus = props.active ? TransitionStatus.Entering : TransitionStatus.Exiting;
    const afterStatus = props.active ? TransitionStatus.Entered : TransitionStatus.Exited;

    changeTransitionStatus(beforeStatus);
    clearTransitionTimeout();
    const timer = window.setTimeout(() => {
      transitionStatus.value = afterStatus;
    }, parseInt(motion['duration-100'], 10));

    if (props.active) {
      enteringTimer.value = timer;
    } else {
      exitingTimer.value = timer;
    }
  },
);

const className = computed(() =>
  classNames(
    styles.PopoverOverlay,
    transitionStatus.value === TransitionStatus.Entering && styles['PopoverOverlay-entering'],
    transitionStatus.value === TransitionStatus.Entered && styles['PopoverOverlay-open'],
    transitionStatus.value === TransitionStatus.Exiting && styles['PopoverOverlay-exiting'],
  ),
);

const contentClassNames = computed(() =>
  classNames(
    styles.Content,
    props.fullHeight && styles['Content-fullHeight'],
    props.fluidContent && styles['Content-fluidContent'],
  ),
);

const handleScrollOut = () => {
  emit('close', PopoverCloseSource.ScrollOut);
};

const handleEscape = (event: Event) => {
  const target = event.target as HTMLElement;

  const composedPath = event.composedPath();
  const wasDescendant = wasContentNodeDescendant(composedPath, contentRef.value as HTMLElement);
  const isActivatorDescendant = nodeContainsDescendant(props.activator, target);

  if (wasDescendant || isActivatorDescendant) {
    emit('close', PopoverCloseSource.EscapeKeypress);
  }
};

const handleClick = (event: Event) => {
  const target = event.target as HTMLElement;
  const composedPath = event.composedPath();

  const currentContainer = document.getElementById('PolarisPortalsContainer') as HTMLDivElement;

  const wasDescendant = props.preventCloseOnChildOverlayClick
    ? currentContainer && wasPolarisPortalDescendant(composedPath, currentContainer)
    : contentRef.value && wasContentNodeDescendant(composedPath, contentRef.value);

  const isActivatorDescendant = nodeContainsDescendant(props.activator, target);

  if (
    wasDescendant
    || isActivatorDescendant
    || transitionStatus.value !== TransitionStatus.Entered
  ) {
    return;
  }

  emit('close', PopoverCloseSource.Click);
};

const handleFocusFirstItem = () => {
  emit('close', PopoverCloseSource.FocusOut);
};

const handleFocusLastItem = () => {
  emit('close', PopoverCloseSource.FocusOut);
};

const changeContentStyles = (value: Record<string, unknown>) => {
  contentStyles.value = { desiredHeight: `${value.height}px` };
};

const focusContent = () => {
  if (props.autofocusTarget === 'none' || !contentRef.value) {
    return;
  }

  requestAnimationFrame(() => {
    if (contentRef.value) {
      const focusableChild = findFirstKeyboardFocusableNode(contentRef.value);

      if (focusableChild && props.autofocusTarget === 'first-node') {
        focusableChild.focus();
      } else {
        contentRef.value.focus();
      }
    }
  });
};

onMounted(() => {
  if (props.active) {
    focusContent();
    changeTransitionStatus(TransitionStatus.Entered);
  }
});

onBeforeUnmount(() => {
  clearTransitionTimeout();
});

function wasContentNodeDescendant(
  composedPath: readonly EventTarget[],
  contentNode: HTMLElement,
) {
  return (
    contentNode != null && composedPath.includes(contentNode)
  );
}

function wasPolarisPortalDescendant(
  composedPath: readonly EventTarget[],
  portalsContainerElement: HTMLDivElement,
): boolean {
  return composedPath.some(
    (eventTarget) =>
      eventTarget instanceof Node &&
      portalsContainerElement?.contains(eventTarget),
  );
}
</script>
