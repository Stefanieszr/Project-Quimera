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
              <span className="descr-announcement">
                After finishing your new experiment in the "New experiment" tab,
                fill in the forum with the data correctly, and
              </span>
              <h3 className="title-announcement">
                Don't forget to check out the Dashboard!
              </h3>
              <span className="descr-announcement">
                This platform was created with the aim of facilitating and
                improving the performance of students and teachers in the areas
                of biology, primarily animal.
              </span>
              <button
                className="gotodash"
                onClick={() => navigate("/dashboard")}
              >
                <GrPieChart style={{ marginRight: 10 }} />
                Check the Dashboard
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
