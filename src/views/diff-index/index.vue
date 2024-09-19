<script setup>
import { createPatch } from 'diff'
import { Diff2HtmlUI } from 'diff2html/lib/ui/js/diff2html-ui'
import "diff2html/bundles/css/diff2html.min.css";
import { ref, onMounted } from 'vue'

defineProps({
    msg: String,
})
const count = ref(0)

onMounted(() => {
    const obj1 = {
        "responseId": "1737028341676815839",
        "sessionId": "",
        "phone": "13552569078",
        "userName": "",
        "responseContent": "您请注意，以上资料来源于公开数据，由AI生成内容供参考。",
        "recommend": "",
        "requestContent": "结婚登记",
        "historyContent": "历史记录",
        "responseTime": "2024-09-18 19:22:07",
        "conversationId": "00a38ef2dfc6480c8d802b3e73fe4eff",
        "isComment": 0,
        "nextOptions": [
            {
                "id": "北京市朝阳区民政局-3",
                "value": "北京市朝阳区民政局",
                "level": 3
            }
        ],
        "postFix": "",
        "nodeType": "2"
    };
    const obj2 = {
        "responseId": "1737028341676815840",
        "sessionId": "",
        "phone": "13552569078",
        "userName": "",
        "responseContent": "您想了解“结婚登记”哪方面的办理内容：",
        "recommend": "",
        "requestContent": "北京市朝阳区民政局",
        "historyContent": "历史记录",
        "responseTime": "2024-09-18 19:22:08",
        "conversationId": "00a38ef2dfc6480c8d802b3e73fe4eff",
        "isComment": 0,
        "nextOptions": [
            {
                "id": "申请条件-4",
                "value": "申请条件",
                "level": 4
            },
            {
                "id": "申请材料-4",
                "value": "申请材料",
                "level": 4
            },
            {
                "id": "办理地点，时间及联系方式-4",
                "value": "办理地点，时间及联系方式",
                "level": 4
            },
            {
                "id": "办理流程-4",
                "value": "办理流程",
                "level": 4
            }
        ],
        "postFix": "\n请注意，此信息仅作参考，详细办理流程请向相关部门咨询。",
        "nodeType": "2"
    };


    // 将JSON对象转换为字符串进行比较  
    const text1 = JSON.stringify(obj1, null, 2);
    const text2 = JSON.stringify(obj2, null, 2);


    const diffString = createPatch('test2', text1, text2, 'oldHeader', 'newHeader');


    console.dir(diffString)
    const targetElement = document.getElementById('myDiffElement');
    const configuration = {
        drawFileList: false,
        fileListToggle: false,
        fileListStartVisible: false,
        fileContentToggle: false,
        matching: 'lines',
        outputFormat: 'side-by-side',
        synchronisedScroll: true,
        highlight: true,
        renderNothingWhenEmpty: false,
    };
    const diff2htmlUi = new Diff2HtmlUI(targetElement, diffString, configuration);
    diff2htmlUi.draw();
    diff2htmlUi.highlightCode();
})


</script>

<template>
    <div id="myDiffElement" v-html="count"></div>
</template>

<style scoped>
.d2h-code-side-line {
    display: none;
}
</style>
