"use client"

import { Dispatch, SetStateAction } from "react"
import { NotAccountType } from "@/types/global"
import { loginActions } from "@/actions/users"
// import Link from "next/link"

import { toast } from "sonner"

import { z } from "zod"
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
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email ." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
})

type FormData = z.infer<typeof formSchema>

export default function Login({
  setNotAccountType,
}: {
  setNotAccountType: Dispatch<SetStateAction<NotAccountType>>
}) {
  const router = useRouter()
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
      password: "",
    },
  })

  // 提交处理
  const onSubmit = async (data: FormData) => {
    console.log("表单数据：", data)

    // toast.promise<{ body: string }>(
    //   () => loginActions(data.email, data.password), //.then((res) => res.body),
    //   {
    //     loading: "Loading...",
    //     position: "top-center",
    //     style: {
    //       background: true ? "#d4edad" : "#f8d7da",
    //       color: true ? "#155724" : "#721c24",
    //     },
    //     success: (_data) => `${_data.body}!`,
    //     error: "Error",
    //   },
    // )
    // 提交到后端
    const ret = await loginActions(data.email, data.password)
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
      router.refresh()
    }
  }

  return (
    <div className="container2 my-20">
      <h1 className="text-xl mb-3 text-center font-bold">Welcome back</h1>
      <p className="text-center mb-6">
        Sign in to access an enhances shopping experience.
      </p>
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
          Sign in
        </Button>
      </form>
      <div>
        Not a member?{" "}
        <span
          className="underline text-orange-400 cursor-pointer"
          onClick={() => setNotAccountType("register")}
        >
          Join us.
        </span>
      </div>
    </div>
  )
}
