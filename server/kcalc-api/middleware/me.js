export default function () {
  return function * me (next) {
    var regexp = /^\/(me)(\/|$)/

    if (regexp.test(this.path)) {
      this.path = this.path.replace(regexp, '/' + this.auth.role + '/' + this.auth.user + '$2')
    }

    yield* next
  }
}
