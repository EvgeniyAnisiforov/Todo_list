import { FC } from "react"
import { Button, message } from "antd"

import { useForm, SubmitHandler } from "react-hook-form"
import InputValidation from "../../components/InputValidation"
import { useAuthorizationMutation } from "../../redux/AuthorizationApi"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../redux/hook"
import { setAuth } from "../../redux/setAuth-slice"
import "../../App.css"

type SubmitData = {
  login: string
  password: string
}

const FormAuthorization: FC<{}> = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SubmitData>()

  const navigate = useNavigate()
  const goHomePage = () => {
    navigate("/homepage")
  }

  const [authorization] = useAuthorizationMutation()
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<SubmitData> = async (data) => {
    try {
      const response: any = await authorization({
        login: data.login,
        password: data.password,
      })
      if (response.error) {
        throw new Error(response.error.data.message)
      }
      if (response.data) {
        dispatch(
          setAuth({
            id: response.data.id,
            name: response.data.name,
            surname: response.data.surname,
          })
        )
        goHomePage()
      } else {
        message.error("Не удалось получить данные пользователя")
      }
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message)
      } else {
        message.error("Произошла неизвестная ошибка")
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[70%] m-auto mt-12">
        <InputValidation
          control={control}
          nameInput="login"
          message="Логин"
          style={`h-[60px] text-2xl mb-5  ${
            errors.login ? "border-red-500" : ""
          }`}
          errors={errors}
          key="login"
        />
        <InputValidation
          control={control}
          nameInput="password"
          message="Пароль"
          style={`h-[60px] text-2xl mb-5  ${
            errors.password ? "border-red-500" : ""
          }`}
          errors={errors}
          typeInput="password"
          key="password"
        />
      </div>

      <p className="text-2xl">
        Нет аккаунта?{" "}
        <span
          onClick={() => navigate("/registration")}
          className="text-blue-600 underline hover:text-blue-800 hover:cursor-pointer"
        >
          Регистрация
        </span>
      </p>

      <div className="m-10">
        <Button
          className="w-[200px] h-[50px] text-2xl"
          htmlType="submit"
          type="primary"
        >
          Отправить
        </Button>
      </div>
    </form>
  )
}

export default FormAuthorization
