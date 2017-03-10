<template>
<div class="main">
  <sc-search-condition @search="search">
    <sc-search-condition-item
    label="名称">
      <el-input v-model="searchConditions.name" placeholder="请输入内容"></el-input>
    </sc-search-condition-item>
    <sc-search-condition-item
    label="类型">
      <el-select v-model="searchConditions.type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </sc-search-condition-item>
    <sc-search-condition-item
    label="时间">
      <el-col :span="11">
        <el-date-picker v-model="searchConditions.date" type="date" placeholder="选择日期" style="width: 100%;" format="yyyy/MM/DD"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2" style="text-align: center;">-</el-col>
      <el-col :span="11">
        <el-time-picker v-model="searchConditions.time" type="fixed-time" placeholder="选择时间" style="width: 100%;"></el-time-picker>
      </el-col>
    </sc-search-condition-item>
    <sc-search-condition-item
    label="喜好">
      <el-checkbox-group v-model="searchConditions.hobby">
        <el-checkbox label="喜好1" name="type"></el-checkbox>
        <el-checkbox label="喜好2" name="type"></el-checkbox>
      </el-checkbox-group>
    </sc-search-condition-item>
    <sc-search-condition-item
    label="性别">
      <el-radio class="radio" v-model="searchConditions.gender" label="1">男</el-radio>
      <el-radio class="radio" v-model="searchConditions.gender" label="2">女</el-radio>
    </sc-search-condition-item>
    <div slot="more-op">
      <el-button type="success" icon="plus">新增</el-button>
      <el-button type="success">其他</el-button>
    </div>
  </sc-search-condition>
  <el-table
    :data="tableData"
    border
    stripe
    style="width: 100%"
    @sort-change="sortChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      type="index"
      label="序列"
      align="center"
      width="80">
    </el-table-column>
    <el-table-column
      label="id"
      prop="id"
      width="180" sortable="'custom'">
      <template scope="scope">
        <el-button @dblclick.native="edit(scope.row)" type="text" size="small" v-show="!scope.row.isEdit">HTML内容测试：{{scope.row.id}} 双击编辑</el-button>
        <input type="text" v-model="editContent" v-show="scope.row.isEdit" @blur="scope.row.isEdit=false" @keyup.enter="update(scope.row, editContent)">
      </template>
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址" width="250">
    </el-table-column>
    <el-table-column
      label="地址" width="250">
      <template scope="scope">
        {{scope.row.address}}
      </template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址" width="250">
    </el-table-column>
    <el-table-column
      label="地址" width="250">
      <template scope="scope">
        {{scope.row.address}}
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="180"
      fixed="right">
      <template scope="scope">
        <el-button type="primary" icon="view" size="small" @click="view(scope.row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row type="flex" justify="end">
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pager.current"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="pager.total"
        class="right">
      </el-pagination>
  </el-row>
</div>
</template>

<script>
import Vue from 'vue'
import SCSearchCondition from '@/components/search-condition/search-condition'
import SCSearchConditionItem from '@/components/search-condition/search-condition-item'
console.log(SCSearchCondition)
export default {
  components: {
    'sc-search-condition': SCSearchCondition,
    'sc-search-condition-item': SCSearchConditionItem
  },
  data () {
    return {
      searchConditions: {
        name: '',
        type: '',
        date: null, // 这边赋值有问题。。。 2017/03/22
        time: new Date(), // 这样赋值，为了不报错。
        hobby: [],
        gender: '1'
      },
      tableData: [],
      pager: {
        current: 5,
        total: 105
      },
      editContent: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      value2: ''
    }
  },
  methods: {
    handleCurrentChange (currentPage) {
      this.pager.current = currentPage // 必须同步，否则改页码不同步
      this.pager.total += 10
    },
    fectch () {
      console.log(JSON.stringify(this.searchConditions))
      // debugger
      var randomNum = (function () {
        return Math.floor(Math.random() * 10)
      })()
      var data = []
      for (var i = 0; i < randomNum; i++) {
        data.push({
          id: Math.floor(Math.random() * 10000),
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          isEdit: false
        })
      }
      var vm = this
      return new Promise(function (resolve, reject) {
        resolve({
          total: vm.pager.total + 10,
          data
        })
      })
    },
    search () {
      this.fectch(this.searchConditions).then(function ({total, data}) {
        this.pager.current = 1
        this.pager.total = total
        this.tableData = data
      }.bind(this))
    },
    view (id) {
      console.log(`view ${id}`)
    },
    sortChange ({ column, prop, order }) {
      console.log({ column, prop, order })
    },
    edit (row) {
      this.editContent = row.id
      row.isEdit = true
    },
    update (row, content) {
      console.log(`update ${row.id}: ${content}`)
      Vue.set(row, 'isEdit', false)
    },
    formatter (row) {
      return row.address
    }
  },
  mounted () {
    this.searchConditions.date = '2017/5/3'
    this.searchConditions.time = new Date('2017/3/4 04:34:44')
    this.search()
  }
}
</script>

<style scoped>

</style>
