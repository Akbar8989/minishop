import jwt from 'jsonwebtoken'

export const sign = (payload) => {
  return jwt.sign(payload, 'SECRET')
}

export const verify = (token) => {
  return jwt.verify(token, 'SECRET')
}