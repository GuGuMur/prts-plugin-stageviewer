// const BASE_URL = "https://torappu.prts.wiki/gamedata/latest/";
const BASE_URL = "https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/refs/heads/master/zh_CN/gamedata/"

export async function readArkFile(filename) {
  const url = `${BASE_URL}${filename}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Failed to fetch ${filename}`);
  return await resp.json();
}

export async function getStageInfo(stageId) {
  let stageLocation = "";
  if (/^ro\d+_/.test(stageId)) {
    const number = stageId.match(/^ro(\d+)_/)[1];
    const file = await readArkFile("excel/roguelike_topic_table.json");
    stageLocation = file.details[`rogue_${number}`].stages[stageId].levelId;
  } else if (stageId.startsWith("mem_")) {
    const file = await readArkFile("excel/handbook_info_table.json");
    for (const v of Object.values(file.handbookStageData)) {
      if (v.stageId === stageId) {
        stageLocation = v.levelId;
        break;
      }
    }
  } else if (stageId.startsWith("tower_")) {
    const file = await readArkFile("excel/climb_tower_table.json");
    stageLocation = file.levels[stageId].levelId;
  } else if (stageId.startsWith("act42d0_")) {
    const file = await readArkFile("excel/activity_table.json");
    stageLocation = file.activity.TYPE_ACT42D0.act42d0.stageInfoData[stageId].levelId;
  } else if (stageId.startsWith("sandbox_0")) {
    const file = await readArkFile("excel/sandbox_table.json");
    stageLocation = file.sandboxActTables.act1sandbox.stageDatas[stageId].levelId;
  } else if (stageId.startsWith("sandbox_1")) {
    const file = await readArkFile("excel/sandbox_perm_table.json");
    stageLocation = file.detail.SANDBOX_V2.sandbox_1.stageData[stageId].levelId;
  } else if (stageId.startsWith("ch_")) {
    const file = await readArkFile("excel/story_review_meta_table.json");
    stageLocation = file.trainingCampData.stageData[stageId].levelId;
  } else {
    const file = await readArkFile("excel/stage_table.json");
    stageLocation = file.stages[stageId].levelId;
  }

  if (stageLocation) {
    stageLocation = stageLocation.replace(/\\/g, "/").toLowerCase();
    return await readArkFile(`levels/${stageLocation}.json`);
  } else {
    return {};
  }
}