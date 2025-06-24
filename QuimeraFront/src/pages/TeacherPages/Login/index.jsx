import { Card, Input } from "antd";
import LogoHA from "assets/logoHA.png";
import { useContext, useRef } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import Alert from "sweetalert2";

import BaseAuth from "@/components/BaseAuth";
import TeacherContext from "@/context/Users/Teacher";
import { loginTeacher } from "@/services/routes/api/AuthTeacher";

const Login = () => {
  const navigate = useNavigate();
  const refEmail = useRef();
  const refPassword = useRef();
  const teacherContext = useContext(TeacherContext);

  const handleLogin = async () => {
    const email = refEmail.current.input.value.trim();
    const password = refPassword.current.input.value.trim();

    if (email.length === 0) {
      Alert.fire({
        icon: "error",
        title: "Insira um e-mail para realizar o login!",
      });
      return;
    } else if (password.length === 0) {
      Alert.fire({
        icon: "error",
        title: "Insira sua senha para realizar o login!",
      });
      return;
    }

    try {
      const { token, name, _id } = (await loginTeacher(email, password)).data;

      teacherContext.setEmail(email);
      teacherContext.setName(name);
      teacherContext.setToken(token);
      teacherContext.set_id(_id);
      teacherContext.saveSession();

      Alert.fire({
        icon: "success",
        title: "Login realizado com sucesso!",
      });
      navigate("/dashboard");
    } catch {
      Alert.fire({
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
          Fill out the form to log in to the platform.
        </span>
        <form>
          <span className="label-input">E-mail:</span>
          <Input
            ref={refEmail}
            type="email"
            placeholder="example@example.com"
            id="email"
            className="input-login"
          />
          <span className="label-input">Password:</span>
          <Input.Password
            ref={refPassword}
            placeholder="*********"
            id="password"
            className="input-login"
          />
        </form>
        {/* <span
          className="forgot-password"
          onClick={() => navigate("/forgotpassword")}
        >
          <AiOutlineKey style={{ marginRight: 5 }} />
          Esqueceu sua senha?
        </span> */}
        <button className="button-login" onClick={() => handleLogin()}>
          Login
        </button>
        <span className="forgot-password">
          <AiOutlineUserAdd style={{ marginRight: 5 }} />
          Don't have an account yet?
          <Link to="/register" className="link-register">
            Create account
          </Link>
        </span>
      </Card>
    </BaseAuth>
  );
};
export default Login;
