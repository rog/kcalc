import mongoose from 'mongoose'

const {Schema} = mongoose
const {ObjectId} = mongoose.Schema.Types

const Meal = new Schema({
  date: Date,
  time: String,
  calories: Number,
  meal: String,
  createdAt: {type: Date, default: Date.now},
  user: {type: ObjectId, ref: 'User'},
  archived: {type: Boolean, default: false},
  updatedAt: Date
})

Meal.statics.updateableFields = [
  'date',
  'calories',
  'meal',
  'time'
]

export default mongoose.model('Meal', Meal)
