import { Row, Col, Card } from "antd";
import "./styles.css";
import ChartImg from "assets/charts.png";
import { GrPieChart } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const Announcement = () => {
  const navigate = useNavigate();
  return (
    <Row>
      <Col xs={24} xl={24}>
        <Card className="announcement">
          <Row gutter={[32, 22]}>
            <Col xs={20} xl={18}>
              <span className="descr-announcement"></span>
              <h3 className="title-announcement">
                Não se esqueça de conferir o Dashboard!
              </h3>
              <span className="descr-announcement">
                Esta plataforma foi criada com o objetivo de facilitar e
                melhorar o desempenho de alunos e professores nas áreas de
                biologia, principalmente animal.
              </span>
              <button
                className="gotodash"
                onClick={() => navigate("/dashboard")}
              >
                <GrPieChart style={{ marginRight: 10 }} />
                Verificar Dashboard
              </button>
            </Col>
            <Col xs={20} xl={6}>
              <img
                src={ChartImg}
                className="charts-img"
                name="chartsimg"
                onClick={() => navigate("/dashboard")}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default Announcement;
