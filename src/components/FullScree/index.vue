<template>
  <div style="margin: 0 8px">
    <svg-icon
      @click="onFullScreen"
      className="fullscreen"
      iconClass="fullscreen"
    ></svg-icon>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScree',
  data() {
    return {}
  },

  created() {},

  methods: {
    onFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
}
</style>
