"use server"
import db from '@/lib/db'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
const SECRET_KEY = 'SOAN-SECRET-KEY'


export async function loginActions(email: string, password: string) {
  const ret = await db`select * from users where email = ${email} and password = ${password}`
  const cookie = await cookies()
  if (ret.length > 0) {
    const token = jwt.sign({ email, name: ret[0].name, userid: ret[0].id }, SECRET_KEY, {
      expiresIn: '1h' // token 过期时间1小时
    });
    cookie.set({
      name: 'token',
      value: token,
      path: '/',
      maxAge: 3600 * 24 * 30, // cookie 里面保存 30 days
    })
    return {
      status: 200,
      body: "登录成功",
      data: ret[0]
    }
  } else {
    return {
      status: 401,
      body: "用户名或密码错误,login failed"
    }
  }
}

export async function joinUsActions(name: string, email: string, password: string) {
  const ret = await db`select * from users where email = ${email}`
  if (ret.length > 0) {
    return {
      status: 401,
      body: 'register failed'
    }
  }
  else {
    await db`insert into users (name, password, email) values (${name},${password},${email}) ON CONFLICT (email) DO NOTHING`;
    return {
      status: 200,
      body: 'register success'
    }
  }
}

export async function authAction() {
  const cookie = await cookies()
  const token = cookie.get("token")
  try {
    if (!token) {
      return {
        status: 401,
        body: "auth failed"
      }
    } else {
      const result = jwt.verify(token.value, SECRET_KEY) as JwtPayload
      return {
        status: 200,
        body: 'auth success',
        data: result
      }
    }

  } catch (error) {
    return {
      status: 401,
      body: `auth failed ${error}`
    }
  }
}

export async function logoutAction() {
  const cookie = await cookies()
  cookie.delete("token")
  return {
    status: 200,
    body: 'logout success'
  }
}