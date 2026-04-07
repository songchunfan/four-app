"use client"
import Login from "./Login"
import Register from "./Register"
import { useState } from "react"

import { NotAccountType } from "@/types/global"

export default function NotAccount() {
  const [notAccountType, setNotAccountType] = useState<NotAccountType>("login")
  return (
    <>
      {notAccountType === "login" ? (
        <Login setNotAccountType={setNotAccountType} />
      ) : (
        <Register setNotAccountType={setNotAccountType} />
      )}
    </>
  )
}
