import React from 'react'
import LoginCom from "../../components/LoginCom/LoginCom";

const Login = () => {
  localStorage.setItem("proces", false);
  return (
    <LoginCom />
  )
}

export default Login