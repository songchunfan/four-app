"use client"

import { Dispatch, SetStateAction } from "react"
import { NotAccountType } from "@/types/global"
import { toast } from "sonner"

import * as z from "zod"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldError,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { joinUsActions } from "@/actions/users"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email ." }),
  name: z.string(),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters" })
    .min(6, { message: "Password must be at least 6 characters" }),
})

type FormData = z.infer<typeof formSchema>

export default function Register({
  setNotAccountType,
}: {
  setNotAccountType: Dispatch<SetStateAction<NotAccountType>>
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  })

  // 提交处理
  const onSubmit = async (data: FormData) => {
    // console.log("表单数据：", data)
    // 提交到后端
    const ret = await joinUsActions(data.name, data.email, data.password)
    // setNotAccountType("hasAccount");
    let v
    if (ret.status === 200) {
      v = toast.success
    } else {
      v = toast.error
    }
    v(ret.body, {
      position: "top-center",
      style: {
        background: ret.status === 200 ? "#d4edad" : "#f8d7da",
        color: ret.status === 200 ? "#155724" : "#721c24",
      },
    })
    if (ret.status === 200) {
      setNotAccountType("login")
    }
  }

  return (
    <div className="container2 my-20">
      <h1 className="text-xl mb-3 text-center font-bold">Become a member</h1>
      <p className="text-center mb-6">Create your SOFN store member profile.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldDescription>输入您的邮箱</FieldDescription>
              <Input
                id="street"
                type="email"
                placeholder="please input email"
                {...register("email")}
              />

              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <FieldDescription>输入您的名称</FieldDescription>
              <Input
                id="name"
                placeholder="please enter your name"
                {...register("name")}
              />

              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password: </FieldLabel>
              <FieldDescription>输入您的密码</FieldDescription>
              <Input
                id="pwd"
                type="password"
                placeholder="please input your password"
                {...register("password")}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>
        <Button type="submit" className="w-full my-4">
          Register
        </Button>
      </form>
      <div className="center">
        Already a member??{" "}
        <span
          className="underline text-orange-400 cursor-pointer"
          onClick={() => setNotAccountType("login")}
        >
          Sign in.
        </span>
      </div>
    </div>
  )
}
