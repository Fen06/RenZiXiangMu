<template>
  <div class="Radar" ref="main"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.inRadar()
  },
  methods: {
    inRadar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main)
      // 绘制图表
      myChart.setOption({
        backgroundColor: '#7799fb',
        title: {
          text: '人员绩效表'
        },
        legend: {
          data: ['张三', '李四']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '加班', max: 100 },
            { name: 'bug数量', max: 100 },
            { name: '迟到', max: 100 },
            { name: '早退', max: 100 },
            { name: '打游戏', max: 100 },
            { name: '摸鱼', max: 100 }
          ],
          axisName: {
            color: '#fff'
          }
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',

            data: [
              {
                value: [80, 50, 60, 100, 100, 100],
                name: '张三'
              },
              {
                value: [80, 30, 58, 98, 12, 85],
                name: '李四'
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.Radar {
  width: 700px;
  height: 500px;
}
</style>
