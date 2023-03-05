<template lang="pug">
AlphaCard
  SettingAction
    template(#action)
      ButtonFrom(
        v-if="action",
        :action="action",
        :overrides="{ primary: !connected }",
      )
    template(#setting)
      Inline(gap="4")
        Avatar(
          v-if="connected",
          accessibilityLabel="",
          :name="accountName",
          :initials="initials",
          :source="avatarUrl",
        )
        AlphaStack(gap="2")
          slot(
            v-if="hasSlot(slots.title)",
            name="title",
          )
          template(v-else-if="title") {{ title }}
          template(v-else-if="accountName") {{ accountName }}
          Text(
            v-if="details || hasSlot(slots.details)",
            variant="bodyMd",
            color="subdued",
            as="span"
          )
            template(v-if="hasSlot(slots.details)")
              slot(name="details")
            template(v-else)
              | {{ details }}
  Box(
    v-if="termsOfService || hasSlot(slots.termsOfService)",
    padding-block-start="5",
  )
    template(v-if="hasSlot(slots.termsOfService)")
      slot(name="termsOfService")
    template(v-else)
      | {{ termsOfService }}
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { Action } from '@/utilities/type';
import { hasSlot } from '@/utilities/has-slot';
import { AlphaCard, Box, Inline, Text, AlphaStack, Avatar, ButtonFrom, StackItem, SettingAction } from '@/components';
import styles from '@/classes/AccountConnection.json';

interface AccountConnectionProps {
  /** Content to display as title */
  title?: string;
  /** Content to display as additional details */
  details?: string;
  /** Content to display as terms of service */
  termsOfService?: string;
  /** The name of the service */
  accountName?: string;
  /** URL for the user’s avatar image */
  avatarUrl?: string;
  /** Set if the account is connected */
  connected?: boolean;
  /** Action for account connection */
  action?: Action;
}

const props = withDefaults(defineProps<AccountConnectionProps>(), {
  connected: false,
  accountName: '',
});

const slots = useSlots();

const initials = computed(() => {
  return props.accountName
    ? props.accountName
      .split(/\s+/)
      .map((name) => name[0])
      .join('')
    : undefined
});
</script>
