import { Card, Button } from "antd";
import { AiOutlineExperiment } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { MdOutlineBiotech } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";

import styles from "./styles.module.css";

import Base from "@/components/BaseLayoutStudent";

const IntroductionTemperature = () => {
  const { pin } = useParams();
  const navigate = useNavigate();
  const storedName = localStorage.getItem("name");
  const navigateToClinicCase = () => {
    navigate(`/cliniccaseGlucose/${pin}`);
  };
  const data = [
    { tempo: -4, glicemia: 0 },
    { tempo: 0, glicemia: 0 },
    { tempo: 4, glicemia: -2 },
    { tempo: 8, glicemia: -6 },
    { tempo: 12, glicemia: -11 },
    { tempo: 16, glicemia: -5 },
    { tempo: 20, glicemia: -1 },
    { tempo: 24, glicemia: 0 },
  ];
  return (
    <Base
      goTo={"/"}
      Icon={<MdOutlineBiotech />}
      goToName={`Introdução a matéria de glicemia: Sala ${pin}`}
      titlepage={`CONTROLE DA GLICEMIA para "QUIMERA"`}
      descriptionPage={`A glicemia é a quantidade de glicose presente no plasma sanguíneo
              e representa um dos parâmetros mais importantes no organismo
              animal. O corpo precisa manter essa taxa em equilíbrio para
              garantir energia sem causar excesso de açúcar no sangue.`}
      nameofuser={storedName}
      children={
        <Card className={styles.cardIntroduction}>
          <div className={styles.divTextsintro}>
            <span className={styles.textSpan}>
              Após a alimentação, principalmente quando há consumo de
              carboidratos, a concentração de glicose no sangue aumenta. Nesse
              momento ocorre a liberação de <b>insulina</b>, que promove a
              redução da glicemia.{" "}
              <i>(veja no gráfico a queda após a alimentação)</i>. No sentido
              oposto, o <b>glucagon</b> atua elevando os níveis de glicose
              sanguínea. Situações como exercício físico, estresse ou o simples
              passar do tempo após uma refeição tendem a reduzir a glicemia de
              forma natural{" "}
              <i>
                (observe a curva subindo no gráfico quando a glicose está baixa)
              </i>
              . Outros hormônios também participam desse controle. A
              <b> adrenalina</b> aumenta a glicemia em situações de resposta
              rápida <i>(gráfico mostra pico instantâneo)</i> e o{" "}
              <b>cortisol</b> também contribui para a elevação dos níveis de
              glicose <i>(gráfico mostra pico instantâneo)</i>.
            </span>

            {/* Seção de Gráfico */}
            <section className={styles.sectionGraph}>
              <h3>
                Gráfico que exemplifica a elevação da glicemia após a refeição
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data}
                  margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="tempo"
                    tick={{ fontSize: 10, fill: "#3c3c3c" }}
                    label={{
                      value: "Tempo (minutos)",
                      position: "insideBottom",
                      offset: -5,
                      style: { fontSize: 12 },
                    }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#3c3c3c" }}
                    label={{
                      value: "Glicemia (% alteração)",
                      angle: -90,
                      offset: 10,
                      position: "insideLeft",
                      style: { fontSize: 12 },
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="glicemia"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />

                  {/* Área sombreada: Ingestão de alimento */}
                  <ReferenceArea
                    x1={12}
                    x2={24}
                    strokeOpacity={0}
                    fill="rgba(255, 165, 0, 0.3)"
                    label={{
                      value: "Após refeição",
                      style: { fontSize: 10, whiteSpace: "pre-line" },
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </section>

            <section>
              <h3>Intensidade Relativa dos Hormônios sobre a Glicemia</h3>
              <p className={styles.textSpan}>
                Para organizar melhor essa informação, ranking dos hormônios com
                base no efeito que cada um exerce sobre a glicemia.
              </p>
              <table className={styles.rankingTable}>
                <thead>
                  <tr>
                    <th>Hormônio</th>
                    <th>Efeito na glicemia</th>
                    <th>Observação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.hormoneName}>INSULINA ⬇️</td>
                    <td>Reduz a glicose no sangue</td>
                    <td>Principal hormônio</td>
                  </tr>
                  <tr>
                    <td className={styles.hormoneName}>GLUCAGON ⬆️</td>
                    <td>Aumenta a glicose</td>
                    <td>Liberação rápida em jejum</td>
                  </tr>
                  <tr>
                    <td className={styles.hormoneName}>ADRENALINA ⬆️</td>
                    <td>Aumenta rapidamente</td>
                    <td>Responde a situações de alerta ou estresse</td>
                  </tr>
                  <tr>
                    <td className={styles.hormoneName}>CORTISOL ⬆️</td>
                    <td>Aumenta glicemia</td>
                    <td>Estresse prolongado</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>

          <div className={styles.divButtonIntro}>
            <h1 className={styles.titleIntro}>
              Estude o caso clínico e realize uma discussão em grupo antes de
              iniciar o experimento.
            </h1>
            <div className={styles.divButtonsIntro}>
              <Button
                className={`${styles.btnIntro} ${styles.Yellow}`}
                type="primary"
                onClick={navigateToClinicCase}
              >
                <BsBook />
                Caso clínico
              </Button>
            </div>
          </div>
        </Card>
      }
    />
  );
};
export default IntroductionTemperature;
