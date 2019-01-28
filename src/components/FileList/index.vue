<!--
****--@date     2019-01-23 10:13
****--@author   XXL
****--@describe 文件列表
-->
<template>
  <div class="file-container">
    <div v-for="value in fileListData" :key="value.id" class="single-file-container" @click="showFile(value)" @contextmenu.prevent="selectOperation(value,$event)">
      <div class="single-file">
        <img :src="fileIcon" alt="">
        <span>{{ value.title }}</span>
      </div>
    </div>
    <ul
      v-show="visible"
      :style="{left:left+'px',top:top+'px'}"
      class="contextmenu">
      <li @click="changeFileName">重命名</li>
      <li @click="deleteFile">删除文件</li>
      <li @click="showFile(null)">文件详情</li>
    </ul>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'FileFileList',
  components: {},
  props: {
    fileListData: {
      type: Array,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      fileIcon: require('./fileIcon.svg'),
      visible: false,
      left: '',
      top: '',
      fileData: '',
      bgColor: 'transparent'
    }
  },
  // computed: {},
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeSelect)
      } else {
        document.body.removeEventListener('click', this.closeSelect)
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    // 初始化
    init() {
    },
    // 查看文件
    showFile(value) {
      if (value) {
        this.$emit('showFile', value)
      } else {
        const data = this.fileData
        this.$emit('showFile', data)
      }
    },
    // 选择单个文件及操作出现的位置
    selectOperation(value, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right
      if (left > maxLeft) {
        this.left = maxLeft + 250
      } else {
        this.left = left + 250
      }
      this.top = e.clientY - 100
      this.visible = true
      this.fileData = value
      // this.bgColor = 'rgba(102,102,102,0.1)'
    },
    // 重命名
    changeFileName() {
      const data = this.fileData
      this.$emit('changeFileName', data)
    },
    // 删除文件
    deleteFile() {
      const data = this.fileData
      this.$emit('deleteFile', data)
    },
    // 关闭选择操作
    closeSelect() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .file-container{
    display: flex;
    flex-wrap: wrap;
    .single-file-container{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 130px;
      background-color: transparent;
      border-radius: 5px;
      cursor: pointer;
      margin: 2px 2px 2px 0;
    }
    .single-file-container:hover{
      background-color: rgba(102,102,102,0.1);
    }

    .single-file{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      span{
        width: 100%;
        text-align: center;
        margin-top: 10px;
      }
      img{
        width: 60px;
        height: 60px;
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 100;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>
