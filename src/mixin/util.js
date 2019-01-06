import { numberConvertToUppercase } from '../filters'

const util = {
  methods: {
    // 小写数字转换成大写, 只处理到[0 ~ 99]
    numberConvertToUppercase(num) {
      return numberConvertToUppercase(num)
    },
    // 首字母大写
    firstUpperCase([first, ...rest]) {
      return first.toUpperCase() + rest.join('')
    },
    // 获取头像
    getUserPic() {
      const info = this.$store.state.user.userInfo
      let imageUrl = '/static/img/at.jpg'
      if (info.portraitId && info.portraitFile.id) {
        imageUrl = '/file/' + info.portraitFile.path + info.portraitFile.fileName + '.' + info.portraitFile.suffix
      }
      return imageUrl
    }
  }
}

export default util
