import jwt from 'jsonwebtoken'
import createError from 'http-errors'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? ''

export const jwtSystem = {
  signAccessToken(payload){
      return new Promise((resolve, reject) => {
          jwt.sign({ payload}, accessTokenSecret, {
            // expiresIn: "10h" // it will be expired after 10 hours
            expiresIn: "30d" // it will be expired after 20 days
            //expiresIn: 120 // it will be expired after 120ms
            // expiresIn: "20s" // it will be expired after 120s
          }, (err, token) => {
              if (err) {
              reject(createError.InternalServerError())
              }
              resolve(token)
          })
      })
  },
  verifyAccessToken(token){
      return new Promise((resolve, reject) => {
          jwt.verify(token, accessTokenSecret, (err, payload) => {
              if (err) {
                  const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
                  return reject(createError.Unauthorized(message))
              }
              resolve(payload)
          })
      })
  }
}