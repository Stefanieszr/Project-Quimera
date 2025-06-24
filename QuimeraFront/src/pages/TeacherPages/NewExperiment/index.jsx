import { Card, Row, Col } from "antd";
import { useState } from "react";
import { MdOutlineBiotech } from "react-icons/md";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Alert from "sweetalert2";

import Announcement from "./components/Announcement";

import Base from "@/components/BaseLayout";
import { postExperiment } from "@/services/routes/api/Experiment";

const experimentDescriptions = {
  "Variação de Água Corporal":
    "Este experimento tem como objetivo demonstrar como diferentes condições ambientais e fisiológicas podem impactar a variação da água corporal em animais. Através da simulação, os alunos poderão observar como diversos fatores influenciam diretamente o equilíbrio hídrico do organismo.",
  "Variação nos Níveis de Glicose Corporal":
    "Este experimento simula como diferentes fatores como jejum, alimentação, atividade física e alterações hormonais podem influenciar os níveis de glicose corporal. Por meio da atividade, os alunos poderão compreender os mecanismos fisiológicos envolvidos no controle da glicemia.",
};

const NewExperiment = () => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [description, setDescription] = useState("");
  const [experiment, setExperiment] = useState("");

  const idTeacher = localStorage.getItem("_idTeacher");

  const handleSearch = () => {
    if (experiment === "" || description === "") {
      Alert.fire({
        icon: "error",
        title: "Selecione um experimento!",
      });
    } else if (!searchName) {
      Alert.fire({
        icon: "error",
        title: "Insira um titulo no experimento!",
      });
    } else {
      try {
        const body = {
          title: experiment,
          titleActivity: searchName,
          description: description,
        };

        postExperiment(idTeacher, body).then((response) => {
          Alert.fire({
            icon: "success",
            title: "Experimento criado com sucesso!",
          }).finally(() => {
            navigate(
              `/experimentroom/${response.data.experiment._id}/${response.data.experiment.pin}`
            );
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Base
      goTo={"/search"}
      Icon={<MdOutlineBiotech />}
      goToName={"New experiment"}
      titlepage={"Crie um novo experimento"}
      children={
        <Row>
          <Col xs={24} xl={24}>
            <Card className="card-forms">
              <h4 className="center forms-title">
                Vamos começar outro experimento?
              </h4>
              <span className="center forms-description">
                Preencha o formulário abaixo para realizar um novo experimento
              </span>
              <label htmlFor="experiment" className="start label-input-forms">
                Título do experimento
              </label>
              <select
                id="experiment"
                name="experiment"
                className="select-forms"
                value={experiment}
                onChange={(e) => {
                  const selectedTitle = e.target.value;
                  setExperiment(selectedTitle);

                  // Buscar a descrição pelo título
                  const descricaoEncontrada =
                    experimentDescriptions[selectedTitle] || "";

                  setDescription(descricaoEncontrada);
                }}
              >
                <option value="">Selecione um experimento</option>
                {Object.keys(experimentDescriptions).map((titulo) => (
                  <option key={titulo} value={titulo}>
                    {titulo}
                  </option>
                ))}
              </select>
              <label
                htmlFor="search-description"
                className="start label-input-forms"
              >
                Breve descrição do seu experimento:
              </label>
              <textarea
                id="search-description"
                name="search-name"
                className="start input-forms"
                placeholder="Selecione um experimento"
                readOnly
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="search-name" className="start label-input-forms">
                Título da atividade:
              </label>
              <input
                id="search-name"
                name="search-name"
                className="start input-forms"
                placeholder="Ex: Experimento com a turma 5A"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => handleSearch()}
                  className="center btn-save"
                >
                  Save new experiment
                </button>
              </div>
              <Announcement />
            </Card>
          </Col>
        </Row>
      }
    />
  );
};
export default NewExperiment;
