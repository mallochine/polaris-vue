<template lang="pug">
div(ref="containerNode")
  div(
    :class="groupClassName",
    ref="groupNode",
    :style="{width: `${width}px`}",
  )
    EventListener(event="resize", :handler="handleResize")
    div(
      :class="styles.ButtonGroupWrapper",
      ref="buttonsNode",
    )
      div
        Inline(
          v-if="(promotedActions && numberOfPromotedActionsToRender > 0) || hasActionsPopover",
          gap="3",
        )
          template(
            v-if="promotedActions && numberOfPromotedActionsToRender > 0"
            v-for="action, index in promotedActions.slice(0, numberOfPromotedActionsToRender)",
            :key="index",
          )
            BulkActionMenu(
              v-if="instanceOfMenuGroupDescriptor(action)",
              v-bind="bulkActionPropsGenerate(action)",
              :isNewBadgeInBadgeActions="isNewBadgeInBadgeActions",
            )
            BulkActionButton(
              v-else,
              :disabled="disabled",
              v-bind="action",
              @handle-measurement="handleMeasurement",
            )
          div(v-if="hasActionsPopover", ref="moreActionsNode")
            Popover(
              :active="popoverVisible",
              preferred-alignment="right",
              @close="togglePopover",
            )
              template(#activator)
                BulkActionButton(
                  disclosure,
                  :content="activatorLabel",
                  :disabled="disabled",
                  :indicator="isNewBadgeInBadgeActions",
                  :show-content-in-button="!(promotedActions && numberOfPromotedActionsToRender > 0)",
                  @action="togglePopover",
                )
              template(#content)
                ActionList(
                  :sections="combinedActions",
                  @action-any-item="togglePopover",
                )
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import { clamp } from 'polaris/polaris-react/src/utilities/clamp';
import { classNames } from '@/utilities/css';
import type { MenuGroupDescriptor } from '@/components/ActionMenu/components/MenuGroup/utils';
import { UseI18n } from '@/use';
import styles from '@/classes/BulkActions.json';
import { ActionList, Popover, ButtonGroupItem, Inline, EventListener } from '@/components';
import { BulkActionButton, BulkActionMenu } from './components';
import type { BulkAction, BulkActionListSection } from './utils';

const BUTTONS_NODE_ADDITIONAL_WIDTH = 64;

interface BulkActionsProps {
  /** List is in a selectable state */
  selectMode?: boolean;
  /** Actions that will be given more prominence */
  promotedActions?: (BulkAction | MenuGroupDescriptor)[];
  /** List of actions */
  actions?: (BulkAction | BulkActionListSection)[];
  /** Disables bulk actions */
  disabled?: boolean;
  /** If the BulkActions is currently sticky in view */
  isSticky?: boolean;
  /** The width of the BulkActions */
  width: number;
}

const props = defineProps<BulkActionsProps>();

const i18n = UseI18n();

const emits = defineEmits<{
  /** Callback when more actions button is toggled */
  (e: 'more-action-popover-toggle', isOpen: boolean): void;
}>();

const popoverVisible = ref<boolean>(false);
const containerWidth = ref<number>(0);
const measuring = ref<boolean>(true);

const containerNode = ref<HTMLElement | null>(null);
const buttonsNode = ref<HTMLElement | null>(null);
const moreActionsNode = ref<HTMLElement | null>(null);
const groupNode = ref<HTMLDivElement | null>(null);

const promotedActionsWidths = ref<number[]>([]);
const bulkActionsWidth = ref(0);
const addedMoreActionsWidthForMeasuring = ref(0);

const handleResize = debounce(
  () => {
    if (containerNode.value) {
      const tmpContainerWidth = containerNode.value.getBoundingClientRect().width;
      if (tmpContainerWidth > 0) {
        containerWidth.value = tmpContainerWidth;
      }
    }

    if (popoverVisible.value) {
      popoverVisible.value = false;
    }
  },
  50,
  {trailing: true},
);

const numberOfPromotedActionsToRender = computed<number>(() => {
  if (!props.promotedActions) {
    return 0;
  }

  const containerWidthMinusAdditionalWidth = Math.max(
    0,
    containerWidth.value - BUTTONS_NODE_ADDITIONAL_WIDTH,
  );

  if (
    containerWidthMinusAdditionalWidth >= bulkActionsWidth.value ||
    measuring
  ) {
    return props.promotedActions.length;
  }

  let sufficientSpace = false;
  let counter = props.promotedActions.length - 1;
  let totalWidth = 0;

  while (!sufficientSpace && counter >= 0) {
    totalWidth += promotedActionsWidths.value[counter];
    const widthWithRemovedAction =
      bulkActionsWidth.value -
      totalWidth +
      addedMoreActionsWidthForMeasuring.value;
    if (containerWidthMinusAdditionalWidth >= widthWithRemovedAction) {
      sufficientSpace = true;
    } else {
      counter--;
    }
  }

  return clamp(counter, 0, props.promotedActions.length);
});

const actionSectionsHandler = (): BulkActionListSection[] | undefined => {
  if (!props.actions || props.actions.length === 0) {
    return;
  }

  if (instanceOfBulkActionListSectionArray(props.actions)) {
    return props.actions as BulkActionListSection[];
  }

  if (instanceOfBulkActionArray(props.actions)) {
    return [{ items: props.actions as BulkAction[] }];
  }

  return undefined;
};

const actionSections = computed(actionSectionsHandler);

const rolledInPromotedActions = computed(() => {
  const number = numberOfPromotedActionsToRender.value;

  if (
    !props.promotedActions ||
    props.promotedActions.length === 0 ||
    number >= props.promotedActions.length
  ) {
    return [];
  }

  const rolled = props.promotedActions.map((action) => {
    if (instanceOfMenuGroupDescriptor(action)) {
      const group = action as MenuGroupDescriptor;
      return { items: [...group.actions]};
    }
    return {items: [action]};
  });

  return rolled.slice(number);
});

const isNewBadgeInBadgeActions = computed(() => {
  const actions = actionSectionsHandler();
  if (!actions) {
    return false;
  }

  for (const action of actions) {
    for (const item of action.items) {
      if (item.badge?.status === 'new') {
        return true;
      }
    }
  }

  return false;
});

const combinedActions = computed(() => {
  if (actionSections.value && rolledInPromotedActions.value.length > 0) {
    return [...rolledInPromotedActions.value, ...actionSections.value];
  }
  if (actionSections.value) {
    return actionSections.value;
  }
  if (rolledInPromotedActions.value.length > 0) {
    return rolledInPromotedActions.value;
  }
  return [];
});

const groupClassName = computed(() => classNames(
  styles.Group,
  !props.isSticky && styles['Group-not-sticky'],
  !measuring.value && props.isSticky && styles[`Group-${status}`],
  measuring.value && styles['Group-measuring'],
));

const activatorLabel = computed(() => {
  return !props.promotedActions ||
  (props.promotedActions && numberOfPromotedActionsToRender.value === 0 && !measuring.value)
    ? i18n.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel')
    : i18n.translate('Polaris.ResourceList.BulkActions.moreActionsActivatorLabel');
});

const hasActionsPopover = computed(() => actionSections.value || rolledInPromotedActions.value.length > 0 || measuring.value);

const initialRenderer = () => {
  // Set time out to make sure all the nodes was rendered
  setTimeout(() => {
    if (props.promotedActions && !props.actions && moreActionsNode.value) {
      addedMoreActionsWidthForMeasuring.value =
        moreActionsNode.value.getBoundingClientRect().width;
    }

    bulkActionsWidth.value = buttonsNode.value
      ? buttonsNode.value.getBoundingClientRect().width -
        addedMoreActionsWidthForMeasuring.value
      : 0;

    if (containerNode.value) {
      containerWidth.value = containerNode.value.getBoundingClientRect().width;
      measuring.value = false;
    }
  }, 1);
};

onMounted(() => {
  initialRenderer();
});

watch(
  () => props.selectMode,
  initialRenderer,
);

const handleMeasurement = (width: number) => {
  if (measuring.value) {
    promotedActionsWidths.value.push(width);
  }
};

const bulkActionPropsGenerate = (action: MenuGroupDescriptor | BulkAction) => {
  return action as MenuGroupDescriptor;
};

const togglePopover = () => {
  emits('more-action-popover-toggle', popoverVisible.value);
  popoverVisible.value = !popoverVisible.value;
};

// Common functions
function instanceOfBulkActionListSectionArray(
  actions: (BulkAction | BulkActionListSection)[],
) {
  const validList = actions.filter((action: any) => {
    return action.items;
  });

  return actions.length === validList.length;
}

function instanceOfBulkActionArray(
  actions: (BulkAction | BulkActionListSection)[],
) {
  const validList = actions.filter((action: any) => {
    return !action.items;
  });

  return actions.length === validList.length;
}

function instanceOfMenuGroupDescriptor(
  action: MenuGroupDescriptor | BulkAction,
) {
  return !!action['title'];
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/BulkActions/BulkActions.scss';
</style>
