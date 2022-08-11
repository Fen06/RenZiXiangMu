<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="Add">新增角色</el-button>
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column prop="address" label="操作">
              <template>
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      </el-tabs>
      <!-- 分页 -->
      <el-pagination
        layout="sizes,prev, pager, next"
        :total="total"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
    <!-- 对话框 -->
    <el-dialog
      @close="onClose"
      title="编辑角色"
      :visible.sync="AddDialogVisible"
      width="40%"
    >
      <el-form
        ref="form"
        :model="AddRolesForm"
        :rules="addRolesFormRule"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="AddRolesForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="AddRolesForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddrole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, getAddRolesApi } from '@/api/role'
export default {
  data() {
    return {
      AddRolesForm: {
        name: '',
        description: ''
      },
      addRolesFormRule: {
        name: [{ required: true, message: '请输入名称', target: blur }]
      },
      AddDialogVisible: false,
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 3,
      page: 1
    }
  },

  created() {
    this.getRolesApi()
  },

  methods: {
    Add() {
      this.AddDialogVisible = true
    },
    async getRolesApi() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize
      })
      console.log(rows)
      this.tableData = rows
      this.total = total
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRolesApi()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getRolesApi()
    },
    async onAddrole() {
      this.$refs.form.validate()
      const res = await getAddRolesApi(this.AddRolesForm)
      console.log(res)
      this.$message.success('新增成功')
      this.AddDialogVisible = false
      this.getRolesApi()
    },
    onClose() {
      this.$refs.form.resetFields()
      this.AddRolesForm.description = ''
    }
  }
}
</script>

<style scoped lang="less"></style>
