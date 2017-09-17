import $ from 'jquery'
$(document).ready(function () {
  function enterForm (e, btn) {
    if (e.keyCode === 13) {
      $(btn).click()
    }
  }
  $('#txtEmail').keypress(function (e) {
    enterForm(e, '#btnLogin')
  })
  $('#txtPassword').keypress(function (e) {
    enterForm(e, '#btnLogin')
  })
  $('#chat-message').keypress(function (e) {
    enterForm(e, '#submit-message')
  })
})
