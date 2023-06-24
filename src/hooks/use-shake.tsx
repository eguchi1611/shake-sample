import { useEffect, useState } from "react";

export function useShake(threshold: number, on: () => void) {
  const [acc, setAcc] = useState(0);
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    if (!detected && acc > threshold) {
      on();
    }
    setDetected(acc > threshold);
  }, [acc, detected, threshold, on]);

  useEffect(() => {
    const listener = (e: DeviceMotionEvent) => {
      const acc = e.acceleration;
      if (acc) {
        const abs = Math.sqrt(
          (acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2
        );
        setAcc(abs);
      }
    };
    window.addEventListener("devicemotion", listener);
    return () => {
      window.removeEventListener("devicemotion", listener);
    };
  }, []);
}
