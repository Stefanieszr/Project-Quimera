import { Card, Input } from "antd";
import LogoHA from "assets/logoHA.png";
import { useState, useEffect } from "react";
import Alert from "sweetalert2";

// import { useNavigate } from "react-router-dom";
import BaseAuth from "@/components/BaseAuth";
import ErrorMessageInput from "@/components/ErrorMessageInput";
import SucessMessageInput from "@/components/SucessMessageInput";

import "./styles.css";

const ForgotPassword = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  const [emailSucess, setEmailSucess] = useState();
  const recoverPassword = (e) => {
    e.preventDefault();

    if (email.match(`^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`)) {
      Alert.fire({
        icon: "success",
        title:
          "O link de recuperação de senha chegará no seu e-mail em alguns minutos, confira a caixa geral e de spam!",
      });
    }
  };

  useEffect(() => {
    if (email) {
      if (
        !email.match(`^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`)
      ) {
        setEmailError(
          "Email inválido, insirá as credenciais corretas do seu e-mail! Ex: example@example.com"
        );
        setEmailSucess(false);
      } else if (
        email.match(`^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`)
      ) {
        setEmailSucess(
          "Email válido! Basta confirmar no botão abaixo a recuperação de senha."
        );
        setEmailError(false);
      }
    } else {
      setEmailError();
    }
  }, [email]);

  return (
    <BaseAuth>
      <Card className="card-login">
        <div className="center">
          <img src={LogoHA} alt="logo" name="logo" className="logo-login" />
        </div>
        <h3 className="title-login">Você esqueceu a sua senha?</h3>
        <span className="subtitle-login">
          Não se preocupe com isso, basta confirmar seu e-mail abaixo e iremos
          enviar um link em seu e-mail para redefinir sua senha.
        </span>
        <span className="label-input">Confirme o seu E-mail:</span>
        <Input
          type="email"
          placeholder="example@example.com"
          id="email"
          className="input-login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <ErrorMessageInput> {emailError}</ErrorMessageInput>
        <SucessMessageInput>{emailSucess}</SucessMessageInput>
        <button className="button-login" onClick={recoverPassword}>
          Recuperar minha senha
        </button>
      </Card>
    </BaseAuth>
  );
};
export default ForgotPassword;
