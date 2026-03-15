import ManifestArc from "@/pages/manifest/arc/ManifestArc";
import CostOfOrder from "@/pages/manifest/cost/CostOfOrder";
import WeightOfChoice from "@/pages/manifest/choice/WeightOfChoice";
import ObserverEffect from "@/pages/manifest/observer/ObserverEffect";
import TheDichotomy from "@/pages/manifest/dichotomy old/TheDichotomy";
import AsymmetryOfLoss from "@/pages/manifest/assymetry/AsymmetryOfLoss";
import HandshakeProtocol from "@/pages/manifest/contact/HandshakeProtocol";
import styles from "./style.module.css";

export default function ManifestContent() {
  return (
    <div className={styles.container}>
      <ManifestArc />
      <hr />
      <ObserverEffect />
      <hr />
      <CostOfOrder />
      <hr />
      <TheDichotomy />
      <hr />
      <WeightOfChoice />
      <hr />
      <AsymmetryOfLoss />
      <hr />
      <HandshakeProtocol />
    </div>
  );
}
