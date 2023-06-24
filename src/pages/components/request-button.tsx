export default function RequestButton() {
  const handleClick = () => {
    if (
      window.DeviceMotionEvent &&
      (window.DeviceMotionEvent as any).requestPermission
    ) {
      (DeviceMotionEvent as any)
        .requestPermission()
        .then((state: any) => {
          if (state === "granted") {
            alert("ok");
          } else {
            alert("dame");
          }
        })
        .catch((err: any) => {
          alert("error");
        });
    } else {
      alert("naiyo");
    }
  };

  return (
    <div>
      <button onClick={handleClick}>動作へのアクセスの許可</button>
    </div>
  );
}
