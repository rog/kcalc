import bcrypt from 'bcryptjs'

export function hash (data) {
  return bcrypt.hashSync(data, 10)
  // return new Promise((resolve, reject) => {
  //   bcrypt.hash(data, 10, function (err, hash) {
  //     if (err) return reject(err)
  //     resolve(hash)
  //   })
  // })
}

export function compare (str, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(str, hash, function (err, result) {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
