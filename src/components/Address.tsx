"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

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

import { addAddressAction, removeAddressAction } from "@/actions/addresses"
import { JwtPayload } from "jsonwebtoken"

import { Address as AddressType } from "@/types/global"

const formSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty." }),
  city: z.string().min(1, { message: "City cannot be empty." }),
  address: z.string().min(1, { message: "Address cannot be empty." }),
  phone: z.string().min(1, { message: "Phone cannot be empty." }),
})

type FormData = z.infer<typeof formSchema>

export default function Address({
  authData,
  addressesData,
}: {
  authData: JwtPayload
  addressesData: AddressType[]
}) {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      city: "",
      address: "",
      phone: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    const { name, city, address, phone } = data
    const ret = await addAddressAction(
      name,
      city,
      address,
      phone,
      authData.userid,
    )
    setOpen(false)

    reset()
  }

  async function handleClick(id: number) {
    await removeAddressAction(id)
  }

  return (
    <div className="grid grid-cols-2 mt-4 mb-6 gap-4">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger
          nativeButton={false}
          render={
            <div className="border rounded-sm h-40 cursor-pointer relative text-slate-600">
              <p className="m-3">New Address</p>
              <div className="absolute bottom-2 left-3">
                <Plus width={14} />
              </div>
            </div>
          }
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-5">Add address</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      placeholder="Please enter email"
                      {...register("name")}
                    />

                    {errors.name && (
                      <FieldError>{errors.name.message}</FieldError>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="city">city: </FieldLabel>
                    <Input
                      id="city"
                      placeholder="Please enter city"
                      {...register("city")}
                    />
                    {errors.city && (
                      <FieldError>{errors.city.message}</FieldError>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="address">address: </FieldLabel>
                    <Input
                      id="address"
                      placeholder="Please enter address"
                      {...register("address")}
                    />
                    {errors.address && (
                      <FieldError>{errors.address.message}</FieldError>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phone">phone: </FieldLabel>
                    <Input
                      id="phone"
                      placeholder="Please enter phone"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <FieldError>{errors.phone.message}</FieldError>
                    )}
                  </Field>
                </FieldGroup>
              </FieldSet>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit">Save</Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogHeader>
        </AlertDialogContent>

        {addressesData.map((item, i) => (
          <div
            key={i}
            className="border rounded-sm h-40 relative text-slate-600"
          >
            <p className="m-3">{item.name}</p>
            <div className="text-sm ml-5">
              <p>{item.city}</p>
              <p>{item.address}</p>
              <p>{item.phone}</p>
            </div>
            <div className="absolute bottom-2 left-3 flex text-xs gap-2">
              <div className="flex items-center cursor-pointer">
                <Edit width={14} /> Edit
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleClick(item.id)}
              >
                <Trash2 width={14} /> Remove
              </div>
            </div>
          </div>
        ))}
      </AlertDialog>
    </div>
  )
}
