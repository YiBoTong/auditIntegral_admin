/*
 * 表单基本验证规则
 */

let defEvent = 'blur'; // 默认触发事件
/** *********************** 常规规则 ****************************/
let baseRules = {
  // 非空验证--没有验证事件(默认的验证事件)
  requiredNoEvent: {
    required: true,
    message: '此项不能为空'
  },
  // 非空验证
  required: {
    required: true,
    message: '此项不能为空',
    trigger: defEvent
  },
  /**
   * 输入字符长度检测
   * @min number 范围最小值
   * @max number 范围最大值
   *
   * 参数：null -> 不做任何检测 inputLen()
   *      min -> 最少输入多少个字符 inputLen(2)
   *      0,max -> 最多输入多少个字符 inputLen(0,5)
   *      min,max -> 只能输入min-max个字符 inputLen(1,10)
   */
  inputLen: (min, max) => {
    // 长度检测
    return (rule, value = '', callback) => {
      let msg;
      if (value === null || value === undefined) value = '';
      if (min === 0 && max && value.length > max) {
        msg = `最多输入${max}个字符`;
      } else {
        if (max && (value.length > max || value.length < min)) {
          msg = '只能输入' + (min === max ? min : `${min}-${max}`) + '个字符';
        }
        if (value.length < min) {
          msg = `最少输入${min}个字符`;
        }
      }
      msg && callback(new Error(msg));
      callback();
    };
  },

  /**
   * 非法字符串检测
   * @reg 非法字符正则表达式 默认只能输入中文、数字、英文（不含标点符号）
   *  /[@#\$%\^&\*]+/ ----> @|#|$|%|^|&|* 都属于非法字符
   * @msg 提示信息
   */
  illegalChar: (reg = /[^\u4e00-\u9fa5\w\s，。、；‘’“”《》？——－+-、~·！\]_（）()【】：]/gm, msg = '存在非法字符！') => {
    return (rule, value = '', callback) => {
      // value && reg.test(value) && callback(new Error(msg));  //特殊字符验证2017-11-20 去掉
      callback();
    };
  },

  /**
   * 数字区间
   * @min number 最小值
   * @max number 最大值
   */
  numberSection (min = 0, max = 999999999) {
    return (rule, value = 0, callback) => {
      (value > max || value < min) && callback(new Error(`只能为${min}-${max}`));
      callback();
    };
  },
  /**
   * 必须数字
   */
  numbers: function (rule, value, callback) {
    // 检验位的检测
    if (!(/^\d+$/.test(value))) {
      callback(new Error('该项必须数字'));
    }
    callback();
  },
  /**
   * 必须数字
   */
  float: function (len = 2) {
    return (rule, value, callback) => {
      // 检验位的检测
      let reg = new RegExp('^(-|)\\d+(|\\.+\\d{1,' + len + '})$'); // 可为负数
      if (!reg.test(value)) {
        callback(new Error(`该项必须数字(最多${len}位小数)`));
      }
      callback();
    };
  }
};

export default baseRules;
