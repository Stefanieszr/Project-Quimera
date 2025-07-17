import { Row, Col, Card, Button } from "antd";
import { MdOutlineBiotech } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles.module.css";

import Gato1 from "@/assets/gato1.jpg";
import Gato2 from "@/assets/gato2.jpg";
import Base from "@/components/BaseLayoutStudent";

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
        <Card className={styles.cardCCWater}>
          <Row gutter={[32, 22]}>
            <Col xs={24} xl={12}>
              <h1 className={styles.titlesCCWater}>Animal: Chimera I </h1>
              <span className={styles.expCCWater}>
                Explanation: Kidney problems are very common in cats. In this
                condition, a very important symptom that we must monitor is
                dehydration. When keeping the animal in veterinary clinics for
                various procedures, we often observe this dangerous situation.{" "}
              </span>
              <h2 className={styles.titlesCCWater}>Symptoms</h2>
              <span className={`${styles.expCCWater} ${styles.bold}`}>
                The main symptoms of dehydration in this animal are:
              </span>
              <ul className={styles.itemsCCWater}>
                <li>Wrinkled skin</li>
                <li>Panting</li>
                <li>Increased heart rate</li>
                <li>Sunken eyes</li>
                <li>Difficulty urinating</li>
              </ul>
              <h2 className={styles.titlesCCWater}>Causes</h2>
              <span className={`${styles.expCCWater} ${styles.bold}`}>
                The main causes are:
              </span>
              <ul className={styles.itemsCCWater}>
                <li>Insufficient intake (for various reasons)</li>
                <li>Vomiting and/or Diarrhea</li>
                <li>Burns, sunstroke, and different types of pathologies</li>
              </ul>
            </Col>
            <Col xs={24} xl={12}>
              <div className={styles.imgcatsDiv}>
                <img src={Gato1} alt="gato1" className="imgcats" />
                <img src={Gato2} alt="gato2" className="imgcats" />
              </div>
            </Col>
          </Row>
          <div className={styles.divButtonIniciate}>
            <h1 className={styles.titleIniciate}>Ready to start treatment?</h1>
            <span className={styles.descCCWater}>
              The thirst threshold will trigger strict homeostatic control in
              the animal's body.{" "}
            </span>
            <Button
              className={styles.btnIniciate}
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
