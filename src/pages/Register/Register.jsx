import React from 'react'
import RegisterCom from "../../components/RegisterCom/RegisterCom";

const Register = () => {
  localStorage.setItem("proces", false);
  return (
    <RegisterCom />
  )
}

export default Register