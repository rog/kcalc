export function echo (str) {
  return function * () {
    this.body = str
  }
}
