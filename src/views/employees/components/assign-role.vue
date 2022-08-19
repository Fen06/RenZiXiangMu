<template>
  <el-dialog
    @open="onOpen"
    @close="onClose"
    title="分配角色"
    :visible="visible"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onAssignRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserDetail } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      roles: [],
      checkList: []
    }
  },

  created() {},

  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    async getRolesApi() {
      const res = await getRolesApi()
      console.log(res.rows)
      this.roles = res.rows
    },
    onOpen() {
      this.getRolesApi()
      this.getUserDetail()
    },

    async getUserDetail() {
      const { roleIds } = await getUserDetail(this.currentId)
      this.checkList = roleIds
    },
    async onAssignRoles() {
      if (!this.checkList.length) return this.$message.error('请分配角色')
      assignRoles({
        id: this.currentId,
        roleIds: this.checkList
      })
      this.$message.success('角色分配成功')
      this.onClose()
    }
  }
}
</script>

<style scoped></style>
