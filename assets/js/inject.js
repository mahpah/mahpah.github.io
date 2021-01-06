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

  var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
  nativeInputValueSetter.call(input, code);
}

inject();
