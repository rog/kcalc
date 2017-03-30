import {Types} from 'mongoose'
const {ObjectId} = Types

/**
 * Int to ObjectId
 *
 * @param  {Number}   n Decimal representation of _id
 * @return {ObjectId}   MongoDb ObjectId
 */

export function oid (n) {
  return new ObjectId(id(n))
}

/**
 * Int to string with padding (24)
 *
 * @param  {Number} n Input number
 * @return {String}   32 chars string version of `n`
 */

function id (n) {
  var l = n.toString().length
  return '000000000000000000000000'.substr(l) + n
}
