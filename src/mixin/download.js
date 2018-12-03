const download = {
  methods: {
    downloadMulti(name, url) {
      var aDom = document.createElement('a')
      var evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', false, false)
      aDom.download = name
      aDom.href = '/file/' + url
      aDom.dispatchEvent(evt)
      aDom.click()
    }
  }
}

export default download
