import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./style.module.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  // NavLink için aktif class'ı belirleyen yardımcı fonksiyon
  const getLinkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Link to="/admin" className={styles.logo}>
          Admin Panel
        </Link>
        <nav className={styles.nav}>
          {/* Sadece tam olarak /admin'deyken aktif olması için 'end' ekliyoruz */}
          <NavLink end className={getLinkClass} to="/admin">
            home
          </NavLink>
          <NavLink end className={getLinkClass} to="/admin/projects">
            projects
          </NavLink>
          <NavLink className={getLinkClass} to="/admin/projects/create">
            new project
          </NavLink>
          <NavLink end className={getLinkClass} to="/admin/blogs">
            blogs
          </NavLink>
          <NavLink className={getLinkClass} to="/admin/blogs/new">
            new blog
          </NavLink>
        </nav>
        <button onClick={handleLogout} className={styles.logout_button}>
          logout
        </button>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
