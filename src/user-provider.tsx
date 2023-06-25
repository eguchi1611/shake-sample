import { User, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "./lib/firebase";

const context = createContext<User | null>(null);

export default function UserProrivder({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null | undefined>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    signInAnonymously(auth);
  }, []);

  if (user === null) throw "ログインできませんでした";

  if (user === undefined) return <div>ログイン中...</div>;

  return <context.Provider value={user}>{children}</context.Provider>;
}

export function useUser() {
  const user = useContext(context);
  if (user === null) throw "UserProrivderでラップしてください";
  return user;
}
