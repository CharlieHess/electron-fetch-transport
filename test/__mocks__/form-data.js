module.exports = class FormData {
  append(key, value) {
    this[key] = value;
  }
}
