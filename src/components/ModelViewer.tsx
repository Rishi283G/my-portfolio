import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Declare the model-viewer custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        'rotation-per-second'?: string;
        'shadow-intensity'?: string;
        'environment-image'?: string;
        'skybox-image'?: string;
        exposure?: string;
        'camera-orbit'?: string;
        'min-camera-orbit'?: string;
        'max-camera-orbit'?: string;
        'field-of-view'?: string;
        'ar'?: boolean;
        'ar-modes'?: string;
        'animation-name'?: string;
        'animation-crossfade-duration'?: string;
        'background-color'?: string;
        'shadow-softness'?: string;
        'poster'?: string;
        style?: React.CSSProperties;
      }, HTMLElement>;
    }
  }
}

const loadScript = (src: string) => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = src;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

interface ModelViewerProps {
  modelSrc: string;
  alt?: string;
  height?: string;
  width?: string;
  className?: string;
  animated?: boolean;
  // Position properties
  position?: "relative" | "absolute" | "fixed" | "sticky";
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  zIndex?: number;
  margin?: string;
  padding?: string;
  // Animation properties
  rotationSpeed?: number;
  floatAmount?: number;
  // Container size properties
  containerWidth?: string;
  containerHeight?: string;
  // Camera settings
  cameraControls?: boolean;
  initialOrbit?: string;
  // Zoom controls
  minCameraOrbit?: string;
  maxCameraOrbit?: string;
  minFieldOfView?: string;
  maxFieldOfView?: string;
  // Shadow and environment settings
  shadowIntensity?: string;
  environmentImage?: string;
  backgroundColor?: string;
}

export default function ModelViewer({
  modelSrc,
  alt = "3D Model",
  height = "300px",
  width = "100%",
  className = "",
  animated = true,
  // Position properties with defaults
  position ,
  top,
  bottom,
  left,
  right,
  zIndex,
  margin=" 20px auto",
  padding="0px",
  // Animation properties
  rotationSpeed = 20,
  floatAmount = 5,
  // Container size properties
  containerWidth = "400px",
  containerHeight = "auto",
//   containerOverflow ="auto"
  // Camera settings
  cameraControls = true,
  initialOrbit = "0deg 75deg auto",
  // Zoom controls
  minCameraOrbit = "auto auto auto",
  maxCameraOrbit = "auto auto auto",
  minFieldOfView = "30deg",
  maxFieldOfView = "35deg",
  // Shadow and environment settings
  shadowIntensity = "1",
  environmentImage = "neutral",
  backgroundColor = "#00000000"
}: ModelViewerProps) {
  const modelContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadScript('https://cdn.jsdelivr.net/npm/@google/model-viewer@3.1.1/dist/model-viewer.min.js')
      .catch(err => console.error('Failed to load Model Viewer script:', err));

    // Set initial camera orbit when the model viewer loads
    const modelViewer = modelContainerRef.current?.querySelector('model-viewer');
    if (modelViewer) {
      modelViewer.setAttribute('camera-orbit', initialOrbit);
    }

    if (animated) {
      const interval = setInterval(() => {
        const modelViewer = modelContainerRef.current?.querySelector('model-viewer');
        if (modelViewer) {
          const time = Date.now() / 1000;
          const floatY = Math.sin(time) * floatAmount;
          modelViewer.setAttribute('camera-orbit', `${(time * rotationSpeed) % 360}deg ${75 + floatY}deg auto`);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [animated, rotationSpeed, floatAmount, initialOrbit]);

  // Build container style
  const containerStyle: React.CSSProperties = {
    position: position || undefined,
    top: top || undefined,
    bottom: bottom || undefined,
    left: left || undefined,
    right: right || undefined,
    zIndex: zIndex || undefined,
    margin: margin || undefined,
    padding: padding || undefined,
    width: containerWidth,
    height: containerHeight
  };

  return (
    <div 
      ref={modelContainerRef} 
      className={`flex justify-center items-center ${className}`}
      style={containerStyle}
    >
      <motion.div
        className="w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <model-viewer
          src={modelSrc}
          alt={alt}
          auto-rotate={animated}
          camera-controls={cameraControls}
          min-camera-orbit={minCameraOrbit}
          max-camera-orbit={maxCameraOrbit}
          min-field-of-view={minFieldOfView}
          max-field-of-view={maxFieldOfView}
          shadow-intensity={shadowIntensity}
          background-color={backgroundColor}
          environment-image={environmentImage}
          style={{ width, height }}
        />
      </motion.div>
    </div>
  );
}