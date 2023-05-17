<template>
  <ul>
    <li v-for="(item, index) in result.list" :key="index">{{ item }}</li>
  </ul>
  <p>
    <button @click="prePage">上一页</button>
    <span>当前页：{{ searchParams.pageIndex }}</span>
    <button @click="nextPage">下一页</button>
    <select v-model="searchParams.pageSize">
      <option :value="10">10</option>
      <option :value="20">20</option>
      <option :value="30">30</option>
      <option :value="40">40</option>
    </select>
  </p>
  <Teleport to="body">
    <div v-if="result.loading" class="modal">
      <p>加载中...</p>
    </div>
  </Teleport>
</template>
<script setup>
import { reactive } from "vue";
import useList from "../../hooks/useList";
const axios = (params) =>
  new Promise((resolve, reject) => {
    let pageIndex = params.pageIndex;
    let pageSize = params.pageSize;
    setTimeout(() => {
      let arr = new Array(pageSize).fill(0).map((item, index) => {
        return (pageIndex - 1) * pageSize + index + 1;
      });
      resolve(arr);
    }, 2000);
  });

let searchParams = reactive({
  pageSize: 10,
  pageIndex: 1,
});

let { result } = useList(axios, searchParams);

const prePage = () => {
  if (searchParams.pageIndex > 1) {
    searchParams.pageIndex -= 1;
  }
};
const nextPage = () => {
  searchParams.pageIndex += 1;
};
</script>
