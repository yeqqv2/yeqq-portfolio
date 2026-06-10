import works from "@/utils/projects";

// Proje verisi artık tamamen statik (src/utils/projects.js).
// Supabase/react-query yok; bileşenlerin beklediği arayüzü koruyoruz.
export const useProjects = () => {
  return { data: works, isLoading: false, isError: false, error: null };
};
