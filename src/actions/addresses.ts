"use server"
import db from '@/lib/db'
import { Address } from "@/types/global"
import { revalidatePath } from 'next/cache'

export async function addAddressAction(name: string, city: string, address: string, phone: string, userId: string) {
  await db`insert into addresses (name,city,address,phone,userid) values(${name}, ${city},${address}, ${phone}, ${userId})`;
  revalidatePath('/account')
  return {
    status: 200,
    body: "add address success"
  }
}

export async function addressAction(userid: string) {
  const result = await db`select * from addresses where userid=${userid}` as Address[]

  return {
    status: 200,
    body: 'address success',
    data: result
  }
}

export async function removeAddressAction(id: number) {
  const result = await db`delete from addresses where id=${id}`
  revalidatePath('/account')
  return {
    status: 200,
    body: 'delete success'
  }
}
