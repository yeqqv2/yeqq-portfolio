import ManifestArc from "./arc/ManifestArc";
import AsymmetryOfLoss from "./assymetry/AsymmetryOfLoss";
import WeightOfChoice from "./choice/WeightOfChoice";
import HandshakeProtocol from "./contact/HandshakeProtocol";
import CostOfOrder from "./cost/CostOfOrder";
import TheDichotomy from "./dichotomy/TheDichotomy";
import ObserverEffect from "./observer/ObserverEffect";
import styles from "./style.module.css";

export default function ManifestPage() {
  return (
    <div className={styles.container}>
      <ManifestArc />
      <TheDichotomy />
      <CostOfOrder />
      <ObserverEffect />
      <WeightOfChoice />
      <AsymmetryOfLoss />
      <HandshakeProtocol />
    </div>
  );
}
