import { Layout, Row, Col, Breadcrumb, Card } from "antd";
import { RiHomeHeartLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import FooterComponent from "../Footer";
import HeaderComponent from "../Header";
import styles from "./styles.module.css";
// import "./styles.css";
// import TeacherContext from "../../context/Users/Teacher";

const { Content } = Layout;

const Base = ({ children, goTo, Icon, goToName, titlepage }) => {
  const navigate = useNavigate();
  // const teacherContext = useContext(TeacherContext);
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <HeaderComponent />
        <Content className={styles.contentPages}>
          <Card className={styles.pageCardTitle}>
            <Row>
              <Col xs={24} xl={24}>
                <Breadcrumb>
                  <Breadcrumb.Item onClick={() => navigate("/")}>
                    <RiHomeHeartLine />
                  </Breadcrumb.Item>

                  <Breadcrumb.Item onClick={() => navigate(goTo)}>
                    {Icon}
                    <span>{goToName}</span>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col xs={24} xl={24}>
                <h3 className={styles.titlepage}>{titlepage}</h3>
              </Col>
            </Row>
          </Card>
          <div className={styles.tableHome}>{children}</div>
        </Content>
        <FooterComponent />
      </Layout>
    </>
  );
};
export default Base;
