import PermCard from "@/components/perm-card";
import StatusViewer from "@/components/status-viewer";
import UserProrivder from "@/user-provider";
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
    <UserProrivder>
      <StatusViewer />
    </UserProrivder>
  );
}
