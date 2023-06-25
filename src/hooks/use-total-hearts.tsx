import { db } from "@/lib/firebase";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useTotalHearts() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const unsubscribe = onValue(ref(db, "counter"), (snapshot) => {
      const data = snapshot.val();
      setTotal(
        Object.values(data)
          .map((v: any) => v.count)
          .reduce((p, c) => p + c, 0)
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return total;
}
