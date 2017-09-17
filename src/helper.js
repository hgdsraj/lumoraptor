import $ from 'jquery'
$(document).ready(function () {
  let enterLoginForm = function (e) {
    if (e.keyCode === 13) {
      $('#btnLogin').click()
    }
  }
  $('#txtEmail').keypress(function (e) {
    enterLoginForm(e)
  })
  $('#txtPassword').keypress(function (e) {
    enterLoginForm(e)
  })
})
