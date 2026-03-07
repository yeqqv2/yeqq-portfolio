import { useEffect, useRef } from "react";
import styles from "./style.module.css";
import { Fingerprint, Activity, Lock } from "lucide-react";

{/* <div
  style={{
    height: "60vh",
    width: "20vw",
    overflow: "hidden",
    borderRadius: "1em",
  }}
>
  <ReflectiveCard
    blurStrength={1}
    glassDistortion={30}
    metalness={0.5}
    roughness={0.5}
    displacementStrength={1}
    noiseScale={5}
    specularConstant={5}
    grayscale={0.15}
  />
</div> */}

const ReflectiveCard = ({
  blurStrength = 12,
  color = "white",
  metalness = 1,
  roughness = 0.4,
  overlayColor = "rgba(255, 255, 255, 0.1)",
  displacementStrength = 20,
  noiseScale = 1,
  specularConstant = 1.2,
  grayscale = 1,
  glassDistortion = 0,
  className = "",
  style = {},
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream = null;

    const startWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user",
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    startWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const baseFrequency = 0.03 / Math.max(0.1, noiseScale);
  const saturation = 1 - Math.max(0, Math.min(1, grayscale));

  const cssVariables = {
    "--blur-strength": `${blurStrength}px`,
    "--metalness": metalness,
    "--roughness": roughness,
    "--overlay-color": overlayColor,
    "--text-color": color,
    "--saturation": saturation,
  };

  return (
    <div
      className={`${styles.reflective_card_container} ${className}`}
      style={{ ...style, ...cssVariables }}
    >
      <svg className={styles.reflective_svg_filters} aria-hidden="true">
        <defs>
          <filter
            id="metallic-displacement"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency={baseFrequency}
              numOctaves="2"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="luminanceToAlpha"
              result="noiseAlpha"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementStrength}
              xChannelSelector="R"
              yChannelSelector="G"
              result="rippled"
            />
            <feSpecularLighting
              in="noiseAlpha"
              surfaceScale={displacementStrength}
              specularConstant={specularConstant}
              specularExponent="20"
              lightingColor="#ffffff"
              result="light"
            >
              <fePointLight x="0" y="0" z="300" />
            </feSpecularLighting>
            <feComposite
              in="light"
              in2="rippled"
              operator="in"
              result="light-effect"
            />
            <feBlend
              in="light-effect"
              in2="rippled"
              mode="screen"
              result="metallic-result"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="solidAlpha"
            />
            <feMorphology
              in="solidAlpha"
              operator="erode"
              radius="45"
              result="erodedAlpha"
            />
            <feGaussianBlur
              in="erodedAlpha"
              stdDeviation="10"
              result="blurredMap"
            />
            <feComponentTransfer in="blurredMap" result="glassMap">
              <feFuncA type="linear" slope="0.5" intercept="0" />
            </feComponentTransfer>
            <feDisplacementMap
              in="metallic-result"
              in2="glassMap"
              scale={glassDistortion}
              xChannelSelector="A"
              yChannelSelector="A"
              result="final"
            />
          </filter>
        </defs>
      </svg>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={styles.reflective_video}
      />

      <div className={styles.reflective_noise} />
      <div className={styles.reflective_sheen} />
      <div className={styles.reflective_border} />
      <div className={styles.reflective_content} />
    </div>
  );
};

export default ReflectiveCard;
