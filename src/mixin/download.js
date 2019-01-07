const download = {
  methods: {
    downloadMulti(name, url, prefix = '/file/') {
      var aDom = document.createElement('a')
      var evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', false, false)
      aDom.download = name
      aDom.href = prefix + url
      aDom.dispatchEvent(evt)
      aDom.click()
    }
  }
}

export default download
