import { FC } from "react"
import { Controller } from "react-hook-form"
import { Input } from "antd"

interface PropsInputValidation {
  nameInput: string
  control: any
  message: string
  style: string
  errors: any
  typeInput?: string
}

const InputValidation: FC<PropsInputValidation> = ({
  nameInput,
  control,
  message,
  style,
  errors,
  typeInput,
}) => {
  return (
    <>
      <Controller
        name={nameInput}
        control={control}
        rules={{
          required: `Поле ${message.toLowerCase()} обязательно для заполнения`,
          maxLength: {
            value: 50,
            message: "Максимальное количество символов - 50",
          },
        }}
        render={({ field }) =>
          typeInput === "password" ? (
            <Input.Password
              {...field}
              placeholder={message}
              className={style}
            />
          ) : (
            <Input {...field} placeholder={message} className={style} />
          )
        }
      />
      {errors[nameInput] && typeof errors[nameInput].message === "string" && (
        <p className="text-red-500 text-xs mb-3">{errors[nameInput].message}</p>
      )}
    </>
  )
}
export default InputValidation
