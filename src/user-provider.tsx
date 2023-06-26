import { User, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
  PropsWithChildren,
  createContext,
  useCallback,
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

  const login = useCallback(() => {
    signInAnonymously(auth);
  }, []);

  useEffect(() => {
    login;
  }, [login]);

  if (user === undefined) return <div>ログイン中...</div>;

  if (user === null)
    return (
      <div>
        <button type="button" onClick={() => login()}>
          ログイン
        </button>
        してください
      </div>
    );

  return <context.Provider value={user}>{children}</context.Provider>;
}

export function useUser() {
  const user = useContext(context);
  if (user === null) throw "UserProrivderでラップしてください";
  return user;
}
