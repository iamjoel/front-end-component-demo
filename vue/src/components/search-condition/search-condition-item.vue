<template>
  <el-col :md="{span:8}" class="sc-search-condition-item">
    <label>
      <el-row>
        <el-col :md="{span:8}" class="sc-search-condition-item__label">{{label}}</el-col>
        <el-col :md="{span:16}" class="sc-search-condition-item__input" >
          <slot></slot>
        </el-col>
      </el-row>
    </label>
  </el-col>
</template>
<script>
  export default {
    name: 'SCSearchConditionItem',
    props: {
      label: String
    }
  }
</script>
<style lang="scss">
  .sc-search-condition-item {
    flex-shrink: 0;
    margin-bottom: 10px;
    line-height: 37px;
    &__label {
      padding-right: 10px;
      text-align: right;
    }
    @media all and (max-width:992px) {
      &__label {
        text-align: left;
      }
    }
    .el-select {
      width: 100%;
    }
  }
</style>

