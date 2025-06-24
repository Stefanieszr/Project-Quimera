import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/Home";
import ClinicCaseTemperature from "@/pages/StudentPages/ExperimentGlucose/ClinicCase";
import ExperimentTemperature from "@/pages/StudentPages/ExperimentGlucose/Experiment";
import IntroductionTemperature from "@/pages/StudentPages/ExperimentGlucose/Introduction";
import ClinicCaseWater from "@/pages/StudentPages/ExperimentWater/ClinicCase";
import Experiment from "@/pages/StudentPages/ExperimentWater/Experiment";
import IntroductionWater from "@/pages/StudentPages/ExperimentWater/Introduction";
import LoginPin from "@/pages/StudentPages/LoginPin";
import WaitingRoom from "@/pages/StudentPages/WaitingRoom";
import ExperimentRoom from "@/pages/TeacherPages/ExperimentRoom";
import ForgotPassword from "@/pages/TeacherPages/ForgotPassword";
import Home from "@/pages/TeacherPages/Home";
import ExperimentDetailsTeacher from "@/pages/TeacherPages/Home/experimentDetails/experimentDetails";
import Login from "@/pages/TeacherPages/Login";
import NewExperiment from "@/pages/TeacherPages/NewExperiment";
import Profile from "@/pages/TeacherPages/Profile";
import Register from "@/pages/TeacherPages/Register";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/teste" element={<h1>Testando rota!</h1>} />
      <Route path="/" element={<HomePage />} />
      <Route path="/loginPin" element={<LoginPin />} />
      <Route path="/loginTeacher" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/experiment/:pin" element={<Experiment />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/search" element={<NewExperiment />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/waitingroom/:tipo/:pin" element={<WaitingRoom />} />
      <Route
        path="/experimentroom/:idValue/:pinValue"
        element={<ExperimentRoom />}
      />
      <Route
        path="/experimentdetails/:id"
        element={<ExperimentDetailsTeacher />}
      />
      <Route path="/cliniccasewater/:pin" element={<ClinicCaseWater />} />
      <Route path="/introductionwater/:pin" element={<IntroductionWater />} />
      <Route
        path="/experimentGlucose/:pin"
        element={<ExperimentTemperature />}
      />
      <Route
        path="/cliniccaseGlucose/:pin"
        element={<ClinicCaseTemperature />}
      />
      <Route
        path="/introductionGlucose/:pin"
        element={<IntroductionTemperature />}
      />
    </Routes>
  );
};

export default RoutesComponent;
