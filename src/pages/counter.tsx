import { useShake } from "@/hooks/use-shake";
import { useCallback, useState } from "react";

export default function AppPage() {
  const [count, setCount] = useState(0);

  const onShake = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  useShake(10, onShake);

  return <div>{count}</div>;
}
