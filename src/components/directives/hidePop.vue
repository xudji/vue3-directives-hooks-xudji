<template>
  <button @click.stop="showModal">点击显示弹窗(点击其他区域关闭)</button>
  <div class="modal dialog" v-hidePop="{ fn: cancleModal }" v-if="isShowModal">
    我是弹框
    <button @click.stop="cancleModal">关闭</button>
  </div>
</template>


<script setup>
import { ref } from "vue";
let isShowModal = ref(false);
const showModal = () => {
  isShowModal.value = true;
};
const cancleModal = () => {
  console.log("cancleModal");
  isShowModal.value = false;
};
</script>
<style >
.dialog {
  width: 100%;
  height: 400px;
  background-color: red;
}
</style>
