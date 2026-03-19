import React, { useState } from "react";
import styles from "./style.module.css";
import { supabase } from "@/utils/supabase";
import UICheckbox from "@/ui/checkbox/UICheckbox";
import UiInput from "@/ui/input/UiInput";

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
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: false });
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>yeni proje ekle</div>
        <div className={styles.desc}>projeyi doğrudan supabase'e kaydet.</div>
      </header>

      {status.error && (
        <div
          style={{
            color: "red",
            padding: "10px",
            border: "1px solid red",
            marginBottom: "1rem",
          }}
        >
          {status.error}
        </div>
      )}
      {status.success && (
        <div
          style={{
            color: "green",
            padding: "10px",
            border: "1px solid green",
            marginBottom: "1rem",
          }}
        >
          Proje başarıyla eklendi.
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* TEMEL BİLGİLER */}
        <div className={styles.form_section}>
          <div className={styles.form_section_header}>
            <h3 className={styles.section_title}>temel bilgiler</h3>
            <p className={styles.desc}>
              proje hakkında temel bilgileri burada doldurunuz.
            </p>
          </div>
          <div className={styles.form_section_content}>
            <div className={styles.input_group}>
              <label htmlFor="project_name" className={styles.label}>
                PROJE ADI
              </label>
              <UiInput
                type="text"
                name="project_name"
                placeholder="Proje Adı"
                onChange={handleInputChange}
                required={true}
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="slug" className={styles.label}>
                SLUG
              </label>
              <UiInput
                type="text"
                name="slug"
                placeholder="Slug (örn: skynotech)"
                onChange={handleInputChange}
                required={true}
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="company_name" className={styles.label}>
                FİRMA ADI
              </label>
              <UiInput
                type="text"
                name="company_name"
                placeholder="Şirket Adı"
                onChange={handleInputChange}
                required={true}
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="tags" className={styles.label}>
                ETİKETLER
              </label>
              <UiInput
                type="text"
                name="tags"
                placeholder="Etiketler (Virgülle ayırın: React, Supabase)"
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="banner" className={styles.label}>
                BANNER FOTOĞRAFI
              </label>
              <UiInput
                type="file"
                name="banner"
                onChange={handleInputChange}
                accept="image/*"
                required={true}
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="sort_order" className={styles.label}>
                SIRALAMA DEĞERİ
              </label>
              <UiInput
                type="number"
                name="sort_order"
                placeholder="Sıralama Değeri"
                onChange={handleInputChange}
                required={true}
              />
            </div>
            <div className={styles.checkbox_input_group}>
              <label className={styles.checkbox_label}>AKTİFLİK DURUMU</label>
              <UICheckbox
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <hr />

        {/* TÜRKÇE İÇERİK */}
        <div className={styles.form_section}>
          <div className={styles.form_section_header}>
            <h3 className={styles.section_title}>türkçe içerik</h3>
            <p className={styles.desc}>
              projenin türkçe metinlerini buraya giriniz.
            </p>
          </div>
          <div className={styles.form_section_content}>
            <div className={styles.input_group}>
              <label htmlFor="type_tr" className={styles.label}>
                PROJE TİPİ
              </label>
              <UiInput
                type="text"
                name="type_tr"
                placeholder="Proje Tipi (örn: Profesyonel)"
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="role_tr" className={styles.label}>
                ROLÜN
              </label>
              <UiInput
                type="text"
                name="role_tr"
                placeholder="Rolün"
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="desc_tr" className={styles.label}>
                KISA AÇIKLAMA
              </label>
              <textarea
                name="desc_tr"
                placeholder="Kısa Açıklama"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className={styles.input_group}>
              <label htmlFor="fulloverview_tr" className={styles.label}>
                TAM İNCELEME
              </label>
              <textarea
                name="fulloverview_tr"
                placeholder="Proje Tam İncelemesi"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className={styles.input_group}>
              <label htmlFor="conclusion_tr" className={styles.label}>
                SONUÇ / KAPANIŞ
              </label>
              <textarea
                name="conclusion_tr"
                placeholder="Sonuç / Kapanış"
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>

        <hr />

        {/* İNGİLİZCE İÇERİK */}
        <div className={styles.form_section}>
          <div className={styles.form_section_header}>
            <h3 className={styles.section_title}>ingilizce içerik</h3>
            <p className={styles.desc}>
              projenin ingilizce metinlerini buraya giriniz.
            </p>
          </div>
          <div className={styles.form_section_content}>
            <div className={styles.input_group}>
              <label htmlFor="type_en" className={styles.label}>
                PROJECT TYPE
              </label>
              <UiInput
                type="text"
                name="type_en"
                placeholder="Project Type"
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="role_en" className={styles.label}>
                ROLE
              </label>
              <UiInput
                type="text"
                name="role_en"
                placeholder="Role"
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="desc_en" className={styles.label}>
                SHORT DESCRIPTION
              </label>
              <textarea
                name="desc_en"
                placeholder="Short Description"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className={styles.input_group}>
              <label htmlFor="fulloverview_en" className={styles.label}>
                FULL OVERVIEW
              </label>
              <textarea
                name="fulloverview_en"
                placeholder="Full Overview"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className={styles.input_group}>
              <label htmlFor="conclusion_en" className={styles.label}>
                CONCLUSION
              </label>
              <textarea
                name="conclusion_en"
                placeholder="Conclusion"
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>

        <hr />

        {/* BAŞARILAR */}
        <div className={styles.form_section}>
          <div className={styles.form_section_header}>
            <h3 className={styles.section_title}>başarılar (achievements)</h3>
            <p className={styles.desc}>
              projeye ait metrik ve istatistikleri buradan ekleyiniz.
            </p>
          </div>
          <div className={styles.form_section_content}>
            {achievements.map((ach, i) => (
              <div key={i} className={styles.dynamic_box}>
                <div className={styles.input_group}>
                  <label className={styles.label}>NUMARA / İSTATİSTİK</label>
                  <UiInput
                    type="text"
                    placeholder="örn: %150"
                    value={ach.number}
                    onChange={(e) =>
                      updateAchievement(i, "number", e.target.value)
                    }
                  />
                </div>
                <div className={styles.dynamic_row}>
                  <div className={styles.input_group}>
                    <label className={styles.label}>BAŞLIK (TR)</label>
                    <UiInput
                      type="text"
                      placeholder="Başlık (TR)"
                      value={ach.title_tr}
                      onChange={(e) =>
                        updateAchievement(i, "title_tr", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.input_group}>
                    <label className={styles.label}>TITLE (EN)</label>
                    <UiInput
                      type="text"
                      placeholder="Title (EN)"
                      value={ach.title_en}
                      onChange={(e) =>
                        updateAchievement(i, "title_en", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className={styles.dynamic_row}>
                  <div className={styles.input_group}>
                    <label className={styles.label}>AÇIKLAMA (TR)</label>
                    <textarea
                      placeholder="Açıklama (TR)"
                      value={ach.desc_tr}
                      onChange={(e) =>
                        updateAchievement(i, "desc_tr", e.target.value)
                      }
                    ></textarea>
                  </div>
                  <div className={styles.input_group}>
                    <label className={styles.label}>DESCRIPTION (EN)</label>
                    <textarea
                      placeholder="Description (EN)"
                      value={ach.desc_en}
                      onChange={(e) =>
                        updateAchievement(i, "desc_en", e.target.value)
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addAchievement}
              style={{ padding: "10px", cursor: "pointer" }}
            >
              + Başarı Ekle
            </button>
          </div>
        </div>

        <hr />

        {/* GALERİ */}
        <div className={styles.form_section}>
          <div className={styles.form_section_header}>
            <h3 className={styles.section_title}>proje galerisi</h3>
            <p className={styles.desc}>
              projeye ait detay görsellerini buradan ekleyiniz.
            </p>
          </div>
          <div className={styles.form_section_content}>
            {gallery.map((item, i) => (
              <div
                key={i}
                className={styles.dynamic_box}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginBottom: "15px",
                }}
              >
                <div className={styles.input_group} style={{ flex: 1 }}>
                  <label className={styles.label}>GÖRSEL SEÇ</label>
                  <UiInput
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      updateGallery(i, "file", e.target.files[0])
                    }
                  />
                </div>
                <div
                  className={styles.checkbox_input_group}
                  style={{ flex: 1 }}
                >
                  <label className={styles.checkbox_label}>
                    GENİŞ GÖRSEL (ISWIDE)
                  </label>
                  <UICheckbox
                    checked={item.isWide}
                    onChange={(e) =>
                      updateGallery(i, "isWide", e.target.checked)
                    }
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addGalleryImage}
              style={{ padding: "10px", cursor: "pointer" }}
            >
              + Görsel Ekle
            </button>
          </div>
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
            marginTop: "20px",
          }}
        >
          {status.loading ? "Kaydediliyor..." : "Projeyi Kaydet"}
        </button>
      </form>
    </div>
  );
}
