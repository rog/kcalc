/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'kcalc.components.meal.title',
    defaultMessage: 'Add Meal'
  },
  subtitle: {
    id: 'kcalc.components.meal.subtitle',
    defaultMessage: 'Add a meal, select day and calories'
  },
  inputMeal: {
    id: 'kcalc.components.meal.input.meal',
    defaultMessage: 'Meal'
  },
  inputCalories: {
    id: 'kcalc.components.meal.input.calories',
    defaultMessage: 'Calories'
  },
  selectTime: {
    id: 'kcalc.components.meal.select.time',
    defaultMessage: 'Meal time'
  },
  selectBreakfast: {
    id: 'kcalc.components.meal.select.breakfast',
    defaultMessage: 'Breakfast'
  },
  selectLunch: {
    id: 'kcalc.components.meal.select.lunch',
    defaultMessage: 'Lunch'
  },
  selectSnack: {
    id: 'kcalc.components.meal.select.snack',
    defaultMessage: 'Snack'
  },
  selectDinner: {
    id: 'kcalc.components.meal.select.dinner',
    defaultMessage: 'Dinner'
  },
  buttonAddMeal: {
    id: 'kcalc.components.meal.button.add',
    defaultMessage: 'Add meal'
  },
  invalidMeal: {
    id: 'kcalc.components.meal.form.invalid',
    defaultMessage: 'Please fill all the fields'
  },
  successMeal: {
    id: 'kcalc.components.meal.form.success',
    defaultMessage: 'Meal successfully added!'
  },
  errorMeal: {
    id: 'kcalc.components.meal.form.error',
    defaultMessage: 'Oops!, there is an error refresh and try again: {error}'
  }
})
