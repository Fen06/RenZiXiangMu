<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExel"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="showAdd"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="Employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                :src="row.staffPhoto"
                v-imgError="require('@/assets/common/head.jpg')"
                style="
                  width: 100px;
                  height: 100px;
                  border-radius: 50%;
                  padding: 10px;
                "
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatterFormOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <!-- prop="enableState"  -->
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onDelete(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :total="total"
            :page-size="pages.size"
            @current-change="currentChange"
            layout="prev, pager, next"
          />
        </el-row>
      </el-card>
      <add-employees
        @add-success="getEmployeesApi"
        :visible.sync="showAddEmployees"
      ></add-employees>
    </div>
  </div>
</template>

<script>
import { getEmployeesApi, delEmployee } from '@/api/employees'
import employees from '@/constant/employees'
import AddEmployees from '@/views/employees/components/add-employees.vue'
const { exportExcelMapPath, hireType } = employees
export default {
  data() {
    return {
      Employees: [],
      pages: {
        page: 1,
        size: 5
      },
      total: 0,
      showAddEmployees: false
    }
  },

  created() {
    this.getEmployeesApi()
  },
  components: {
    AddEmployees
  },

  methods: {
    formatterFormOfEmployment(row, column, cellValue, index) {
      const findItem = employees.hireType.find((item) => {
        return item.id === cellValue
      })

      return findItem ? findItem.value : '未知'
    },
    async getEmployeesApi() {
      const { rows, total } = await getEmployeesApi(this.pages)
      console.log(rows)
      this.Employees = rows
      this.total = total
    },
    currentChange(val) {
      console.log(val)
      this.pages.page = val
      this.getEmployeesApi()
    },
    async onDelete(id) {
      await this.$confirm('您确定删除该员工吗')
      await delEmployee(id)
      this.$message.success('删除成功')
      this.getEmployeesApi()
    },
    showAdd() {
      this.showAddEmployees = true
    },
    async exportExel() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeesApi({
        page: 1,
        size: this.total
      })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header,
        data,
        filename: '员工列表', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx' //非必填
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
