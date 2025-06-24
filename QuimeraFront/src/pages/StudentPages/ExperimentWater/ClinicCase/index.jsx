import "./styles.css";
import { Row, Col, Card, Button } from "antd";
import Gato1 from "assets/gato1.jpg";
import Gato2 from "assets/gato2.jpg";
import Base from "components/BaseLayoutStudent";
import { MdOutlineBiotech } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
const ClinicCaseWater = () => {
  const { pin } = useParams();
  const navigate = useNavigate();
  const storedName = localStorage.getItem("name");
  const navigateToExperiment = () => {
    navigate(`/experiment/${pin}`);
  };
  return (
    <Base
      goTo={"/"}
      Icon={<MdOutlineBiotech />}
      goToName={"Clinical Case"}
      titlepage={`to the clinical case of the experiment: ${pin}, `}
      nameofuser={storedName}
      children={
        <Card className="cardCCWater">
          <Row gutter={[32, 22]}>
            <Col xs={24} xl={12}>
              <h1 className="titlesCCWater">Animal: Chimera I </h1>
              <span className="expCCWater">
                Explanation: Kidney problems are very common in cats. In this
                condition, a very important symptom that we must monitor is
                dehydration. When keeping the animal in veterinary clinics for
                various procedures, we often observe this dangerous situation.{" "}
              </span>
              <h2 className="titlesCCWater">Symptoms</h2>
              <span className="expCCWater bold">
                The main symptoms of dehydration in this animal are:
              </span>
              <ul className="itemsCCWater">
                <li>Wrinkled skin</li>
                <li>Panting</li>
                <li>Increased heart rate</li>
                <li>Sunken eyes</li>
                <li>Difficulty urinating</li>
              </ul>
              <h2 className="titlesCCWater">Causes</h2>
              <span className="expCCWater bold">The main causes are:</span>
              <ul className="itemsCCWater">
                <li>Insufficient intake (for various reasons)</li>
                <li>Vomiting and/or Diarrhea</li>
                <li>Burns, sunstroke, and different types of pathologies</li>
              </ul>
            </Col>
            <Col xs={24} xl={12}>
              <div className="imgcatsDiv">
                <img src={Gato1} alt="gato1" className="imgcats" />
                <img src={Gato2} alt="gato2" className="imgcats" />
              </div>
            </Col>
          </Row>
          <div className="divButtonIniciate">
            <h1 className="titleIniciate">Ready to start treatment?</h1>
            <span className="descCCWater">
              The thirst threshold will trigger strict homeostatic control in
              the animal's body.{" "}
            </span>
            <Button
              className="btnIniciate"
              type="primary"
              onClick={navigateToExperiment}
            >
              Start treatment
            </Button>
          </div>
        </Card>
      }
    />
  );
};

export default ClinicCaseWater;
