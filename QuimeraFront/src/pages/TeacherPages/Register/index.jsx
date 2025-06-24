import { Card, Input } from "antd";
import { useState } from "react";
import { RiUserHeartLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import LogoHA from "@/assets/logoHA.png";
import BaseAuth from "@/components/BaseAuth";
import { registerTeacher } from "@/services/routes/api/AuthTeacher";

import "./styles.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [setResponseUser] = useState({});

  const saveUser = async () => {
    if (!name) {
      Swal.fire({
        icon: "error",
        title: "Por favor, insira seu nome completo!",
      });
      return;
    }

    if (!email.match(`^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`)) {
      Swal.fire({
        icon: "error",
        title:
          "Por favor, verifique o campo de e-mail se ele está correto, insira o @ e endereço!",
      });
      return;
    }

    if (
      !password.match(
        `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$`
      )
    ) {
      Swal.fire({
        icon: "error",
        title:
          "Por favor, verifique o campo de senha, insira uma letra maiúscula, minúscula e caracter especial!",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "As senhas não coincidem, por favor verifique!",
      });
      return;
    }
    try {
      await registerTeacher(name, email, password).then((response) => {
        setResponseUser(response.data);
      });
      Swal.fire({
        icon: "success",
        title: "Registro criado com sucesso! faça o login agora.",
      });
      navigate("/loginTeacher");
    } catch (error) {
      console.error("Error logging in teacher:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao realizar o login!",
      });
    }
  };

  return (
    <BaseAuth>
      <Card className="card-login">
        <div className="center">
          <img src={LogoHA} name="logo" className="logo-login" />
        </div>
        <h3 className="title-login">Welcome to the platform!</h3>
        <span className="subtitle-login">
          Fill out the form to create an account on the platform.
        </span>
        <span className="label-input">Full Name:</span>
        <Input
          type="name"
          placeholder="Enter your full name..."
          id="name"
          className="input-login"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
        />
        <span className="label-input">E-mail:</span>
        <Input
          type="email"
          placeholder="example@example.com"
          id="email"
          className="input-login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={100}
        />
        <span className="label-input">Password:</span>
        <Input.Password
          placeholder="Create one password..."
          id="password"
          className="input-login"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={30}
        />
        <span className="label-input">Confirm the password:</span>
        <Input.Password
          placeholder="Confirm your password..."
          id="confirmPassword"
          className="input-login"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          maxLength={30}
        />
        <button className="button-login" onClick={() => saveUser()}>
          Create account
        </button>
        <span className="forgot-password">
          <RiUserHeartLine style={{ marginRight: 5 }} />
          Already have an account?
          <Link to="/loginTeacher" className="link-register">
            Login
          </Link>
        </span>
      </Card>
    </BaseAuth>
  );
};
export default Register;
