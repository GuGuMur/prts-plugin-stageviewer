import config from '../ipe-plugin.json'
import { createApp } from "vue";
import Modal from "./components/Modal.vue";
import './style.css';
import 'virtual:uno.css'
import JsonViewer from "vue3-json-viewer";
import "vue3-json-viewer/dist/vue3-json-viewer.css"

mw.hook('InPageEdit.toolbox').add(({ $toolbox }) => {
    $toolbox
        .find('.btn-group.group1')
        .append(
            $('<li>', { class: 'btn-tip-group' }).append(
                $('<div>', { class: 'btn-tip', text: config.description }),
                (function () {
                    const mountNode = document.createElement("div");
                    mountNode.id = config.name;
                    mountNode.className = `ipe-toolbox-btn`;
                    mountNode.style.background = "#4d7dbaff !important";
                    createApp(Modal).use(JsonViewer).mount(mountNode);
                    return mountNode
                })()
            )
        );
    console.log("[InPageEdit] 插件 prts-stageviewer.js 加载成功")
});