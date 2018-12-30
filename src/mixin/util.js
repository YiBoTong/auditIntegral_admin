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
    }
  }
}

export default util
