<template>
  <n-dialog-provider>
    <!-- <DialogContent /> -->
    <n-notification-provider>
      <n-message-provider>
        <!-- <MessageContent /> -->
        <Camera />
      </n-message-provider>
    </n-notification-provider>
  </n-dialog-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import {
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider,
  } from 'naive-ui';
  // import { MessageContent } from '@/components/MessageContent';
  // import { DialogContent } from '@/components/DialogContent';
  import Camera from "@/components/Camera.vue";

  export default defineComponent({
    name: 'Application',
    components: {
      NDialogProvider,
      NNotificationProvider,
      NMessageProvider,
      // MessageContent,
      // DialogContent,
      Camera,
    },
    setup() {
      return {};
    },
  });
</script>
