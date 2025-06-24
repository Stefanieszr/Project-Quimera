import { Card, Row, Col, Tag, Button } from "antd";
import "./styles.css";

const ExperimentalsCard = ({
  titleExperimentalCard,
  statusExperimentalTag,
  titleButton,
  onClickButton,
  dataExperimental,
  iconeStatus,
}) => {
  function StatusOfExperiment(getStatusExperiment) {
    switch (getStatusExperiment) {
      case "Cancelado":
        return {};
      case "Finalizado":
        return {};
      case "Aberto":
        return {};
      case "Fechado":
        return {};

      default:
        return {};
    }
  }
  return (
    <Card>
      <Row gutter={[32, 22]}>
        <Col xs={20} xl={24}>
          <h3>{titleExperimentalCard}</h3>
        </Col>
        <Col xs={20} xl={24}>
          <Tag>
            {iconeStatus}
            {statusExperimentalTag}
          </Tag>
        </Col>
        <Col xs={24} xl={24}>
          <span>{dataExperimental}</span>
        </Col>
        <Col xs={24} xl={24}>
          <Button onClick={onClickButton}>{titleButton}</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ExperimentalsCard;
