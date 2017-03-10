<template>
  <div class="sc-search-condition">
    <!-- 请求条件 -->
    <el-row type="flex" class="sc-search-condition__inputs">
      <slot></slot>
    </el-row>
    <!-- 操作 -->
    <el-row type="flex" justify="end" class="sc-search-condition__ops">
      <el-button type="primary" @click="$emit('search')" icon="search">搜索</el-button>
      <slot name="more-op"></slot>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'SCSearchCondition',
    componentName: 'SCSearchCondition'
  }
</script>
<style lang="scss">
  .sc-search-condition{
    margin-bottom: 10px;
    &__inputs{
      flex-wrap: wrap;
    }
    &__ops{
      margin-top: 10px;
      &>*{
        margin-left: 10px;
      }
    }
  }
</style>
