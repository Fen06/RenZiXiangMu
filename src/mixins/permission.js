import permissionPoint from '@/constant/permission'
export default {
  data() {
    return {
      points: permissionPoint
    }
  },
  methods: {
    isHas(points) {
      return this.$store.state.permission.points.includes(points)
    }
  }
}
