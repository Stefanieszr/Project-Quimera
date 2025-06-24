import { Dropdown, Layout, Avatar, Space } from "antd";
import { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineDashboard, MdOutlineBiotech } from "react-icons/md";
import { RiUserHeartLine, RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";

import LogoHA from "@/assets/logoHA.png";
import TeacherContext from "@/context/Users/Teacher";

const { Header } = Layout;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const teacherContext = useContext(TeacherContext);

  const menu = {
    items: [
      {
        label: (
          <Link
            to="/loginTeacher"
            className="menu-item"
            onClick={teacherContext.logOut}
          >
            <RiLogoutCircleLine style={{ marginRight: 10 }} />
            Sair
          </Link>
        ),
        key: "1",
      },
    ],
  };
  const menuresponsive = {
    items: [
      {
        label: (
          <Link to="/dashboard" className="menu-item">
            <MdOutlineDashboard style={{ marginRight: 10 }} /> Dashboard
          </Link>
        ),
        key: "2",
      },
      {
        label: (
          <Link to="/search" className="menu-item">
            <MdOutlineBiotech style={{ marginRight: 10 }} /> Nova Pesquisa
          </Link>
        ),
        key: "3",
      },
      {
        label: (
          <Link
            to="/loginTeacher"
            className="menu-item"
            onClick={teacherContext.logOut}
          >
            <RiLogoutCircleLine style={{ marginRight: 10 }} />
            Sair
          </Link>
        ),
        key: "4",
      },
    ],
  };

  return (
    <>
      <Header className="header-content">
        <img
          src={LogoHA}
          name="logo"
          alt="logo"
          className="logo-header"
          onClick={() => navigate("/dashboard")}
        />
        <button
          className="buttonDashboard"
          onClick={() => navigate("/dashboard")}
        >
          <MdOutlineDashboard style={{ marginRight: 10, fontSize: 20 }} />
          Dashboard
        </button>
        <button className="buttonDashboard" onClick={() => navigate("/search")}>
          <MdOutlineBiotech style={{ marginRight: 10, fontSize: 20 }} />
          New Experiment
        </button>
        <Dropdown menu={menu} className="dropwdown">
          <Space>
            <Avatar
              size={40}
              className="Avatar-header"
              icon={<RiUserHeartLine />}
            />
          </Space>
        </Dropdown>
        <Dropdown menu={menuresponsive} className="dropwdown-responsive">
          <Space>
            <AiOutlineMenu />
          </Space>
        </Dropdown>
      </Header>
    </>
  );
};

export default HeaderComponent;
