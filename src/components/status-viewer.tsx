import { useShake } from "@/hooks/use-shake";
import useTotalHearts from "@/hooks/use-total-hearts";
import useUserHearts from "@/hooks/use-user-heartx";
import { db } from "@/lib/firebase";
import { useUser } from "@/user-provider";
import { ref, set } from "firebase/database";
import { useCallback } from "react";

export default function StatusViewer() {
  const userHearts = useUserHearts();
  const totalHearts = useTotalHearts();

  const user = useUser();

  const onShake = useCallback(() => {
    if (user) {
      set(ref(db, "counter/" + user.uid), {
        count: userHearts + 1,
      });
    }
  }, [user, userHearts]);

  useShake(15, onShake);

  return (
    <div>
      <div>現在のあなたのカウント: {userHearts}</div>
      <div>全員の合計カウント: {totalHearts}</div>
    </div>
  );
}
