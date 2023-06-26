import PermCard from "@/components/perm-card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [device, setDevice] = useState("");
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (/iPhone/.test(navigator.userAgent)) {
      setDevice("iPhone");
    }
  }, []);

  if (device === "iPhone" && !granted) {
    return <PermCard onGranted={() => setGranted(true)} />;
  }

  return (
    <div>
      準備ができました！
      <Link href="/counter">ここ</Link>から応援できます！
    </div>
  );
}
