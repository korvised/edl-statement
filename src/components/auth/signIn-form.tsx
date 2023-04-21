import { ChangeEvent, FormEvent, useState } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid"

import { useAppDispatch } from "@/state/hooks"
import { login } from "@/state/slices/authSlice"
import { AuthBody } from "@/types/auth.type"
import { Spinner } from "@/common/ui/components"
import { Button } from "@/common/ui/button"
import { TextFiled } from "@/common/ui/field"
import classes from "./signIn-form.module.scss"

function SignInForm() {
  const [form, setForm] = useState<AuthBody>({
    username: "",
    password: "",
  })
  const [isPassword, setIsPassword] = useState<boolean>(true)
  const [submitted, setSubmitted] = useState(false)

  const dispatch = useAppDispatch()

  const { username, password } = form

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const toggleShowPassword = () => {
    setIsPassword(!isPassword)
  }

  const loginHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (username && password) {
      const authBody: AuthBody = { username, password }

      setSubmitted(true)
      await dispatch(login(authBody))
      setSubmitted(false)
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.card}>
          <div>
            <img
              className={classes.logo}
              src="/apb-name.jpg"
              alt="Your Company"
            />
            <h2 className={classes.title}>EDL Statement</h2>
            <p className={classes.subtitle}>
              ລະບົບລາຍງານທຸລະກໍາການຊໍາລະຄ່າໄຟຟ້າຜ່ານ ທສກ
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={loginHandle}>
            <TextFiled
              id="username"
              name="username"
              label="Username"
              autoComplete="none"
              value={username}
              onChange={handleChange}
              required
            />

            <TextFiled
              id="password"
              type={isPassword ? "password" : "text"}
              name="password"
              label="ລະຫັດຜ່ານ"
              value={password}
              onChange={handleChange}
              required
            >
              <span className={classes.toggle}>
                <button
                  type="button"
                  className={classes.toggle__icon}
                  onClick={toggleShowPassword}
                >
                  {isPassword ? <EyeIcon /> : <EyeSlashIcon />}
                </button>
              </span>
            </TextFiled>

            <Button
              type="submit"
              variant="solid"
              color="dark"
              value={submitted ? "Loading..." : "ເຂົ້າສູ່ລະບົບ"}
              className="mt-2 w-full"
              disabled={submitted}
            >
              {submitted && <Spinner className="mr-4 text-white" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignInForm
