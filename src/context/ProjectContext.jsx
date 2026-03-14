import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { supabase } from "@/utils/supabase";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;

        setProjects(data || []);
      } catch (err) {
        console.error("Projeler çekilirken hata oluştu:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const contextValue = useMemo(
    () => ({ projects, loading }),
    [projects, loading],
  );

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
