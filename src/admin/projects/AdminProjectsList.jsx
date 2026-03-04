import React from "react";
import styles from "./style.module.css";
import Table from "../../components/table/Table";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

export default function AdminProjectsList() {
  const mockProjects = [
    {
      id: 1,
      name: "Skynotech Smart Site",
      company: "Skynotech",
      type: "professional",
    },
    {
      id: 2,
      name: "Balıkesir İstihdam",
      company: "Büyükşehir Belediyesi",
      type: "professional",
    },
  ];

  const projectColumns = [
    {
      header: "project name",
      accessor: "name",
    },
    {
      header: "company",
      accessor: "company",
    },
    {
      header: "type",
      accessor: "type",
    },
    {
      header: "actions",
      render: (row) => (
        <div style={{ display: "flex", gap: ".5em" }}>
          <button className={styles.act_btn}>
            <FiEdit2 />
          </button>
          <button className={styles.act_btn}>
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>welcome yunus emre</div>
        <div className={styles.desc}>
          burada bugüne kadar yaptığın bütün projeleri & öğrendiğin bütün
          bilgileri görüntüleyebilirsin.
        </div>
      </div>
      <div className={styles.main}>
        <Table columns={projectColumns} data={mockProjects} />
      </div>
    </div>
  );
}
