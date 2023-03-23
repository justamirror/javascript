let content = '';
let language = 'javascript';
let cursorPos = 0;
function appendContentAtCursor(stuff) {
  content = content.slice(0, cursorPos) + stuff + content.slice(cursorPos);
}
function escapeHtml(html){
  var text = document.createTextNode(html);
  var p = document.createElement('p');
  p.appendChild(text);
  return p.innerHTML;
}
function renderCursor() {
  let cont = content+' '
  underlay.innerHTML = escapeHtml(cont.slice(0, cursorPos)) + "<span class='selected'>"+escapeHtml(cont[cursorPos])+"</span>"+escapeHtml(cont.slice(cursorPos+1))
}
document.body.onkeydown = function (e) {
  if (e.key === 'Enter') {
    appendContentAtCursor("\r");
    cursorPos+=1;
    renderCursor()
  } else if (e.key === "ArrowRight") {
    if (cursorPos === content.length) {
      return
    }
    cursorPos += 1;
    renderCursor()

    return
  } else if (e.key === "ArrowLeft") {
    if (cursorPos === 0) {
      return
    }
    cursorPos -= 1;
    renderCursor()

    return
  } else if (e.key === "Backspace") {
    content = content.slice(0, cursorPos-1) + content.slice(cursorPos);
    cursorPos -= 1;
    renderCursor()
  } else if (e.key.length === 1) {
    appendContentAtCursor(e.key);
    cursorPos += 1;
    renderCursor()
  } else {
    return
  }
  inputContainer.innerHTML = hljs.highlight(content, { language: language, ignoreIllegals: false }).value;
}