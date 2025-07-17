import { Button, Card, Row, Col, Modal } from "antd";
import Base from "components/BaseLayout";
import WaterfallChart from "pages/StudentPages/WaterfallChart";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { useParams } from "react-router-dom";

import styles from "./styles.module.css";

import { getStudentByPin } from "@/services/routes/api/AuthStudent";
import {
  getGraphic,
  getExperimentById,
} from "@/services/routes/api/Experiment";
import { formatDate } from "@/utils/formats";

const ExperimentDetailsTeacher = () => {
  const { id } = useParams();
  const [responseDetails, setResponseDetails] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [pin, setPin] = React.useState();
  const [responseGraphic, setResponseGraphic] = React.useState({});
  const [selectedStudentId, setSelectedStudentId] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const teacherId = localStorage.getItem("_idTeacher");

  // Busca os detalhes do experimentos
  React.useEffect(() => {
    getExperimentById(teacherId, id).then((response) => {
      setResponseDetails(response.data.experiment);
      setPin(response.data.experiment.pin);
    });
  }, [teacherId, id]);

  // Busca todos os alunos que participaram desse experimento
  React.useEffect(() => {
    if (pin === undefined) return;
    getStudentByPin(pin)
      .then((response) => {
        setStudents(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pin]);

  const handleShowResultClick = (studentId) => {
    setSelectedStudentId(studentId);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedStudentId(null);
    setIsModalVisible(false);
  };

  // Busca o total do grafico
  React.useEffect(() => {
    if (selectedStudentId) {
      console.log(selectedStudentId);
      getGraphic(selectedStudentId)
        .then((response) => {
          setResponseGraphic(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedStudentId]);

  const findStudentName = (id) => {
    const student = students.find((student) => student._id === id);
    return student?.name;
  };

  return (
    <>
      <Base
        goTo={"/dashboard"}
        Icon={<MdOutlineDashboard />}
        goToName={"Dashboard"}
        titlepage={"Detalhes do Experimento"}
        nameofuser={"Teacher"}
        children={
          <div className={styles.cardsColSpace}>
            <Card className={styles.pageCardHome}>
              <div className={styles.ColDivCard}>
                <div className={styles.colDiv}>
                  <h3>Pin da sala do experimento:</h3>
                  <span>{responseDetails.pin}</span>
                </div>
                <div className={styles.colDiv}>
                  <h3>Titulo do experimento:</h3>
                  <span>{responseDetails.title}</span>
                </div>
                <div className={styles.colDiv}>
                  <h3>Título da atividade:</h3>
                  <span>{responseDetails.titleActivity}</span>
                </div>
                <div className={styles.colDiv}>
                  <h3>Descrição do experimento:</h3>
                  <span>{responseDetails.description}</span>
                </div>
                <div className={styles.colDiv}>
                  <h3>Data e horário do experimento:</h3>
                  <span>{formatDate(responseDetails.createdAt)}</span>
                </div>
              </div>
            </Card>
            <Card
              className={`${styles.pageCardHome} ${styles.pageCardStudents}`}
            >
              <div className={styles.colDiv}>
                <h3>Todos os estudantes que participaram:</h3>
                <div className={styles.divStudetns}>
                  {students.map((student) => (
                    <div key={student._id} className={styles.divNameAndSeeMore}>
                      <label>
                        Nome: <span>{student.name}</span>
                      </label>
                      <Button
                        onClick={() => handleShowResultClick(student._id)}
                      >
                        Show result
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        }
      />
      <Modal
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={"50%"}
      >
        <Row gutter={[16, 16]}>
          <Col xs={8} xl={24}>
            <h3>Gráfico do aluno, {findStudentName(selectedStudentId)}</h3>
            <span>
              Nota do aluno: <b>{responseGraphic.data?.nota} points</b>
            </span>
            {responseGraphic.data?.expectedValue &&
            responseGraphic.data?.studentValue ? (
              <div className={styles.graficosClass}>
                <WaterfallChart
                  experimentData={responseGraphic.data.expectedValue}
                  studentData={responseGraphic.data.studentValue}
                />
              </div>
            ) : (
              <h3>Loading the student graph...</h3>
            )}
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ExperimentDetailsTeacher;
