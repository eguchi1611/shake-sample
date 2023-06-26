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
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (state) => {
      if (state === null) {
        signInAnonymously(auth);
      } else {
        setUser(state);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (user === undefined) {
    return <div>ログイン中...</div>;
  }

  return <context.Provider value={user}>{children}</context.Provider>;
}

export function useUser() {
  const user = useContext(context);
  if (user === null) throw "UserProrivderでラップしてください";
  return user;
}
