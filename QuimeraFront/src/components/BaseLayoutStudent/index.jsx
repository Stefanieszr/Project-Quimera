import { Layout, Row, Col, Breadcrumb, Card } from "antd";
import { useNavigate } from "react-router-dom";

import FooterComponent from "../Footer";
// import "./styles.css";
import styles from "./styles.module.css";

const { Content } = Layout;

const Base = ({
  children,
  goTo,
  Icon,
  goToName,
  titlepage,
  descriptionPage,
  nameofuser,
}) => {
  const navigate = useNavigate();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content className={styles.contentPages}>
        <Card className={styles.pageCardTitle}>
          <Row>
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

            <Col xs={24} xl={24}>
              <h3 className={styles.titlePage}>
                {titlepage} {nameofuser}
              </h3>
              <span className="description-cardExperiment">
                {descriptionPage}
              </span>
            </Col>
          </Row>
        </Card>
        {children}
      </Content>
      <FooterComponent />
    </Layout>
  );
};
export default Base;
