<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel :beforeupload="excelSuccess" :onSuccess="onSuccess">
      </upload-excel>
    </div>
  </div>
</template>

<script>
import UploadExcel from '@/components/UploadExcel'
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
import { importEmployee } from '@/api/employees'
import { formatTime } from '@/filters'
export default {
  data() {
    return {}
  },

  created() {},
  components: {
    UploadExcel
  },
  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择.xlsx格式')
        return false
      } else {
        return true
      }
    },
    onSuccess({ header, results }) {
      const NewArr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            const timestamp = item[key]
            const date = new Date((timestamp - 1) * 24 * 3600000)
            date.setFullYear(date.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(date)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      importEmployee(NewArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped></style>
