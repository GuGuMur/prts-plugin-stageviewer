<template>
  <n-button
    secondary
    @click="showModal = true"
    strong
    type="info">
    <template #icon>
      <n-icon>
        <JsonReference />
      </n-icon>
    </template>
    <n-text>点击打开关卡JSON</n-text>
  </n-button>
  <n-modal
    v-model:show="showModal"
    :style="{ width: '90vw !important', height: '70vh !important' }"
    preset="card">
    <template #header>
      <n-flex>
        <n-icon>
          <JsonReference />
        </n-icon>
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
        <a
          v-if="stageName && stageName.includes('ISW')"
          :href="`https://tomimi.dev/zh/stages/${stageName.replace(/ /g, '_')}`"
          target="_blank">
          <n-tag round>
            <n-text>Tomimi.dev</n-text>
            <template #avatar>
              <n-avatar
                src="https://tomimi.dev/_app/immutable/assets/favicon.e511bc87.webp" />
            </template>
          </n-tag>
        </a>
      </n-flex>
    </template>
    <n-scrollbar
      style="max-height: 50vh"
      trigger="none">
      <JsonEditorVue
        v-model="stageJSON"
        :mainMenuBar="false"
        :readOnly="false"
        style="height: auto; overflow: auto" />
    </n-scrollbar>
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
  NScrollbar,
  useMessage,
  useModal,
  useNotification,
} from "naive-ui";
// import JsonViewer from "vue3-json-viewer";
import JsonEditorVue from "json-editor-vue";
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
