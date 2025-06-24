import "./styles.css";
import { Layout, Button, Card, Row, Col } from "antd";
import FooterComponent from "components/Footer";
import { AiOutlineExperiment } from "react-icons/ai";
import { MdOutlineBloodtype } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import LogoHA from "@/assets/logoHA.png";

const Home = () => {
  const { Header } = Layout;
  const navigate = useNavigate();
  return (
    <>
      <Header className="headerHomePG">
        <img src={LogoHA} alt="Logo HA" className="logoHomePG" />
        <div className="divbuttonMakeLogin">
          <h3 className="textanswerAction">Are you a teacher?</h3>{" "}
          <Button
            className="btnMakeLogin"
            onClick={() => navigate("/loginTeacher")}
          >
            Login
          </Button>
        </div>
      </Header>
      <div className="container-HomePage">
        <Card className="container-HomePage-Card">
          <h1 className="titleHomepage">Bem-vindo à QUIMERA!</h1>
          <p className="paragHomePage">
            Quimera é uma plataforma que permite a criação de experimentos
            interativos para aulas de ciências em medicina veterinária. Através
            dela, professores podem criar experimentos e alunos podem interagir
            com eles em tempo real.
          </p>
          <h2 className="titleHomepage">Escolha um experimento:</h2>
        </Card>
        <Row gutter={[10, 32]} className="rowCard">
          <Col xs={24} xl={12}>
            <Card
              className="CardHomePageExp Orange"
              onClick={() => navigate("/loginPin")}
            >
              <div className="contentCardHomePageExp">
                <AiOutlineExperiment className="iconHomePGExp" />
                <h1 className="textHomePGExp">
                  Experimento com a água corporal
                </h1>
              </div>
            </Card>
          </Col>
          <Col xs={24} xl={12}>
            <Card
              className="CardHomePageExp Yellow"
              onClick={() => navigate("/loginPin")}
            >
              <div className="contentCardHomePageExp">
                <MdOutlineBloodtype className="iconHomePGExp" />
                <h1 className="textHomePGExp">
                  Experimento com os níveis de glicose
                </h1>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <FooterComponent />
    </>
  );
};
export default Home;
