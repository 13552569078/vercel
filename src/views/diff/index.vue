<script setup>
import { createPatch } from 'diff'
import { Diff2HtmlUI } from 'diff2html/lib/ui/js/diff2html-ui'
import 'diff2html/bundles/css/diff2html.min.css'
import { parse, html } from 'diff2html'
import { ref, onMounted } from 'vue'

defineProps({
    msg: String
})
const count = ref(0)

onMounted(() => {
    const obj1 = { a: 1, b: 2, c: { d: 3 } }
    const obj2 = { a: 1, b: 3, c: { d: 4 } }

    // 将JSON对象转换为字符串进行比较
    const text1 = JSON.stringify(obj1, null, 2)
    const text2 = JSON.stringify(obj2, null, 2)

    const diffString = createPatch('', text1, text2, '', '')

    console.dir(diffString)

    /**
     * 1. 通过diff2html-ui生成html
     */

    const targetElement = document.getElementById('myDiffElement')
    const configuration = {
        drawFileList: false,
        fileListToggle: false,
        fileListStartVisible: false,
        fileContentToggle: false,
        matching: 'lines',
        outputFormat: 'side-by-side',
        synchronisedScroll: true,
        highlight: true,
        renderNothingWhenEmpty: false
    }
    const diff2htmlUi = new Diff2HtmlUI(targetElement, diffString, configuration)
    diff2htmlUi.draw()
    diff2htmlUi.highlightCode()

    /**
     * 2. 通过diff2html的parse,html生成html
     */

    const diffJson = parse(diffString)
    const x = html(diffJson, {
        drawFileList: false,
        fileListToggle: false,
        fileListStartVisible: false,
        fileContentToggle: false,
        matching: 'lines',
        outputFormat: 'side-by-side',
        synchronisedScroll: true,
        highlight: true,
        renderNothingWhenEmpty: false
    })
    count.value = x
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
