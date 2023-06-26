type Props = {
  onGranted: () => void;
};

export default function PermCard({ onGranted }: Props) {
  const handleClick = () => {
    try {
      (DeviceMotionEvent as any)
        .requestPermission()
        .then((state: string) => {
          if (state === "granted") {
            onGranted();
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

  return (
    <div>
      iPhoneでは振る動作の検知に許可が必要です
      <button type="button" onClick={handleClick}>
        ここをクリック
      </button>
      して許可してください
    </div>
  );
}
