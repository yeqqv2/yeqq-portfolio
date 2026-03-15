import ManifestContent from "@/pages/manifest/content/ManifestContent";
import ManifestHeader from "@/pages/manifest/header/ManifestHeader";
import styles from "./style.module.css";

export default function ManifestPage() {
  return (
    <div className={styles.container}>
      <ManifestHeader />
      <ManifestContent />
    </div>
  );
}
