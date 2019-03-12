
import browser from './browser.js'

document.getElementById('reset').onclick = function(el) {
  browser.runtime.reload()
}
document.getElementById('test').onclick = function(el) {
  window.open(browser.extension.getURL("test/index.html"), '_blank')
}
