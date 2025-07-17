import { Layout, Row, Col, Breadcrumb, Card } from "antd";
import { RiHomeHeartLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import FooterComponent from "../Footer";
import HeaderComponent from "../Header";
import styles from "./styles.module.css";
// import "./styles.css";
// import TeacherContext from "../../context/Users/Teacher";

const { Content } = Layout;

const Base = ({ children, goTo, Icon, goToName }) => {
  const navigate = useNavigate();
  // const teacherContext = useContext(TeacherContext);
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <HeaderComponent />
        <Content className={styles.contentPages}>
          <Card className={styles.pageCardTitle}>
            <Row className={styles.rowPadding}>
              <Col xs={24} xl={24}>
                <Breadcrumb
                  items={[
                    {
                      title: (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          {Icon}
                          {goToName}
                        </span>
                      ),
                      onClick: () => navigate(goTo),
                    },
                  ]}
                />
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
