type Props = {
  startWatch: () => void;
};

export default function RequestButton({ startWatch }: Props) {
  const handleClick = () => {
    try {
      (DeviceMotionEvent as any)
        .requestPermission()
        .then((state: string) => {
          if (state === "granted") {
            alert("許可されました 検知を開始します");
            startWatch();
          } else {
            alert("許可されませんでした");
          }
        })
        .catch(() => {
          alert("error");
        });
    } catch (error) {
      alert("このデバイスは対応していません");
    }
  };

  return (
    <div>
      <button onClick={handleClick}>動作へのアクセスの許可</button>
    </div>
  );
}
