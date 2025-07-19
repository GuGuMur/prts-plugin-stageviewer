<template>
  <n-config-provider preflight-style-disabled>
    <n-message-provider>
      <n-dialog-provider>
        <n-modal-provider>
          <n-notification-provider>
            <Interface></Interface>
          </n-notification-provider>
        </n-modal-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import {
  NDialogProvider,
  NMessageProvider,
  NModalProvider,
  NNotificationProvider,
  NConfigProvider,
} from "naive-ui";
import Interface from "./Interface.vue";
// import hljs from "highlight.js/lib/core";
// import json from "highlight.js/lib/languages/json";
// hljs.registerLanguage("json", json);
</script>

<style scoped>
</style>