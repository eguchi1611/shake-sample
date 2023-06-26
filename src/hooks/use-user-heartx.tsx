import { db } from "@/lib/firebase";
import { useUser } from "@/user-provider";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useUserHearts() {
  const user = useUser();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onValue(
      ref(db, "counter/" + user.uid + "/count"),
      (snapshot) => {
        const data = snapshot.val();
        setCount(data);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [user]);

  return count;
}
