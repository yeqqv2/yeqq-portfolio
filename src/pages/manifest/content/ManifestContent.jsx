import ManifestArc from "@/pages/manifest/arc/ManifestArc";
import CostOfOrder from "@/pages/manifest/cost/CostOfOrder";
import WeightOfChoice from "@/pages/manifest/choice/WeightOfChoice";
import ObserverEffect from "@/pages/manifest/observer/ObserverEffect";
import TheDichotomy from "@/pages/manifest/dichotomy/TheDichotomy";
import AsymmetryOfLoss from "@/pages/manifest/assymetry/AsymmetryOfLoss";
import HandshakeProtocol from "@/pages/manifest/contact/HandshakeProtocol";
import ManifestProgress from "@/pages/manifest/progress/ManifestProgress";
import SmoothReveal from "@/components/smooth reveal/SmoothReveal";
import styles from "./style.module.css";

export default function ManifestContent() {
  return (
    <div className={styles.container}>
      <ManifestProgress />

      <SmoothReveal>
        <section data-manifest-section className={styles.section}>
          <ManifestArc />
        </section>
      </SmoothReveal>

      <SmoothReveal>
        <section data-manifest-section className={styles.section}>
          <ObserverEffect />
        </section>
      </SmoothReveal>

      <SmoothReveal>
        <section data-manifest-section className={styles.section}>
          <CostOfOrder />
        </section>
      </SmoothReveal>

      <SmoothReveal>
        <section data-manifest-section className={styles.section}>
          <TheDichotomy />
        </section>
      </SmoothReveal>

      <SmoothReveal>
        <section data-manifest-section className={styles.section}>
          <WeightOfChoice />
        </section>
      </SmoothReveal>

      <SmoothReveal>
        <section data-manifest-section className={styles.section}>
          <AsymmetryOfLoss />
        </section>
      </SmoothReveal>

      <SmoothReveal>
        <section data-manifest-section className={styles.section}>
          <HandshakeProtocol />
        </section>
      </SmoothReveal>
    </div>
  );
}
