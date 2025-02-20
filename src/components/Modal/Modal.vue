<template lang="pug">
div
  div(v-if="slots.activator", ref="activatorNode")
    slot(name="activator")
  Portal(v-if="domReady && open", idPrefix="modal")
    Dialog(
      :instant="instant",
      :labelled-by="headerId",
      :large="large",
      :small="small",
      :limit-height="limitHeight",
      :full-screen="fullScreen",
      @close="emit('close')",
      @entered="handleEntered",
      @exited="handleExited",
      @closing="setClosing",
    )
      Header(
        :title-hidden="titleHidden",
        :id="headerId",
        key="header",
        :closing="closing",
        @close="emit('close')",
      )
        slot(name="title")
      div(:class="styles.BodyWrapper", key="body")
        iframe(
          v-if="src",
          :name="iFrameName",
          title="body markup",
          :src="src",
          :class="styles.IFrame",
          @load="handleIframeLoad",
          :style="{ height: `${iframeHeight}px` }",
        )
        div(
          v-else-if="noScroll",
          :class="styles.Body",
        )
          div(
            v-if="loading",
            :class="styles.Spinner",
          )
            Spinner
          template(v-else)
            Section(v-if="sectioned")
              slot(name="content")
            slot(v-else, name="content")
        Scrollable(
          v-else,
          :shadow="true",
          :class="styles.Body",
          @scrolled-to-bottom="emit('scrolled-to-bottom')",
        )
          div(
            v-if="loading",
            :class="styles.Spinner",
          )
            Spinner
          template(v-else)
            Section(v-if="sectioned")
              slot(name="content", :title-hidden="titleHidden")
            slot(v-else, name="content")
      Footer(
        v-if="slots.footer || primaryAction || secondaryActions",
        :primaryAction="primaryAction",
        :secondaryActions="secondaryActions",
        key="footer",
      )
        slot(name="footer")
    Backdrop(
      @closing="setClosing",
      @click="clickOutsideToClose ? emit('close') : null",
    )
</template>

<script setup lang="ts">
import { onMounted, ref, useSlots, provide } from 'vue';
import type { ComplexAction } from '@/utilities/interface';
import { UseUniqueId } from '@/use';
import { focusFirstFocusableNode } from '@/utilities/focus';
import styles from '@/classes/Modal.json';
import {
  Dialog, Header, Section, Footer,
} from './components';
import { Portal, Spinner, Backdrop, Scrollable } from '@/components';

const IFRAME_LOADING_HEIGHT = 200;
const DEFAULT_IFRAME_CONTENT_HEIGHT = 400;

interface Props {
  /** Whether the modal is open or not */
  open: boolean;
  /** The url that will be loaded as the content of the modal */
  src?: string;
  /** The name of the modal content iframe */
  iFrameName?: string;
  /**
   * Hide the title in the modal
   * @default false
   */
  titleHidden?: boolean;
  /** The content to display inside modal */
  /** Disable animations and open modal instantly */
  instant?: boolean;
  /** Automatically adds sections to modal */
  sectioned?: boolean;
  /** Increases the modal width */
  large?: boolean;
  /** Decreases the modal width */
  small?: boolean;
  /** Limits modal height on large sceens with scrolling */
  limitHeight?: boolean;
  /** Replaces modal content with a spinner while a background action is being performed */
  loading?: boolean;
  /** Removes Scrollable container from the modal content */
  noScroll?: boolean;
  /** Sets modal to the height of the viewport on small screens */
  fullScreen?: boolean;
  /** Primary action */
  primaryAction?: ComplexAction;
  /** Collection of secondary actions */
  secondaryActions?: ComplexAction[];
  /** Click or tap the area outside to close the modal */
  clickOutsideToClose?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  titleHidden: false,
});

const emit = defineEmits<{
  (event: 'iframe-load', source: Event ): void;
  (event: 'transition-end'): void
  (event: 'scrolled-to-bottom'): void
  (event: 'close'): void
}>();

const slots = useSlots();

const activatorNode = ref<HTMLElement | null>(null);

const { useUniqueId } = UseUniqueId();

const headerId = useUniqueId('modal-header');

const iframeHeight = ref<number>(IFRAME_LOADING_HEIGHT);

const domReady = ref<boolean>(false);
const closing = ref(false);

const handleIframeLoad = (evt: Event) => {
  const iframe = evt.target as HTMLIFrameElement;
  if (iframe && iframe.contentWindow) {
    try {
      iframeHeight.value = iframe.contentWindow.document.body.scrollHeight;
    } catch (_error) {
      iframeHeight.value = DEFAULT_IFRAME_CONTENT_HEIGHT;
    }
  }

  emit('iframe-load', evt);
}

const handleEntered = () => {
  emit('transition-end');
}

const handleExited = () => {
  iframeHeight.value = IFRAME_LOADING_HEIGHT;
  const node = activatorNode.value;
  if (node) {
    requestAnimationFrame(() => focusFirstFocusableNode(node));
  }
};

const setClosing = (v: boolean) => {
  closing.value = v;
};

onMounted(() => {
  domReady.value = true;
});

provide('WithinContentContext', true);
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Modal/Modal.scss';
</style>
