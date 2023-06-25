import { useShake } from "@/hooks/use-shake";
import { auth, db } from "@/lib/firebase";
import { Unsubscribe, User, signInAnonymously } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import { useCallback, useEffect, useState } from "react";

export default function AppPage() {
  const [count, setCount] = useState(0);
  const [sumCount, setSumCount] = useState(0);
  const [status, setStatus] = useState<Record<string, string>>({});

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setStatus((c) => ({
      ...c,
      auth: "ログイン中",
    }));
    signInAnonymously(auth)
      .then((credential) => {
        setStatus((c) => ({
          ...c,
          auth: "匿名ユーザー: " + credential.user.uid + " でログインしました",
        }));
        setUser(credential.user);
      })
      .catch(() => {
        setStatus((c) => ({
          ...c,
          auth: "ログインに失敗しました",
        }));
      });
  }, []);

  const onShake = useCallback(() => {
    if (user) {
      set(ref(db, "counter/" + user.uid), {
        count: count + 1,
      });
    }
  }, [user, count]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    if (user) {
      unsubscribe = onValue(
        ref(db, "counter/" + user.uid + "/count"),
        (snapshot) => {
          const data = snapshot.val();
          setCount(data);
        }
      );
    }
    return () => {
      if (unsubscribe !== null) unsubscribe();
    };
  }, [count, user]);

  useEffect(() => {
    const unsubscribe = onValue(ref(db, "counter"), (snapshot) => {
      const data = snapshot.val();
      setStatus((c) => ({
        ...c,
        database: data,
      }));
      setSumCount(
        Object.values(data)
          .map((v: any) => v.count)
          .reduce((p, c) => p + c, 0)
      );
    });
    return () => {
      unsubscribe();
    };
  }, [count, user]);

  useShake(10, onShake);

  return (
    <div>
      <div>ステータス</div>
      <pre>{JSON.stringify(status, null, 2)}</pre>
      <div>現在のあなたのカウント: {count}</div>
      <div>全員の合計カウント: {sumCount}</div>
    </div>
  );
}
