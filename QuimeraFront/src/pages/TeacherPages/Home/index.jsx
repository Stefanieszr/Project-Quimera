import { SearchOutlined } from "@ant-design/icons";
import { Table, Button, Card, Input, DatePicker } from "antd";
import Base from "components/BaseLayout";
import moment from "moment";
import React from "react";
import { useCallback } from "react";
import { BsTrash, BsEye } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  findExperiments,
  deleteExperiment,
} from "services/routes/api/Experiment";
import Swal from "sweetalert2";
import { formatDate } from "utils/formats";

import styles from "./styles.module.css";


const Home = () => {
  const navigate = useNavigate();
  const [experiments, setExperiments] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [filteredExperiments, setFilteredExperiments] = React.useState([]);

  const idTeacher = localStorage.getItem("_idTeacher");

  const fetchExperiments = React.useCallback(async () => {
    try {
      await findExperiments(idTeacher).then((response) => {
        setExperiments(response.data.experiments);
        console.log(response.data.experiments);
        return response.data.experiments;
      });
    } catch (err) {
      console.error(err);
    }
  }, [idTeacher]);

  React.useEffect(() => {
    fetchExperiments();
  }, [fetchExperiments]);

  // Função que deleta um experimento
  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Tem certeza que deseja deletar este experimento?",
        text: "Essa ação não pode ser desfeita.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteExperiment(id).then(() => {
            Swal.fire({
              icon: "success",
              title: "Experimento deletado com sucesso!",
            }).then(() => {
              fetchExperiments();
            });
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "PIN",
      dataIndex: "pin",
      key: "pin",
    },
    {
      title: "Título do Experimento",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Título da Atividade",
      dataIndex: "titleActivity",
      key: "title",
    },
    {
      title: "Data de Criação",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => formatDate(createdAt),
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className={styles.styleButtonsTable}>
          <Button
            className={styles.btnHomeTable}
            onClick={() => navigate(`/experimentdetails/${record._id}`)}
          >
            <BsEye />
          </Button>
          <Button
            danger
            className={styles.btnHomeTable}
            onClick={() => handleDelete(record._id)}
          >
            <BsTrash />
          </Button>
        </div>
      ),
    },
  ];

  const handleSearch = useCallback(() => {
    if (!searchText && !selectedDate) {
      setFilteredExperiments(experiments);
      return;
    }

    const filteredByTitle = experiments.filter((experiment) =>
      experiment.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const filteredByDateAndTitle = selectedDate
      ? filteredByTitle.filter((experiment) => {
          const createdAtDate = moment(experiment.createdAt);
          return createdAtDate.isSame(selectedDate, "day");
        })
      : filteredByTitle;

    setFilteredExperiments(filteredByDateAndTitle);
  }, [searchText, selectedDate, experiments, setFilteredExperiments]);

  React.useEffect(() => {
    fetchExperiments();
    handleSearch();
  }, [fetchExperiments, handleSearch]);

  const atualDateinPortuguese = new Date().toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
  return (
    <>
      <Base
        goTo={"/dashboard"}
        Icon={<MdOutlineDashboard />}
        goToName={"Dashboard"}
        titlepage={"Dashboard"}
        // nameofuser={response?.name}
        children={
          <div className={styles.CardsDiv}>
            <Card className={styles.pageCardHome}>
              <div>
                <h3 className={styles.titleCardHome}>
                  Tabela com todos os experimentos
                </h3>
              </div>
              <div className={styles.divInputsSearch}>
                <Input
                  placeholder="Search"
                  className={styles.inputSearch}
                  prefix={<SearchOutlined className={styles.iconSearch} />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onPressEnter={() => handleSearch()}
                />
                <DatePicker
                  placeholder={atualDateinPortuguese}
                  className={styles.inputSearch}
                  onChange={(date) => {
                    setSelectedDate(date);
                    handleSearch();
                  }}
                />
              </div>
              <div
                className={styles.tableHome}
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <Table
                  columns={columns}
                  dataSource={filteredExperiments}
                  rowKey="_id"
                  style={{ width: "100%" }}
                />
              </div>
            </Card>
          </div>
        }
      />
    </>
  );
};

export default Home;
