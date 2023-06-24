import RequestButton from "@/components/request-button";
import { useCallback, useEffect, useState } from "react";

export default function IndexPage() {
  const [text, setText] = useState("");
  const [flag, setFlag] = useState(false);
  const [val, setVal] = useState(0);
  const [count, setCount] = useState(0);

  const listener = useCallback((e: DeviceMotionEvent) => {
    e.preventDefault();

    const acc = e.acceleration;
    if (acc) {
      const abs = Math.sqrt(
        (acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2
      );
      setVal(abs);
    }
  }, []);

  useEffect(() => {
    const threshold = 15;
    if (val > threshold) {
      if (!flag) {
        setCount((c) => c + 1);
      }
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [val, flag]);

  const startWatch = () => {
    addEventListener("devicemotion", listener);
  };

  return (
    <div>
      <RequestButton startWatch={startWatch} />
      <pre>{count}</pre>
    </div>
  );
}
