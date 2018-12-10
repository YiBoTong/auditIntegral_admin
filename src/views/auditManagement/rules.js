import base from '../../formRules/base'

const dictionaryType = {
  title: [base.requiredNoEvent, base.inputLen(1, 50)],
  isUse: base.requiredNoEvent,
  describe: [base.inputLen(0, 250)]
}

const dictionary = {
  key: [base.requiredNoEvent, base.inputLen(1, 20)],
  value: [base.requiredNoEvent, base.inputLen(1, 20)]
}

export {
  dictionaryType,
  dictionary
}
