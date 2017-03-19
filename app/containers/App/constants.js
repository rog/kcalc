/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'kcalc/Component' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const ACTION_CONSTANT = 'kcalc/Container/ACTION_CONSTANT';
 */

export const LOG_IN_SUCCESS = 'kcalc/App/LOG_IN_SUCCESS'
export const LOG_IN_ERROR = 'kcalc/App/LOG_IN_ERROR'
export const SIGN_UP_SUCCESS = 'kcalc/App/SIGN_UP_SUCCESS'
export const DEFAULT_LOCALE = 'en'
