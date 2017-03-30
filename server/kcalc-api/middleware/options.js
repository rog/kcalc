export default function optionsMiddleware () {
  return function * options (next) {
    if (this.method === 'OPTIONS') {
      this.status = 200
    } else {
      yield* next
    }
  }
}
