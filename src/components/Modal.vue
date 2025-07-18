<template>
  <div class="ipe-plugin-prts-stageviewer">
  <n-message-provider>
    <n-dialog-provider>
      <n-modal-provider>
        <n-notification-provider>
          <Interface></Interface>
        </n-notification-provider>
      </n-modal-provider>
    </n-dialog-provider>
  </n-message-provider>
  </div>
</template>

<script setup>
import {
  NDialogProvider,
  NMessageProvider,
  NModalProvider,
  NNotificationProvider,
} from "naive-ui";
import Interface from "./Interface.vue";

</script>
