<template>
  <el-dialog @close="onClose" title="添加部门" :visible="visible" width="40%">
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="1-50个字符"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="1-50个字符"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          placeholder="请选择负责人"
          style="width: 100%"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          v-model="formData.introduce"
          placeholder="1-300个字符"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptsApi, addDeptsApi } from '@/api/departments'
import { getPeopleApi } from '@/api/employees'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    current: {
      type: Object,
      required: true
    }
  },
  data() {
    const checkDeptName = (rule, value, callback) => {
      if (!this.current.children) return callback()
      const isTrue = this.current.children.some((item) => item.name === value)
      isTrue ? callback(new Error('部门重复')) : callback()
    }

    const checkDeptCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      const isTrue = depts.some((item) => item.code === value)
      isTrue ? callback(new Error('编码重复')) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      formRules: {
        name: [
          { required: true, target: blur },
          {
            validator: checkDeptName,
            target: blur
          }
        ],
        code: [
          { required: true, target: blur },
          {
            validator: checkDeptCode,
            target: blur
          }
        ],
        manager: [
          { required: true, message: '请输入负责人', target: 'change' }
        ],
        introduce: [{ required: true, message: '请输入内容', target: blur }]
      },
      employees: []
    }
  },

  created() {
    this.getPeopleApi()
  },

  methods: {
    async getPeopleApi() {
      const res = await getPeopleApi()
      console.log(res)
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
    },
    async onSave() {
      await this.$refs.form.validate()
      this.formData.pid = this.current.id
      try {
        await addDeptsApi(this.formData)
        this.$message.success('新增部门成功')
        this.onClose()
        this.$emit('add-success')
      } catch (e) {
        this.$message.error('新增部门失败')
      }
    }
  }
}
</script>

<style scoped></style>
