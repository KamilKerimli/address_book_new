import React from 'react'
import ForgotCom from "../../components/ForgotCom/ForgotCom";
import VerifyCom from "../../components/VerifyCom/VerifyCom";

const Forgot = () => {
  const proces = (localStorage.getItem("proces") === "true");

  return proces === true ? <VerifyCom /> : <ForgotCom />
}

export default Forgot