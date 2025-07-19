import { createApp } from "vue";
import Modal from "./components/Modal.vue";
import 'virtual:uno.css'

(function () {
    const navText = document.querySelector(
        '#mw-content-text > div.mw-parser-output > div.pathnav2.nomobile.navigation-not-searchable > div.pathnav2-center.navigation-not-searchable > a'
    )?.textContent?.trim();
    if (navText !== '关卡一览') {
        console.log('[prts-stageviewer]: 当前页面无{{pathnav2|关卡一览}}模板，插件不执行');
        return;
    }
    const pageName = mw.config.get('wgTitle');
    $('#firstHeading > span.mw-page-title-main').each(function () {
        this.style.setProperty("display", "inline-flex", "important");
        const mountNode = document.createElement("div");
        this.append(mountNode);
        createApp(Modal).use().mount(mountNode);
        console.log(`[prts-stageviewer]: 为主页面 ${pageName} 创建JSON查询入口成功！`);
    });
    console.log("插件 prts-stageviewer 加载成功");
})()
