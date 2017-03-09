<template>
  <div class="sc-search-condition">
    <el-row :gutter="20">
      <slot></slot>
    </el-row>
    <el-row type="flex" justify="end">
      <el-button type="primary" class="right">搜索</el-button>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'SCSearchCondition',
    componentName: 'SCSearchCondition'
  }
</script>
