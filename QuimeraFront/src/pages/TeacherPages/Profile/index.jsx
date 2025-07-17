import { Card, Row, Col, Input, Avatar } from "antd";
import { useState } from "react";
import { MdOutlineBiotech } from "react-icons/md";
import Alert from "sweetalert2";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import styles from "./styles.module.css";

import Base from "@/components/BaseLayout";

const UserList = ["Fernanda", "Pedro", "Barbara", "Jean"];
const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
const GapList = [4, 3, 2, 1];

const Profile = () => {
  const userType = localStorage.getItem("userType");
  // const responseUser = JSON.parse(localStorage.getItem("responseUser"));
  const responseUser = {
    name: "stefsnie",
  };
  console.log(responseUser);
  // const navigate = useNavigate();
  // const [user, setUser] = useState(UserList[0]);
  const [color] = useState(ColorList[0]);
  const [gap] = useState(GapList[0]);

  const [name, setName] = useState("Stefanie");
  const [email, setEmail] = useState("stefaniesouza@gmail.com");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeNewPassword = () => {
    if (password !== confirmPassword) {
      Alert.fire({
        icon: "error",
        title: "As senhas não coincidem!",
      });
    } else if (
      !password.match(
        `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$`
      )
    ) {
      Alert.fire({
        icon: "error",
        title:
          "Deixe sua senha mais forte para sua segurança, insira numeros, caracteres especiais, letras maiúsculas e minúsculas.",
      });
    } else {
      Alert.fire({
        icon: "success",
        title: "A sua senha foi alterada com sucesso!",
      }).then(() => setShowPassword(false));
    }
  };

  const handleChangeInformations = () => {
    if (!name) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Preencha o campo nome!",
      });
    } else if (!email || !email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Preencha o campo email corretamente!",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "As informações foram alteradas com sucesso!",
      });
    }
  };

  return (
    <Base
      goTo={"/profile"}
      Icon={<MdOutlineBiotech />}
      goToName={"Perfil do Usuário"}
      titlepage={"ao seu perfil"}
      // nameofuser={responseUser.name}
      children={
        <>
          <Row gutter={[32, 22]}>
            <Col xs={24} xl={8}>
              <Card className={styles.cardProfile}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    style={{ backgroundColor: color, verticalAlign: "middle" }}
                    size="large"
                    gap={gap}
                    className={styles.avatarProfile}
                  >
                    {responseUser.name}
                  </Avatar>
                </div>
                <span className={styles.nameProfile}> {responseUser.name}</span>
                <span className={styles.ocupation}>
                  {" "}
                  {userType === "teacher" ? "Professor" : userType}
                </span>
              </Card>
            </Col>
            <Col xs={24} xl={16}>
              <Card className={styles.cardProfile}>
                <Row gutter={[32, 22]}>
                  <Col xs={24} xl={12}>
                    <span className={styles.labelProfile}>Nome Completo:</span>
                    <Input
                      type="name"
                      id="name"
                      defaultValue={responseUser.name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.inputProfile}
                    />
                  </Col>
                  <Col xs={24} xl={12}>
                    <span className={styles.labelProfile}>E-mail:</span>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.inputProfile}
                    />
                  </Col>
                  <Col xs={24} xl={12}>
                    <span className={styles.labelProfile}>
                      Tipo de usuário:
                    </span>
                    <Input
                      type="userType"
                      id="userType"
                      value={userType === "teacher" ? "Professor" : userType}
                      className={styles.inputProfile}
                    />
                  </Col>
                </Row>
                <Row gutter={[32, 22]}>
                  {showPassword && (
                    <>
                      <Col xs={24} xl={12}>
                        <span className={styles.labelProfile}>Nova Senha:</span>
                        <Input.Password
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={styles.inputProfile}
                        />
                      </Col>
                      <Col xs={24} xl={12}>
                        <span className={styles.labelProfile}>
                          Confirmar nova Senha:
                        </span>
                        <Input.Password
                          id="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={styles.inputProfile}
                        />
                      </Col>
                    </>
                  )}
                  <Col xs={24} xl={12}>
                    {!showPassword && (
                      <button
                        className={`${styles.green} ${styles.changePassword}`}
                        onClick={() => setShowPassword(true)}
                      >
                        Mudar a Senha
                      </button>
                    )}
                    {showPassword && (
                      <button
                        className={`${styles.green} ${styles.changePassword}`}
                        onClick={handleChangeNewPassword}
                      >
                        Salvar a nova Senha
                      </button>
                    )}
                  </Col>
                  <Col xs={24} xl={12}>
                    <button
                      className={`${styles.blue} ${styles.changePassword}`}
                      onClick={handleChangeInformations}
                    >
                      Salvar Alterações
                    </button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </>
      }
    />
  );
};
export default Profile;
