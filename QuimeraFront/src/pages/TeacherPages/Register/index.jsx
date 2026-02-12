import { Card, Input } from "antd";
import { useState } from "react";
import { RiUserHeartLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import styles from "./styles.module.css";

import LogoHA from "@/assets/logoHA.png";
import BaseAuth from "@/components/BaseAuth";
import { createTeacher } from "@/services/routes/api/AuthTeacher";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const saveUser = async () => {
    try {
      await createTeacher(name, email, password);

      Swal.fire({
        icon: "success",
        title: "Registro criado com sucesso!",
      });
      navigate("/loginTeacher");
    } catch (error) {
      console.error("Error registering teacher:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao realizar o registro!",
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
          Fill out the form to create an account on the platform.
        </span>
        <span className={styles.labelInput}>Full Name:</span>
        <Input
          type="name"
          placeholder="Enter your full name..."
          id="name"
          className={styles.inputLogin}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
        />
        <span className={styles.labelInput}>E-mail:</span>
        <Input
          type="email"
          placeholder="example@example.com"
          id="email"
          className={styles.inputLogin}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={100}
        />
        <span className={styles.labelInput}>Password:</span>
        <Input.Password
          placeholder="Create one password..."
          id="password"
          className={styles.inputLogin}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={30}
        />
        <span className={styles.labelInput}>Confirm the password:</span>
        <Input.Password
          placeholder="Confirm your password..."
          id="confirmPassword"
          className={styles.inputLogin}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          maxLength={30}
        />
        <button className={styles.buttonLogin} onClick={() => saveUser()}>
          Create account
        </button>
        <span className={styles.forgotPassword}>
          <RiUserHeartLine style={{ marginRight: 5 }} />
          Already have an account?
          <Link to="/loginTeacher" className={styles.linkRegister}>
            Login
          </Link>
        </span>
      </Card>
    </BaseAuth>
  );
};
export default Register;
