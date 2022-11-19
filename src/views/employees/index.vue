<template>
  <div class="dashboard-container">
    <div class="app-container">
        <PageTools :showBefore="true">
          <template v-slot:before>
            <span>本月：社保在缴 公积金在缴 增员 减员 入职 离职</span>
          </template>
          <template v-slot:after>
            <el-button type="primary">导入</el-button>
          </template>
        </PageTools>
    </div>
  </div>
</template>

<script>
export default {
components:{
}
}
</script>

<style>

</style>

