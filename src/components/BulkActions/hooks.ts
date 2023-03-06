import { onBeforeUnmount, ref, watch } from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';

const DEBOUNCE_PERIOD = 250;

const PADDING_IN_SELECT_MODE = 92;

export function useIsBulkActionsSticky(selectMode: boolean) {
  const hasIOSupport =
    typeof window !== 'undefined' && Boolean(window.IntersectionObserver);

  const isBulkActionsSticky = ref(false);
  const bulkActionsAbsoluteOffset = ref(0);
  const bulkActionsMaxWidth = ref(0);
  const bulkActionsOffsetLeft = ref(0);
  const bulkActionsIntersectionRef = ref<HTMLDivElement | null>(null);
  const tableMeasurerRef = ref<HTMLDivElement | null>(null);

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      isBulkActionsSticky.value = !entry.isIntersecting;
    });
  };

  const options = {
    root: null,
    rootMargin: '-12px',
    threshold: 0,
  };

  const observerRef = ref<IntersectionObserver | null>(
    hasIOSupport ? new IntersectionObserver(handleIntersect, options) : null,
  );

  const computeTableDimensions = () => {
    const node = tableMeasurerRef.value;
    if (!node) {
      return {
        maxWidth: 0,
        offsetHeight: 0,
        offsetLeft: 0,
      };
    }
    const box = node.getBoundingClientRect();
    const paddingHeight = selectMode ? PADDING_IN_SELECT_MODE : 0;
    const offsetHeight = box.height - paddingHeight;
    const maxWidth = box.width;
    const offsetLeft = box.left;

    bulkActionsAbsoluteOffset.value = offsetHeight;
    bulkActionsMaxWidth.value = maxWidth;
    bulkActionsOffsetLeft.value = offsetLeft;
  };

  const debouncedComputeTableHeight = debounce(
    computeTableDimensions,
    DEBOUNCE_PERIOD,
    {
      trailing: true,
    },
  );

  watch(
    () => selectMode,
    () => {
      computeTableDimensions();
      window.removeEventListener('resize', debouncedComputeTableHeight);
      window.addEventListener('resize', debouncedComputeTableHeight);
    },
  );

  onBeforeUnmount(() => {
    window.removeEventListener('resize', debouncedComputeTableHeight);
    observerRef.value?.disconnect();
  });

  watch(
    () => bulkActionsIntersectionRef.value,
    () => {
      const observer = observerRef.value;
      if (!observer) {
        return;
      }

      const node = bulkActionsIntersectionRef.value;

      if (node) {
        observer.observe(node);
      }
    },
  );

  return {
    bulkActionsIntersectionRef,
    tableMeasurerRef,
    isBulkActionsSticky,
    bulkActionsAbsoluteOffset,
    bulkActionsMaxWidth,
    bulkActionsOffsetLeft,
    computeTableDimensions,
  };
}
