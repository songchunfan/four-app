import { revalidatePath } from "next/cache"
import { neon } from "@neondatabase/serverless"
const sql = neon(`${process.env.DATABASE_URL}`)
/* 
// 查


// 增

// 改
const result = await sql('UPDATE users SET username = $1 WEHRE id = 1', [username])

// 删
const result = await sql('DELETE FROM users WHERE id = $1', [id])
*/
export default async function Home() {
  const result = await sql`SELECT * FROM users`

  async function createAction(formData: FormData) {
    "use server"

    const username = formData.get("username")
    const password = formData.get("password")
    await sql`INSERT INTO users (username, password) VALUES (${username}, ${password})`
    revalidatePath("/")
  }

  return (
    <div>
      Hello world!!!
      <ul className="w-sm">
        {result.map((item) => {
          return (
            <li
              key={item.id}
              className="m-1.5 p-2 flex justify-between items-center border"
            >
              {item.username}-{item.password}
              <button
                className="ml-10 bg-amber-600 px-2 py-1 rounded-xs cursor"
                type="button"
              >
                删除
              </button>
            </li>
          )
        })}
      </ul>
      <section>
        <form action={createAction}>
          <div className="p-2">
            <span className="text-amber-400">用户名：</span>
            <input
              className="border border-purple-500"
              type="text"
              name="username"
            />
          </div>
          <div className="p-2">
            <span className="text-purple-500">密 码：</span>
            <input
              className="border border-amber-400"
              type="password"
              name="password"
            />
          </div>
          <div className="p-2 flex justify-start-safe ">
            <button type="submit" className="bg-amber-600 px-2 py-1 rounded-xs">
              提交
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
