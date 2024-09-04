<template>
    <div class="header">
      <div class="prev btn" @click="changeLeft" v-if="prevable">前</div>
      <div class="menu-wrap" ref="wrapRef">
        <!-- 导航 -->
        <div class="menu-item" v-for="(item, index) in nemuList" :key="index">{{ item }}</div>
      </div>
      <div class="next btn" @click="changeRight" v-if="nextable">后</div>
      <div class="logo">
        头像等占位符
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { onMounted, ref, nextTick } from "vue"
  
  // 导航
  const nemuList = ref(Array.from({ length: 20 }, (_, index) => `测试导航${index + 1}`));
  // 上一页是否可点击
  const prevable = ref(false);
  // 下一页是否可点击
  const nextable = ref(false);
  // dom
  const wrapRef = ref();
  
  
  const changeLeft = async () => {
    if (!prevable.value) return;
    // 每次翻页一个
    const dom = wrapRef.value;
    smoothScrollTo(dom, dom.scrollLeft - 120, 300)
    setTimeout(async () => {
      await nextTick();
      init()
    }, 300);
  }
  
  const changeRight = async () => {
    if (!nextable.value) return;
    // 每次翻页一个
    const dom = wrapRef.value;
    smoothScrollTo(dom, dom.scrollLeft + 120, 300)
    setTimeout(async () => {
      await nextTick();
      init()
    }, 300);
  }
  
  const init = () => {
    const dom = wrapRef.value;
    if (!dom) return;
    if (dom.scrollWidth > dom.clientWidth + dom.scrollLeft + 80) {
      nextable.value = true;
    } else {
      nextable.value = false;
    }
    // 判断是否有上一页面
    if (dom.scrollLeft) {
      prevable.value = true;
    } else {
      prevable.value = false;
    }
  }
  
  onMounted(() => {
    init()
  })
  
  // 定义一个函数来实现平滑滚动
  const smoothScrollTo = (element: any, targetScrollLeft: any, duration: any) => {
    // 初始滚动位置
    let start = element.scrollLeft;
    let startTime: number | null = null;
  
    // 动画效果的定时器
    function scroll() {
      // 确保startTime被设置
      if (!startTime) startTime = performance.now();
  
      // 计算经过的时间
      const currentTime = performance.now();
      const timeElapsed = currentTime - startTime;
  
      // 计算当前应该滚动到的位置
      let progress = Math.min(timeElapsed / duration, 1);
  
      // 使用ease-out立方贝塞尔曲线公式
      element.scrollLeft = start + ((targetScrollLeft - start) * (1 - Math.pow(1 - progress, 3)));
  
      // 如果动画没有结束，则继续动画
      if (timeElapsed < duration) {
        requestAnimationFrame(scroll);
      }
    }
  
    // 开始滚动动画
    requestAnimationFrame(scroll);
  }
  
  </script>
  
  <style scoped lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  
  .header {
    height: 50px;
    width: 100%;
    border: 1px solid gray;
    display: flex;
  
    .btn {
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid salmon;
      border-radius: 50%;
      cursor: pointer;
  
      &:hover {
        color: white;
        background-color: blue;
      }
    }
  
    .menu-wrap {
      flex: 1;
      overflow: hidden;
      display: flex;
      transition: all 0.4s ease-in-out;
  
  
      .menu-item {
        transition: all 1s ease-in-out;
  
        width: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid greenyellow;
        flex-shrink: 0;
      }
    }
  
    .logo {
      width: 200px;
      background: orange;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
  }
  </style>
  