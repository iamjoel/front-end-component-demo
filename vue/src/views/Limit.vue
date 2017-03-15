<template>
<div class="main">
  <el-tree
    show-checkbox
    :data="limit"
    :props="defaultProps"
    :default-expand-all="true"
    :default-checked-keys="checkedIds"
    node-key="id"
    ref="limit"
  ></el-tree>
  <el-button type="primiary" @click="save">保存</el-button>
</div>
</template>

<script>
import Vue from 'vue'

const ALL_LIMIT_NAME = ['查看', '新增', '编辑', '删除']
const ALL_LIMIT = ALL_LIMIT_NAME.map(function (limit, i) {
  return {
    name: limit,
    value: Math.pow(2, i)
  }
})
export default {
  data () {
    return {
      limit: [{
        name: '模块1',
        children: [{
          name: '页面1',
          children: [
            {
              id: 'prop1', // 功能点id 其他没有id
              name: '功能点1',
              children: [{
                id: 'prop1-1',
                name: '新增'
              }, {
                id: 'prop1-2',
                name: '编辑'
              }]
            }
          ]
        }]
      }],
      checkedIds: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted () {
    // var data = [{
    //   name: '模块1',
    //   children: [{
    //     name: '页面1',
    //     children: [
    //       {
    //         id: 'prop1', // 功能点id 其他没有id
    //         name: '功能点1',
    //         children: [{
    //           id: 'prop1-1',
    //           name: '新增'
    //         }, {
    //           id: 'prop1-2',
    //           name: '编辑'
    //         }]
    //       }
    //     ]
    //   }]
    // }]
    var vm = this
    this.fetchLimitData().then(data => {
      data.all.forEach(module => {
        module.children.forEach(page => {
          page.children.forEach(prop => {
            prop.children = vm.parseLimitData(prop.value, prop.id, data.selected)
            var checkedIds = prop.children.filter(item => {
              return item.isChecked
            }).map(item => {
              return item.id
            })
            vm.checkedIds.push(...checkedIds)
          })
        })
      })
      Vue.set(vm, 'limit', data.all)
      // debugger
    })
  },
  methods: {
    fetchLimitData () {
      return new Promise(function (resolve, reject) {
        resolve({
          all: [{
            name: '客户管理',
            children: [{
              name: '公司',
              children: [
                {
                  id: 'company1',
                  name: '公司列表',
                  value: 15// 有哪些权限
                },
                {
                  id: 'company2',
                  name: '其他功能',
                  value: 5
                }
              ]
            }, {
              name: '员工',
              children: [
                {
                  id: 'customr1',
                  name: '员工列表',
                  value: 15// 有哪些权限
                },
                {
                  id: 'customr2',
                  name: '其他功能',
                  value: 7
                }
              ]
            }]
          }],
          selected: [{
            id: 'company1',
            value: 15
          },
          {
            id: 'company2',
            value: 4
          },
          {
            id: 'customr1',
            value: 8
          }]
        })
      })
    },
    save () {
      var limitTree = this.$refs.limit
      // console.log(limitTree.getCheckedKeys(), limitTree.getCheckedNodes())
      console.log(this.formatLimitData(limitTree.getCheckedKeys()))
    },
    /*
    * 将每个功能的数据转化成树形控件需要数据格式
    * propId: 功能点id。增删改查这些功能，都归属于某个功能点。
    */
    parseLimitData (limitTotal, propId, checkedInfo) {
      var showLimit = ALL_LIMIT.map(function (item) {
        if (!(item.value & limitTotal)) {
          return false
        }
        // 保证id的唯一性
        var limitId = [propId, item.value].join('-')
        var checkedProp = checkedInfo.filter(item => {
          return item.id === propId
        })[0]
        var checkedLimitTotal = 0
        if (checkedProp) {
          checkedLimitTotal = checkedProp.value
        }

        return {
          id: limitId,
          name: item.name,
          isChecked: !!(item.value & checkedLimitTotal)
        }
      }).filter(item => {
        return item
      })
      return showLimit
    },
    // 格式
    // ['prop1', 'prop-2', 'prop-3']
    // 保存的数据格式是
    /*
    [{
      id: 'prop1',
      value: 5
    }, ...]
    */
    formatLimitData (checkedKeys) {
      var resObj = {}
      checkedKeys.filter(key => {
        return key.indexOf('-') > -1
      }).forEach(key => {
        var info = key.split('-')
        var propId = info[0]
        if (!resObj[propId]) {
          resObj[propId] = 0
        }
        resObj[propId] += parseInt(info[1], 10)
      })

      var res = []
      for (var key in resObj) {
        if (resObj.hasOwnProperty(key)) {
          res.push({
            id: key,
            value: resObj[key]
          })
        }
      }

      return res
    },
    parse () {

    }
  }
}
</script>

<style>
  /*实现子节点在一行显示*/
  .el-tree-node__children .el-tree-node__children .el-tree-node{
    float: left;
  }
  .el-tree-node__children .el-tree-node {
    float: none;
  }
</style>
