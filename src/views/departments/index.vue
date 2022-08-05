<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <tree-tools :isRoot="true" :treeNode="compan" />
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <!-- 树形 -->
          <!-- 作用域插槽 -->
          <!-- v-slot 获取组件内slot提供的数据 -->
          <template v-slot="{ data }">
            <tree-tools :treeNode="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils/index'
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
      compan: { name: '传值教育', manager: '负责人' }
    }
  },
  components: {
    TreeTools
  },

  created() {
    this.getDeptsApi()
  },

  methods: {
    async getDeptsApi() {
      try {
        const res = await getDeptsApi()
        console.log(res)
        this.treeData = transListToTree(res.depts, '')
      } catch (e) {
        console.log('depts', e)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
