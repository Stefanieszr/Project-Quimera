import { Layout } from "antd";

import styles from "./styles.module.css";

const { Content } = Layout;

const BaseAuth = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content className={styles.contentPagesAuth}>{children}</Content>
    </Layout>
  );
};
export default BaseAuth;
