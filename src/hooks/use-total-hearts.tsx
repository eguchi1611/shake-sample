import { HeartDatabase } from "@/@types/heart";
import { db } from "@/lib/firebase";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useTotalHearts() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const unsubscribe = onValue(ref(db, "hearts"), (snapshot) => {
      const data: HeartDatabase = snapshot.val() || {};
      setTotal(
        Object.values(data)
          .map((heart) => heart.hearts)
          .filter((count) => (count < 1000 ? count : 1000))
          .reduce((p, c) => p + c, 0)
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return total;
}
