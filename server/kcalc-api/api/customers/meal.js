import Meal from '../../models/meal'
import moment from 'moment'
import parse from 'co-body'

export function * get () {
  const meal = yield Meal.findOne({
    _id: this.params.meal,
    user: this.params.user
  }).exec()
  this.assert(meal, 404, `Meal not found [${this.params.meal}]`)
  this.type = 'json'
  this.body = meal.toJSON()
}

export function * list () {
  let query = Meal.find({
    user: this.params.user,
    archived: false
  })
  if (this.query.where) {
    query.where(parseWhere(this))
  }
  const meals = yield query.exec()
  this.type = 'json'
  this.body = meals
}

export function * listByDate () {
  console.log(this.params.date)
  const queryDateStart = new Date(`${this.params.date}T00:00:00.000Z`)
  const queryDateEnd = new Date(`${this.params.date}T23:59:59.000Z`)
  let query = Meal.find({
    user: this.params.user,
    archived: false,
    date: {
      '$gte': queryDateStart,
      '$lt': queryDateEnd
    }
  })
  console.log(queryDateStart, queryDateEnd)
  if (this.query.where) {
    query.where(parseWhere(this))
  }
  const meals = yield query.exec()
  this.type = 'json'
  this.body = meals
}

export function * listByPeriod () {
  let queryDateStart = false
  let queryDateEnd = false
  if (this.params.period === 'week') {
    queryDateStart = moment().startOf('isoWeek').utcOffset(0, true)
    queryDateEnd = moment().endOf('isoWeeks').utcOffset(0, true)
  }
  if (this.params.period === 'month') {
    queryDateStart = moment().startOf('month').utcOffset(0, true)
    queryDateEnd = moment().endOf('month').utcOffset(0, true)
  }
  console.log(queryDateStart, queryDateEnd)
  let query = Meal.find({
    user: this.params.user,
    archived: false,
    date: {
      '$gte': queryDateStart,
      '$lte': queryDateEnd
    }
  })
  if (this.query.where) {
    query.where(parseWhere(this))
  }
  const meals = yield query.exec()
  this.type = 'json'
  this.body = meals
}

export function * create () {
  let data = yield parse(this)
  let doc = Meal.updateableFields.reduce((r, field) => {
    if (data[field] != null) r[field] = data[field]
    return r
  }, {})
  doc.user = this.params.user
  doc.date = doc.date || new Date()
  let created = yield Meal.create(doc)

  this.status = 201
  this.type = 'json'
  this.body = created.toObject()
}

export function * update () {
  let meal = yield Meal.findOne({
    _id: this.params.meal,
    user: this.params.user
  })
  this.assert(meal, 404, `Meal not found ${this.params.meal}`)

  let data = yield parse(this)
  let doc = Meal.updateableFields.reduce((r, field) => {
    if (data[field] != null) r[field] = data[field]
    return r
  }, {})
  for (let key in doc) {
    meal[key] = doc[key]
  }
  yield meal.save()
  this.body = {success: true}
}

export function * archive () {
  let meal = yield Meal.findOne({
    _id: this.params.meal,
    user: this.params.user
  })
  this.assert(meal, 404, `Meal not found [${this.params.meal}]`)

  yield meal.update({archived: true})
  this.body = {success: true}
}

function parseWhere (ctx) {
  try {
    return JSON.parse(ctx.query.where)
  } catch (err) {
    ctx.throw(400, 'Querystring `where` parameter must be a valid JSON')
  }
}
