import RequestButton from "@/components/request-button";
import { useCallback, useEffect, useRef, useState } from "react";

const threshold = 15;
const timeout = 1000;

export default function IndexPage() {
  const [text, setText] = useState("");
  const [last, setLast] = useState(0);

  // EventListener内でのステート管理HELP
  // https://qiita.com/eiji-noguchi/items/dc33829b571944b2f679
  const lastRef = useRef<number | null>(null);
  lastRef.current = last;

  const listener = useCallback((e: DeviceMotionEvent) => {
    e.preventDefault();

    const acc = e.acceleration;
    if (acc) {
      const max = Math.max(
        Math.abs(acc.x || 0),
        Math.abs(acc.y || 0),
        Math.abs(acc.z || 0)
      );

      if (max > threshold) {
        setText((c) => `shake${Date.now()}\n${c}`);
        setLast(Date.now());
      }
    }
  }, []);

  const startWatch = () => {
    addEventListener("devicemotion", listener);
  };

  useEffect(() => {
    return () => {
      removeEventListener("devicemotion", listener);
    };
  }, [listener]);

  return (
    <div>
      <RequestButton startWatch={startWatch} />
      <pre>{text}</pre>
    </div>
  );
}
