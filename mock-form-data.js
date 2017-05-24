export default class MockFormData {
  append(key, value) {
    this[key] = value;
  }
}