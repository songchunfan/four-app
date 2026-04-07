import NotAccount from "@/components/NotAccount"
import Account from "@/components/Account"
import { authAction } from "@/actions/users"
import { addressAction } from "@/actions/addresses"

export default async function Page() {
  const ret = await authAction()
  // console.log(ret)
  const addresses = await addressAction(ret.data?.userid)

  return ret.status === 200 && ret.data ? (
    <Account authData={ret.data} addressesData={addresses.data} />
  ) : (
    <NotAccount />
  )
}
