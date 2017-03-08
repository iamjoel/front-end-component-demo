<template>
  <div id="app">
    <el-menu theme="dark" :default-active="'2'" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-menu-item index="2"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-menu class="el-menu-vertical-demo" theme="dark">
          <el-menu-item index="2"><router-link to="/form">表单页</router-link></el-menu-item>
          <el-submenu index="1">
            <template slot="title">测试一</template>
            <el-menu-item-group title="分组一">
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3">导航三</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
