import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

/* uygulamanın tüm custom ease'leri burada, tek yerde tanımlanır ve global
   olarak kaydedilir. main.jsx en başta bunu bir kez import eder; bileşenler
   ease'lere string adıyla erişir: ease: "hop" / "butter" / "butterSlow".
   böylece her dosyada tekrar tekrar CustomEase.create çağrılmaz. */
gsap.registerPlugin(CustomEase);

CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("butter", "0.25, 0.1, 0.25, 1");
CustomEase.create("butterSlow", "0.14, 0.11, 0.11, 1");
