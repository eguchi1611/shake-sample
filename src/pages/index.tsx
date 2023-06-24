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

  return (
    <div>
      {device === "iPhone" ? <RequestButton /> : null}
      <Link href="/counter">Counterページへ</Link>
    </div>
  );
}
