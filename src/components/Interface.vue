<template>
  <n-button
    text
    @click="showModal = true"
    class="w-full h-full">
    <n-icon>
      <JsonReference />
    </n-icon>
  </n-button>
  <n-modal
    v-model:show="showModal"
    :style="{ width: '90vw !important', height: '70vh !important' }"
    preset="dialog"
    :icon="() => h(JsonReference)">
    <n-flex vertical>
      <n-flex>
        <a
          :href="PRTSMAP_url"
          target="_blank">
          <n-tag round>
            <n-text>PRTS.map</n-text>
            <template #avatar>
              <n-avatar
                src="https://map.ark-nights.com/favicon.ico" />
            </template>
          </n-tag>
        </a>
      </n-flex>
      <div class="max-h-50vh overflow-auto">
        <JsonViewer
          :value="stageJSON"
          copyable
          boxed
          theme="light" />
      </div>
    </n-flex>
  </n-modal>
</template>

<script setup>
import { ref, h, onMounted, watch } from "vue";
import {
  NButton,
  NIcon,
  NModal,
  NText,
  NDivider,
  NTag,
  NAvatar,
  NFlex,
  useMessage,
  useModal,
  useNotification,
} from "naive-ui";
import JsonViewer from "vue3-json-viewer";
import { JsonReference } from "@vicons/carbon";
import { getStageInfo } from "../utils/arktool";

const showModal = ref(false);
const message = useMessage();
const modal = useModal();
const notification = useNotification();
const stageID = ref("");
const stageName = ref(mw.config.get("wgTitle"));
const stageJSON = ref({});
const PRTSMAP_url = ref("");

watch(
  () => stageID.value,
  (newStageID) => {
    if (newStageID) {
      PRTSMAP_url.value = `https://map.ark-nights.com/map/${newStageID}`;
    }
  }
);

onMounted(async () => {
  const resp1 = await fetch(
    `/api.php?${new URLSearchParams({
      action: "ask",
      format: "json",
      query: `[[${stageName.value}]]|?关卡id`,
    })}`
  );
  const json2 = await resp1.json();
  stageID.value =
    json2?.query?.results?.[stageName.value]?.printouts?.[
      "关卡id"
    ]?.[0] || "";

  stageJSON.value = await getStageInfo(stageID.value);
});
</script>
