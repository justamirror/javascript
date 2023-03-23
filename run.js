let output = [];
window.addEventListener('message', function (e) {
  if (e.origin !== 'null') return;
  if (e.data.type === 'log') {
    output.push(...e.data.things)
    return
  }
  error.innerText = '';
  result.innerText = '';
  if (e.result) {
    result.innerText = e.result;
  }
  if (e.error) {
    error.innerText = e.error.toString()
  }
})
function run(code, args) {
  output = []
  return jsFrame.contentWindow.postMessage({
    code: code,
    args: args
  }, '*')
}