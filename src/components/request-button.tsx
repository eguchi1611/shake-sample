import { useState } from "react";

export default function RequestButton() {
  const [perm, setPerm] = useState(false);

  const handleClick = () => {
    try {
      (DeviceMotionEvent as any)
        .requestPermission()
        .then((state: string) => {
          if (state === "granted") {
            setPerm(true);
          } else {
            // 要検討: パーミッションを取れなかった際の処理
          }
        })
        .catch((error: unknown) => {
          console.error(error);
          alert(error);
        });
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  if (perm) {
    return <div>許可されました</div>;
  } else {
    return (
      <button type="button" onClick={handleClick}>
        クリックしてアクセス権限を許可してください
      </button>
    );
  }
}
