import React, { useState } from "react";
import styles from "./style.module.css";
import { supabase } from "@/utils/supabase";

export default function ProjectCreate() {
  const [formData, setFormData] = useState({
    project_name: "",
    slug: "",
    company_name: "",
    is_active: true,
    sort_order: 0,
    tags: "",
    banner: null,
    desc_tr: "",
    role_tr: "",
    type_tr: "",
    fulloverview_tr: "",
    conclusion_tr: "",
    desc_en: "",
    role_en: "",
    type_en: "",
    fulloverview_en: "",
    conclusion_en: "",
  });

  const [achievements, setAchievements] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addAchievement = () => {
    setAchievements([
      ...achievements,
      { number: "", title_tr: "", title_en: "", desc_tr: "", desc_en: "" },
    ]);
  };

  const updateAchievement = (index, field, value) => {
    const newArr = [...achievements];
    newArr[index][field] = value;
    setAchievements(newArr);
  };

  const addGalleryImage = () => {
    setGallery([...gallery, { file: null, isWide: false }]);
  };

  const updateGallery = (index, field, value) => {
    const newArr = [...gallery];
    newArr[index][field] = value;
    setGallery(newArr);
  };

  const uploadFile = async (file, pathPrefix) => {
    if (!file) return null;
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${pathPrefix}/${fileName}`;

    const { error } = await supabase.storage
      .from("portfolio-images")
      .upload(filePath, file);
    if (error) throw new Error(`Görsel yüklenemedi: ${error.message}`);

    return filePath;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      let banner_url = null;
      if (formData.banner) {
        banner_url = await uploadFile(
          formData.banner,
          `banners/${formData.slug}`,
        );
      }

      const uploadedGallery = [];
      for (const item of gallery) {
        if (item.file) {
          const path = await uploadFile(item.file, `gallery/${formData.slug}`);
          uploadedGallery.push({ file: path, isWide: item.isWide });
        }
      }

      const payload = {
        project_name: formData.project_name,
        slug: formData.slug,
        company_name: formData.company_name,
        is_active: formData.is_active,
        sort_order: Number(formData.sort_order),
        banner_url,
        tags: formData.tags
          ? formData.tags.split(",").map((t) => t.trim())
          : [],
        desc_tr: formData.desc_tr,
        desc_en: formData.desc_en,
        role_tr: formData.role_tr,
        role_en: formData.role_en,
        type_tr: formData.type_tr,
        type_en: formData.type_en,
        fulloverview_tr: formData.fulloverview_tr,
        fulloverview_en: formData.fulloverview_en,
        conclusion_tr: formData.conclusion_tr,
        conclusion_en: formData.conclusion_en,
        achievements,
        images: uploadedGallery,
      };

      const { error } = await supabase.from("projects").insert([payload]);

      if (error) throw new Error(`Veritabanı hatası: ${error.message}`);

      setStatus({ loading: false, error: null, success: true });
      // İsteğe bağlı: Formu temizleme veya listeye yönlendirme eklenebilir.
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: false });
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>Yeni Proje Ekle</div>
        <div className={styles.desc}>Projeyi doğrudan Supabase'e kaydet.</div>
      </header>

      {status.error && (
        <div style={{ color: "red", padding: "10px", border: "1px solid red" }}>
          {status.error}
        </div>
      )}
      {status.success && (
        <div
          style={{ color: "green", padding: "10px", border: "1px solid green" }}
        >
          Proje başarıyla eklendi.
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form_section}>
          <h3>Temel Bilgiler</h3>
          <input
            type="text"
            name="project_name"
            placeholder="Proje Adı"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug (örn: skynotech)"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="company_name"
            placeholder="Şirket Adı"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="tags"
            placeholder="Etiketler (Virgülle ayırın: React, Supabase)"
            onChange={handleInputChange}
          />

          <label>Kapak Resmi (Banner):</label>
          <input
            type="file"
            name="banner"
            onChange={handleInputChange}
            accept="image/*"
            required
          />

          <label>
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleInputChange}
            />
            Aktif (Sitede görünsün)
          </label>
          <input
            type="number"
            name="sort_order"
            placeholder="Sıralama Değeri"
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.form_section}>
          <h3>Türkçe İçerik</h3>
          <input
            type="text"
            name="type_tr"
            placeholder="Proje Tipi (örn: Profesyonel)"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="role_tr"
            placeholder="Rolün"
            onChange={handleInputChange}
          />
          <textarea
            name="desc_tr"
            placeholder="Kısa Açıklama"
            onChange={handleInputChange}
          ></textarea>
          <textarea
            name="fulloverview_tr"
            placeholder="Proje Tam İncelemesi"
            onChange={handleInputChange}
          ></textarea>
          <textarea
            name="conclusion_tr"
            placeholder="Sonuç / Kapanış"
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className={styles.form_section}>
          <h3>İngilizce İçerik</h3>
          <input
            type="text"
            name="type_en"
            placeholder="Project Type"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="role_en"
            placeholder="Role"
            onChange={handleInputChange}
          />
          <textarea
            name="desc_en"
            placeholder="Short Description"
            onChange={handleInputChange}
          ></textarea>
          <textarea
            name="fulloverview_en"
            placeholder="Full Overview"
            onChange={handleInputChange}
          ></textarea>
          <textarea
            name="conclusion_en"
            placeholder="Conclusion"
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* BAŞARILAR (ACHIEVEMENTS) */}
        <div className={styles.form_section}>
          <h3>Başarılar (Achievements)</h3>
          {achievements.map((ach, i) => (
            <div key={i} className={styles.dynamic_box}>
              <input
                type="text"
                placeholder="Numara / İstatistik (örn: %150)"
                value={ach.number}
                onChange={(e) => updateAchievement(i, "number", e.target.value)}
              />
              <div className={styles.dynamic_row}>
                <input
                  type="text"
                  placeholder="Başlık (TR)"
                  value={ach.title_tr}
                  onChange={(e) =>
                    updateAchievement(i, "title_tr", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Title (EN)"
                  value={ach.title_en}
                  onChange={(e) =>
                    updateAchievement(i, "title_en", e.target.value)
                  }
                />
              </div>
              <div className={styles.dynamic_row}>
                <textarea
                  placeholder="Açıklama (TR)"
                  value={ach.desc_tr}
                  onChange={(e) =>
                    updateAchievement(i, "desc_tr", e.target.value)
                  }
                ></textarea>
                <textarea
                  placeholder="Description (EN)"
                  value={ach.desc_en}
                  onChange={(e) =>
                    updateAchievement(i, "desc_en", e.target.value)
                  }
                ></textarea>
              </div>
            </div>
          ))}
          <button type="button" onClick={addAchievement}>
            + Başarı Ekle
          </button>
        </div>

        <div className={styles.form_section}>
          <h3>Proje Galerisi</h3>
          {gallery.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => updateGallery(i, "file", e.target.files[0])}
              />
              <label>
                <input
                  type="checkbox"
                  checked={item.isWide}
                  onChange={(e) => updateGallery(i, "isWide", e.target.checked)}
                />
                Geniş Görsel (isWide)
              </label>
            </div>
          ))}
          <button type="button" onClick={addGalleryImage}>
            + Görsel Ekle
          </button>
        </div>

        <button
          type="submit"
          disabled={status.loading}
          style={{
            padding: "15px",
            cursor: status.loading ? "not-allowed" : "pointer",
            background: "#fff",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          {status.loading ? "Kaydediliyor..." : "Projeyi Kaydet"}
        </button>
      </form>
    </div>
  );
}
