import React from 'react'
import css from "@/style/authLayout.module.css"
import { Image } from 'antd'

export const metadata = {
    title: "Authintication"
}
const AuthLayout = ({children}) => {
  return (

    <div className={css.wrapper}>
        <div className={css.container}>
            <div className={css.left}>
                {children}
            </div>

            <div className={css.right}>
                <Image
                alt="Auth image"
                src="/images/auth.png"
                width={400}
                height={480}
                quality= {100}></Image>
                
            </div>
        </div>
    </div>

  )
}

export default AuthLayout
