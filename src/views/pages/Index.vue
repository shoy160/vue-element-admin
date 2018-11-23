<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="搜索关键字" style="width: 300px" value="" />
      <el-select v-model="query.status" clearable placeholder="状态">
        <el-option :value="0" label="未支付" />
        <el-option :value="1" label="已支付" />
      </el-select>
      <el-button type="primary" icon="el-icon-search">{{ $t('table.search') }}</el-button>
    </div>
    <div class="app-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="apple">apple</el-checkbox>
        <el-checkbox label="banana">banana</el-checkbox>
        <el-checkbox label="orange">orange</el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="name" label="fruitName" width="180"/>
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template slot-scope="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { homedata } from '@/api/home'
const defaultFormThead = ['apple', 'banana', 'orange']
export default {
  name: 'Home',
  data() {
    return {
      query: {
        status: ''
      },
      tableData: [],
      formTheadOptions: ['apple', 'banana', 'orange'],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead // 默认表头 Default header
    }
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
      // this.key = this.key + 1// 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  },
  mounted() {
    homedata().then(json => {
      this.tableData = json
    })
  }
}
// 文档地址 http://element-cn.eleme.io/#/zh-CN/component/installation
</script>
