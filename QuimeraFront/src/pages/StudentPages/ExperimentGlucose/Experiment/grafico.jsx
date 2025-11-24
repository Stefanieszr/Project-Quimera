import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceArea,
  Label,
} from "recharts";
import Swal from "sweetalert2";

const ExperimentGrafico = () => {
  const data = [
    { tempo: 0, glicemia: 90 },
    { tempo: 1, glicemia: 95 },
    { tempo: 2, glicemia: 120 },
    { tempo: 3, glicemia: 160 },
    { tempo: 4, glicemia: 200 },
    { tempo: 5, glicemia: 180 },
    { tempo: 6, glicemia: 140 },
    { tempo: 7, glicemia: 110 },
    { tempo: 8, glicemia: 115 },
    { tempo: 9, glicemia: 150 },
    { tempo: 10, glicemia: 190 },
  ];
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="tempo"
          label={{
            value: "Tempo",
            position: "insideBottom",
            offset: -10,
          }}
        />
        <YAxis
          label={{
            value: "Glicemia",
            angle: -90,
            position: "insideLeft",
            offset: 10,
          }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="glicemia"
          stroke="#000"
          strokeWidth={3}
          dot={false}
        />

        {/* Pontos de referência */}
        <ReferenceDot
          x={1}
          y={80}
          r={15}
          label={{
            value: "1",
            fill: "white",
          }}
          stroke="white"
          fill="#46cb37"
        />
        <ReferenceDot
          x={6}
          y={80}
          r={15}
          label={{
            value: "2",
            fill: "white",
          }}
          stroke="white"
          fill="#46cb37"
        />
        <ReferenceDot
          x={9}
          y={80}
          r={15}
          label={{
            value: "3",
            fill: "white",
          }}
          stroke="white"
          fill="#46cb37"
        />

        {/* Área de estresse */}
        <ReferenceArea
          x1={8}
          x2={9}
          y1={120}
          y2={140}
          fill="rgba(33, 150, 243, 0.5)"
        >
          <Label value="STRESS" position="insideTop" fill="white" />
        </ReferenceArea>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExperimentGrafico;
