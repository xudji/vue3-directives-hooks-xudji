<template>
  <CommonCard title="今日订单量" :value="numberFormater(orderToday)">
    <div ref="lineChartRef" style="width: 100%; height: 100%"></div>
    <template #footer>
      <div>
        昨日订单销售量
        <span class="emphasis">{{ moneyFormater(orderLastDay) }}</span>
      </div>
    </template>
  </CommonCard>
</template>
  <script lang="ts" setup>
import useFormater from "@/hooks/useFormater";
const { numberFormater, moneyFormater } = useFormater();
</script>