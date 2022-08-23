<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="5"
        ><el-select v-model="currentYear" @change="updateCalendar">
          <el-option
            v-for="item in isYear"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="4">
        <el-select v-model="currentMonth" @change="updateCalendar">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentCalendar">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span v-if="isWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: '',
      isYear: [],
      currentMonth: '',
      currentCalendar: ''
    }
  },

  created() {
    this.initCaldndar()
  },

  methods: {
    initCaldndar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.isYear = Array(11)
        .fill(this.currentYear - 5)
        .map((item, i) => item + i)
      this.currentCalendar = date
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    updateCalendar() {
      this.currentCalendar = this.currentYear + '-' + this.currentMonth
      console.log(this.currentCalendar)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td {
    border: unset;
  }
  .cell-box {
    position: relative;
    right: 0;
    top: 0;
    text-align: center;
    line-height: 75px;
    span {
      position: absolute;
      top: -20px;
      right: 10px;
    }
  }
}
</style>
