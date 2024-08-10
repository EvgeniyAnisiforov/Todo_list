import { FC } from "react"
import { Button } from "antd"
import { useForm, SubmitHandler } from "react-hook-form"
import InputValidation from "../components/InputValidation"

type SubmitData = {
  login: string
  password: string
  name: string
  surname: string
}

const Registration: FC<{}> = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SubmitData>()

  const onSubmit: SubmitHandler<SubmitData> = (data) => {
    alert(JSON.stringify({ login: data.login, password: data.password }))
  }

  return (
    <div className="w-[100%] h-[100vh] bg-blue-900 flex justify-center items-center">
      <div className="w-[400px] rounded-xl bg-white">
        <h1 className="mt-5 text-xl">Регистрация</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[70%] m-auto mt-12">
            <InputValidation
              control={control}
              nameInput="surname"
              message="Фамилия"
              style={`mb-3  ${errors.password ? "border-red-500" : ""}`}
              errors={errors}
            />
            <InputValidation
              control={control}
              nameInput="name"
              message="Имя"
              style={`mb-3  ${errors.password ? "border-red-500" : ""}`}
              errors={errors}
            />
            <InputValidation
              control={control}
              nameInput="login"
              message="Логин"
              style={`mb-3  ${errors.password ? "border-red-500" : ""}`}
              errors={errors}
            />
            <InputValidation
              control={control}
              nameInput="password"
              message="Пароль"
              style={`mb-3  ${errors.password ? "border-red-500" : ""}`}
              errors={errors}
              typeInput="password"
            />
          </div>

          <div className="m-5">
          <Button htmlType="submit" type="primary">
            Отправить
          </Button>
        </div>
        </form>

        
      </div>
    </div>
  )
}

export { Registration }
