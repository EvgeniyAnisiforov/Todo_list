import { FC } from "react"
import FormAuthorization from "./FormAuthorization"

const Authorization: FC<{}> = () => {
  return (
    <div className="w-[100%] h-[100vh] bg-blue-900 flex justify-center items-center">
      <div className="w-[700px] rounded-xl bg-white">
        <h1 className="mt-9 text-4xl">Авторизация</h1>

        <FormAuthorization />
      </div>
    </div>
  )
}

export { Authorization }
