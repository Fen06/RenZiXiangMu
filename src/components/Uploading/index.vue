<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      :file-list="fileList"
      list-type="picture-card"
      :http-request="onUploading"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :class="fileList.length ? 'hide' : ''"
      class="upload"
      :before-upload="BeforeUpload"
      :limit="1"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDKo7D6mGYdVC2lHbieOGtKcliT3RdaLwO',
  SecretKey: 'KSOmzxjKjvvjLlz2uZ2VbZLyPjqjYAZk'
})
console.log(cos)
export default {
  name: 'Uploading',
  //   id：AKIDKo7D6mGYdVC2lHbieOGtKcliT3RdaLwO
  //   key:KSOmzxjKjvvjLlz2uZ2VbZLyPjqjYAZk
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      imgUrl: '',
      loading: false
    }
  },

  created() {},

  methods: {
    onUploading({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hmhr-31-1313341666' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败，请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location
          })
        }
      )
      this.loading = false
    },
    onChange(file, fileList) {
      console.log(fileList)
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      console.log(file)
      this.dialogVisible = true
      this.imgUrl = file.url
    },
    BeforeUpload(file) {
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }

      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片不能大于2MB')
        return false
      }
    }
  }
}
</script>

<style>
.hide .el-upload--picture-card {
  display: none;
}

.upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
