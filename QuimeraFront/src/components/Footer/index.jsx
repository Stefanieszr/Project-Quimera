import { Row, Col, Layout, Divider } from "antd";
import { AiOutlineHeart } from "react-icons/ai";

import styles from "./styles.module.css";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className={styles.footer}>
      <Row gutter={[32, 22]}>
        <Col xs={24} xl={24}>
          <span className={styles.descriptionFooter}>
            © 2023 Quimera - All rights reserved | Developed with{" "}
            <AiOutlineHeart className="icon-footer" />
            by{" "}
            <a href="https://github.com/fernandabonfimm/">
              Fernanda Bonfim and Stefanie Rodriguês
            </a>
          </span>
        </Col>
      </Row>
    </Footer>
  );
};
export default FooterComponent;
