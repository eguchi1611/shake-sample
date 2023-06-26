import PermCard from "@/components/perm-card";
import RequestButton from "@/components/request-button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [device, setDevice] = useState("");

  useEffect(() => {
    if (/iPhone/.test(navigator.userAgent)) {
      setDevice("iPhone");
    }
  }, []);

  if (device === "iPhone") {
    return <PermCard />;
  }

  return (
    <div>
      準備ができました！
      <Link href="/counter">ここ</Link>から応援できます！
    </div>
  );
}
