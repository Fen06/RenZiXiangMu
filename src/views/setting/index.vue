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
                <el-button
                  size="small"
                  type="success"
                  @click="onSetRightsDialog"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
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
        </el-tab-pane>

        <!-- 公司信息------------- -->
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="CompanyInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="CompanyInfo.companyAddress"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="CompanyInfo.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="CompanyInfo.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
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
    <!-- 分配角色对话框 -->
    <el-dialog
      title="给用户分配角色"
      :visible.sync="SetRightsDialog"
      width="50%"
    >
      <el-tree
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="DefaultCheckedKeys"
        :data="permissions"
        :props="{ label: 'name' }"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SetRightsDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色对话框 -->
  </div>
</template>

<script>
import { getRolesApi, getAddRolesApi } from '@/api/role'
import { getCompanyInfoApi } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils'
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
      page: 1,
      CompanyInfo: {},
      SetRightsDialog: false,
      permissions: [],
      DefaultCheckedKeys: ['1', '1063315016368918528']
    }
  },

  created() {
    this.getRolesApi()
    this.getCompanyInfoApi()
    this.getPermissions()
  },

  methods: {
    onSetRightsDialog() {
      this.SetRightsDialog = true
    },
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
    },
    async getCompanyInfoApi() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userinfo.companyId
      )
      console.log(res)
      this.CompanyInfo = res
    },
    async getPermissions() {
      const res = await getPermissionList()
      console.log(res)
      const treePermission = transListToTree(res, '0')
      console.log(treePermission)
      this.permissions = treePermission
    }
  }
}
</script>

<style scoped lang="less"></style>
