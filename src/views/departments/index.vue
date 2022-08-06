<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <!-- 头部 -->
        <tree-tools :isRoot="true" :treeNode="compan" @add="showDepts" />
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <!-- 树形 -->
          <!-- 作用域插槽 -->
          <!-- v-slot 获取组件内slot提供的数据 -->
          <template v-slot="{ data }">
            <tree-tools
              :treeNode="data"
              @remove="getDeptsApi"
              @add="showDepts"
              @edit="showEdit"
            />
            <!-- "dialogVisible = true" -->
          </template>
        </el-tree>
      </el-card>
      <add-dept
        ref="AddDept"
        @add-success="getDeptsApi"
        :visible.sync="dialogVisible"
        :current="current"
      />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils/index'
import AddDept from './components/add-dept.vue'
export default {
  data() {
    return {
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      defaultProps: {
        label: 'name'
      },
      compan: { name: '传值教育', manager: '负责人' },
      dialogVisible: false,
      current: {},
      loading: false
    }
  },
  components: {
    TreeTools,
    AddDept
  },

  created() {
    this.getDeptsApi()
  },

  methods: {
    async getDeptsApi() {
      try {
        this.loading = true
        const res = await getDeptsApi()
        console.log(res)
        this.treeData = transListToTree(res.depts, '')
        this.loading = false
      } catch (e) {
        console.log('depts', e)
      }
    },
    showDepts(val) {
      this.dialogVisible = true
      this.current = val
    },
    showEdit(val) {
      this.dialogVisible = true
      this.$refs.AddDept.getDeptById(val.id)
    }
  }
}
</script>

<style scoped lang="less"></style>
