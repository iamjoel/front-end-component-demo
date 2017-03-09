<template>
<div class="main">
  <sc-search-condition>
    <sc-search-condition-item
    label="名称">
      <el-input v-model="value" placeholder="请输入内容"></el-input>
    </sc-search-condition-item>
    <sc-search-condition-item
    label="名称">
      <el-input v-model="value" placeholder="请输入内容"></el-input>
    </sc-search-condition-item>
    <sc-search-condition-item
    label="名称">
      <el-input v-model="value" placeholder="请输入内容"></el-input>
    </sc-search-condition-item>
    <sc-search-condition-item
    label="名称">
      <el-input v-model="value" placeholder="请输入内容"></el-input>
    </sc-search-condition-item>
    <sc-search-condition-item
    label="名称">
      <el-input v-model="value" placeholder="请输入内容"></el-input>
    </sc-search-condition-item>
  </sc-search-condition>
  <el-row :gutter="20">
    <el-col :md="{span:6}">
      <label for="">
        xxx
        <el-input v-model="value" placeholder="请输入内容"></el-input>
      </label>
    </el-col>
    <el-col :span="6"><div class="grid-content">
      <label for="">
        好吃的<br>
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </label>
    </div></el-col>
    <el-col :span="6"><div class="grid-content"></div></el-col>
    <el-col :span="6"><div class="grid-content"></div></el-col>
  </el-row>
  <el-row type="flex" justify="end">
    <el-button type="primary" @click="search" class="right">搜索</el-button>
  </el-row>
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
        <el-button @click="view(scope.row.id)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    {{pager.current}}
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pager.current"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="pager.total"
        class="right">
      </el-pagination>
    }
  </div>
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
      this.fectch().then(function ({total, data}) {
        this.pager.current = 1
        // this.pager.current = Math.floor(Math.random() * 10)
        this.pager.total = total
        // debugger
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
    this.search()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block{
  display: flex;
  justify-content: flex-end;
}
</style>
