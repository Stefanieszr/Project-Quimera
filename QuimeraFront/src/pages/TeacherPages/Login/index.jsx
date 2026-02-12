import { Card, Input } from "antd";
import LogoHA from "assets/logoHA.png";
import { useContext, useRef } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Alert from "sweetalert2";

import styles from "./styles.module.css";

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
    } catch (error) {
      console.error("Error logging in teacher:", error);
      Alert.fire({
        icon: "error",
        title: "Erro ao realizar o login!",
        text: error.response?.data?.message || "Ocorreu um erro desconhecido.",
      });
    }
  };

  return (
    <BaseAuth>
      <Card className={styles.cardLogin}>
        <div className={styles.center}>
          <img src={LogoHA} name="logo" className={styles.logoLogin} />
        </div>
        <h3 className={styles.titleLogin}>Welcome to the platform!</h3>
        <span className={styles.subtitleLogin}>
          Fill out the form to log in to the platform.
        </span>
        <form>
          <span className={styles.labelInput}>E-mail:</span>
          <Input
            ref={refEmail}
            type="email"
            placeholder="example@example.com"
            id="email"
            className={styles.inputLogin}
          />
          <span className={styles.labelInput}>Password:</span>
          <Input.Password
            ref={refPassword}
            placeholder="*********"
            id="password"
            className={styles.inputLogin}
          />
        </form>
        {/* <span
          className="forgot-password"
          onClick={() => navigate("/forgotpassword")}
        >
          <AiOutlineKey style={{ marginRight: 5 }} />
          Esqueceu sua senha?
        </span> */}
        <button className={styles.buttonLogin} onClick={() => handleLogin()}>
          Login
        </button>
        <span className={styles.forgotPassword}>
          <AiOutlineUserAdd style={{ marginRight: 5 }} />
          Ainda não tem uma conta?
          <Link to="/register" className={styles.linkRegister}>
            Criar uma conta
          </Link>
        </span>
      </Card>
    </BaseAuth>
  );
};
export default Login;
