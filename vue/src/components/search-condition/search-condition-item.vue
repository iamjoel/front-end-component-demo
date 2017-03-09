<template>
  <div class="sc-search-condition">
    <el-col :md="{span:6}">
      <label for="">
        {{label}}
        <slot></slot>
      </label>
    </el-col>
  </div>
</template>
<script>
  export default {
    name: 'SCSearchConditionItem',
    props: {
      label: String
    }
  }
</script>
