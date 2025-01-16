import React from "react";
import styles from "./style.module.css";

// Tüm verileri tek bir array içerisine toplayabilirsiniz
const skillData = [
  {
    title: "BACKEND",
    skills: [
      { title: "Node.js", img: "/assets/svg/nodejs.svg" },
      { title: "Express", img: "/assets/svg/express.svg" },
      { title: "NestJS", img: "/assets/svg/nestjs.svg" },
      { title: "Python", img: "/assets/svg/python.svg" },
      { title: "C#", img: "/assets/svg/csharp.svg" },
      { title: ".Net", img: "/assets/svg/dotnet.svg" },
      { title: ".Net Core", img: "/assets/svg/dotnetcore.svg" },
    ],
  },
  {
    title: "FRONTEND",
    skills: [
      { title: "Javascript", img: "/assets/svg/javascript.svg" },
      { title: "Ajax", img: "/assets/svg/ajax.svg" },
      { title: "JQuery", img: "/assets/svg/jquery.svg" },
      { title: "React", img: "/assets/svg/react.svg" },
      { title: "Vue", img: "/assets/svg/vue.svg" },
      { title: "Angular", img: "/assets/svg/angular.svg" },
      { title: "Bootstrap", img: "/assets/svg/bootstrap.svg" },
      { title: "Tailwind CSS", img: "/assets/svg/tailwindcss.svg" },
      { title: "SASS", img: "/assets/svg/sass.svg" },
    ],
  },
  {
    title: "DATABASE",
    skills: [
      { title: "MSSQL", img: "/assets/svg/mssql.svg" },
      { title: "MySQL", img: "/assets/svg/mysql.svg" },
      { title: "PostgreSQL", img: "/assets/svg/postgresql.svg" },
      { title: "MongoDB", img: "/assets/svg/mongodb.svg" },
      { title: "SQLite", img: "/assets/svg/sqlite.svg" },
    ],
  },
  {
    title: "TOOLS",
    skills: [
      { title: "Git", img: "/assets/svg/git.svg" },
      { title: "GitLab", img: "/assets/svg/gitlab.svg" },
      { title: "GitHub", img: "/assets/svg/github.svg" },
      { title: "Postman", img: "/assets/svg/postman.svg" },
      { title: "Swagger", img: "/assets/svg/swagger.svg" },
      { title: "Atlassian Tools", img: "/assets/svg/atlassian.svg" },
      { title: "VS", img: "/assets/svg/visual-studio.svg" },
      { title: "VSCode", img: "/assets/svg/vscode.svg" },
    ],
  },
];

const WelcomeSec = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header_title}>SKILLS & TOOLS</div>
        <div className={styles.header_desc}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam autem
          facere, officia, labore aut eaque iure natus dolores ut eligendi
          blanditiis quos tenetur optio tempora accusantium dolore possimus qui!
          Ad, provident similique quibusdam dolor reiciendis unde, natus modi
          totam ipsam minus dolorum officia commodi ipsum, magnam aliquam quam
          aliquid aperiam.
        </div>
      </header>
      <hr />
      <main className={styles.main}>
        {skillData.map((group) => (
          <div className={styles.list} key={group.title}>
            <div className={styles.list_title}>{group.title}</div>
            <ul className={styles.ul}>
              {group.skills.map((skill) => (
                <li className={styles.li} key={skill.title}>
                  <img
                    src={skill.img}
                    alt={skill.title}
                    className={styles.skillImage}
                  />
                  <span className={styles.skill_title}>{skill.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </section>
  );
};

export default WelcomeSec;
