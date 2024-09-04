<template>
  <div class="main-wrap">
    <div class="form">
      <el-form ref="ruleFormRef" :model="formInline" class="demo-form-inline" :rules="rules">
        <el-form-item label="图片链接" prop="imgurl">
          <el-input v-model="formInline.imgurl" placeholder="图片链接" :clearable="true" type="textarea"
            :autosize="{ minRows: 4, maxRows: 10 }" />
        </el-form-item>
        <el-form-item label="绘制区域" prop="bbox">
          <el-input v-model="formInline.bbox" placeholder="绘制区域bbox格式为[159,973,415,995]" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">绘制</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <img v-if="showImage" :src="formInline.imgurl" class="image" @load="handleImageLoad" ref="imageRef" />
      <canvas v-if="bbox.length === 4" ref="canvasRef" class="canvas"
        style="width: 100%;height: 100%;position: absolute;left: 0;top: 0;z-index: 100;"></canvas>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  imgurl: string
  bbox: string
}

const bbox = computed(() => {
  return formInline.bbox ? JSON.parse(formInline.bbox ) : []
})

const formInline = reactive({
  imgurl: 'http://8.130.16.234/minioapi/cestc-xingzhi-bucket/default/zzp/knowledge_base/file_paging_segment/KBbfd347a66a9d46609fec6ae1f696731f/5ffb5a8177744d70a390fe4c1ffaa44f/%E7%99%BB%E6%9C%BA%E6%9C%8D%E5%8A%A1%E5%AE%A4%E9%97%AE%E8%AE%AF%E5%91%98%E5%B2%97%E4%BD%8D%E6%89%8B%E5%86%8C%E8%AE%AD%E7%BB%83%E7%94%A8.pdf-13.png',
  bbox: "[200,200,900,900]"
})
const ruleFormRef = ref<FormInstance>();
const canvasRef = ref<HTMLCanvasElement>();
const imageRef = ref<HTMLImageElement>();

const showImage = ref(false);

const rules = reactive<FormRules<RuleForm>>({
  imgurl: [{ required: true, message: '不允许为空', trigger: 'blur' }],
  bbox: [{ required: true, message: '不允许为空', trigger: 'blur' }]
})

const onSubmit = async () => {
  await ruleFormRef.value!.validate()
  showImage.value = false;
  await nextTick();
  showImage.value = true;
}

const handleImageLoad = async () => {
  await nextTick();
  // 没有则返回绘制
  if (!canvasRef.value || !imageRef.value) return;
  const { naturalWidth } = imageRef.value;
  //   真实宽高
  const { width } = imageRef.value.getBoundingClientRect();
  const scaleRate = width / naturalWidth;
  // 根据 左上角 右下角 计算出几个角坐标
  if (bbox?.value.length === 0) return;
  const text_region = [
    [bbox.value![0], bbox.value![1]],
    [bbox.value![2], bbox.value![1]],
    [bbox.value![2], bbox.value![3]],
    [bbox.value![0], bbox.value![3]],
  ];
  // 获取图片的缩放比例
  handleDrawline(text_region as number[][], scaleRate);
}

const handleDrawline = (points: number[][], scaleRate: number) => {
  if (canvasRef.value && imageRef.value) {
    const canvas = canvasRef.value;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    //  真实宽高
    const { width, height } = imageRef.value.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    // 绘制多边形
    ctx.beginPath();
    ctx.moveTo(points[0][0] * scaleRate, points[0][1] * scaleRate);
    points.forEach((point) => {
      ctx.lineTo(point[0] * scaleRate, point[1] * scaleRate);
    });
    ctx.closePath();
    // 填充多边形为黄色
    ctx.fillStyle = "rgba(76, 192, 158, 0.15)";
    ctx.fill();
  }
};

</script>

<style scoped lang="scss">
.main-wrap {
  display: flex;
  padding: 20px;
  height: 100vh;

  .form {
    width: 400px;
    margin-right: 20px;
  }

  .content {
    flex: 1;
    border: 1px solid #aaaaaa;
    position: relative;
    overflow: auto;

    .image {
      width: 100%;
      z-index: 8;
    }
  }
}
</style>
