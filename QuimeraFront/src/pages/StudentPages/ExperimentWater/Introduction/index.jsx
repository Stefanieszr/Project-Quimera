import { Card, Button } from "antd";
import Base from "components/BaseLayoutStudent";
import { AiOutlineExperiment } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { MdOutlineBiotech } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles.module.css";

const IntroductionWater = () => {
  const { pin } = useParams();
  const navigate = useNavigate();
  const storedName = localStorage.getItem("name");
  const navigateToClinicCase = () => {
    navigate(`/cliniccasewater/${pin}`);
  };
  const navigateToExperiment = () => {
    navigate(`/experiment/${pin}`);
  };
  return (
    <Base
      goTo={"/"}
      Icon={<MdOutlineBiotech />}
      goToName={"Introduction to Matter"}
      titlepage={`the introduction of the body water drop matter of the experiment: ${pin}, `}
      nameofuser={storedName}
      children={
        <Card className={styles.cardCCWater}>
          <div className={styles.divTextsintro}>
            <h1 className={styles.titlesCCWater}>WATER for “CHIMERA”</h1>
            <span className={styles.expCCWater}>
              The maintenance of parameters, with well-defined limits, is a
              fundamental characteristic for the possibility of life. One of the
              most relevant of these parameters is the control of WATER in the
              organism of animals, other examples being: Na+, Ca++, Temperature,
              Hormonal Concentrations, Glucose, etc. <br />
              The total volume of water of an animal remains relatively constant
              throughout the day. The (daily, natural) gain and loss of water
              vary continuously within these limits previously mentioned.
            </span>
            <h1 className={styles.titlesCCWater}>Specifying for: </h1>
            <ul className={styles.itemsCCWater}>
              <li>
                <strong>GAIN:</strong> The intake of water in liquid form +
                water present in food + water originating from cellular
                metabolism.
              </li>
              <li>
                <strong>LOSS:</strong> It occurs in the form of Urine + Sweating
                + Breathing + Feces + Milk.
              </li>
            </ul>
            <span className={styles.expCCWater}>
              Both the gain and loss of water from the animal's body are
              continuous, with more significant episodes and others less so, for
              example: when urinating, the animal eliminates a significant
              amount of water at one time, on the other hand, the loss through
              breathing is not at one time, instead, it occurs continuously,
              varying according to several environmental factors. The gain
              occurs in the same way, with the ingestion of natural water in a
              significant amount at one time, and the metabolic loss is not so
              specific.
            </span>
            <br />
            <br />
            <span className={styles.expCCWater}>
              When the loss reaches significant levels, mechanisms for ingestion
              are triggered, precisely by the sensation of thirst, but other
              concomitant mechanisms will also be promoted, for example, with
              the concentration of urine being accentuated, therefore reducing
              the volume of water eliminated. This situation will be continuous
              for any animal, with the challenge of DEHYDRATION threatening life
              permanently.
            </span>
            <br />
            <br />
            <span className={styles.expCCWater}>
              As soon as dehydration begins, the animal will look for water to
              drink. This varies depending on several aspects, such as: species,
              physiological state of the individual, age, temperature and
              humidity of the environment, etc.
              <br />
              <br />
              <strong>Another important point</strong>, related to the loss of
              water, is the alteration of the electrolytes present in the animal
              organism, but this topic will be the subject of another activity.
              The mechanisms related to the control of electrolytes are closely
              related to the control of water.
            </span>
          </div>
          <div className={styles.divButtonIntro}>
            <h1 className={styles.titleIntro}>
              Do you want to study the clinical case before starting or jumping
              into the experiment?
            </h1>
            <div className={styles.divButtonsIntro}>
              <Button
                className={`${styles.btnIntro} ${styles.Yellow}`}
                type="primary"
                onClick={navigateToClinicCase}
              >
                <BsBook />
                Study clinical case
              </Button>
              <span className={styles.titleIntro}> Or </span>
              <Button
                className={`${styles.btnIntro} ${styles.Orange}`}
                type="primary"
                onClick={navigateToExperiment}
              >
                <AiOutlineExperiment />
                Start the experiment
              </Button>
            </div>
          </div>
        </Card>
      }
    />
  );
};
export default IntroductionWater;
