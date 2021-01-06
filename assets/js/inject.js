function inject() {
  var query = new URL(window.location);
  var code = query.searchParams.get('code');
  if (!code) {
    return;
  }

  var input = document.querySelector('input[placeholder="_ _ _ _ _ _ _ _ _ _ _ _ _ _ _"]');
  if (!input) {
    return;
  }

  var nativeValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
  nativeValueSetter.call(input, code);
  input.dispatchEvent(new Event('input', {bubbles: true}));
}

inject();
