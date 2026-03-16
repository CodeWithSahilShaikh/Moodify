import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";
import "./FaceExpression.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });
    
    // Copy the current values of the refs so that cleanup happens correctly
    const currentLandmarker = landmarkerRef.current;
    const currentVideo = videoRef.current;
    
    return () => {
      if (currentLandmarker) {
        currentLandmarker.close();
      }
      if (currentVideo?.srcObject) {
        currentVideo.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
      setIsDetecting(true);
      const expr = await detect({ landmarkerRef, videoRef, setExpression });
      setIsDetecting(false);
      onClick(expr);
  }

  return (
    <div className="face-expression-container">
      <div className="camera-frame">
        <video
          ref={videoRef}
          playsInline
          className="camera-video"
        />
        {isDetecting && <div className="scanning-overlay"></div>}
      </div>
      
      <div className="status-panel">
         <div className="mood-box">
             <span className="mood-label">Current Mood</span>
             <h2 className="mood-value">{expression}</h2>
         </div>
         <button className="button detect-btn" onClick={handleClick} disabled={isDetecting}>
           {isDetecting ? "Scanning..." : "Detect & Play"}
           {!isDetecting && (
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <polygon points="5 3 19 12 5 21 5 3"></polygon>
             </svg>
           )}
         </button>
      </div>
    </div>
  );
}
