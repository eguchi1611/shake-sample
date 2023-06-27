import { HeartDatabase } from "@/@types/heart";
import useTotalHearts from "@/hooks/use-total-hearts";
import { db } from "@/lib/firebase";
import { get, ref, set } from "firebase/database";
import { useState } from "react";

export default function ControlPanel() {
  const nowCount = useTotalHearts();
  const [count, setCount] = useState(0);

  const handleSubmit = async () => {
    const snapshot = await get(ref(db, "hearts/"));
    const data: HeartDatabase = snapshot.val() || {};
    Object.keys(data).forEach((uid, index) => {
      set(ref(db, "hearts/" + uid), {
        hearts: index === 0 ? count : 0,
      });
    });
  };

  return (
    <div>
      変更：
      <input
        type="number"
        name="total-count"
        id="total-count"
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <button type="button" onClick={handleSubmit}>
        適用
      </button>
      <p>現在の値: {nowCount}</p>
    </div>
  );
}
