import { useShake } from "@/hooks/use-shake";
import useTotalHearts from "@/hooks/use-total-hearts";
import useUserHearts from "@/hooks/use-user-heartx";
import { db } from "@/lib/firebase";
import { useUser } from "@/user-provider";
import { ref, set } from "firebase/database";
import Head from "next/head";
import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

export default function StatusViewer() {
  const userHearts = useUserHearts();
  const totalHearts = useTotalHearts();

  const user = useUser();

  const onShake = useCallback(() => {
    if (user) {
      set(ref(db, "hearts/" + user.uid), {
        hearts: userHearts + 1,
      });
    }
  }, [user, userHearts]);

  useShake(10, 5, onShake);

  const heartContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // コンテナを指定
    const createPetal = () => {
      const petalEl = document.createElement("span");
      petalEl.className = "heart";
      const minSize = 50;
      const maxSize = 125;
      const minDeg = -15;
      const maxDeg = 15;
      const size = Math.random() * (maxSize + 1 - minSize) + minSize;
      const deg = Math.random() * (maxDeg + 1 - minDeg) + minDeg;
      petalEl.style.width = `${size}px`;
      petalEl.style.height = `${size}px`;
      petalEl.style.rotate = `${deg}deg`;
      petalEl.style.left = Math.random() * innerWidth + "px";
      if (heartContainer.current) heartContainer.current.appendChild(petalEl);

      setTimeout(() => {
        petalEl.remove();
      }, 10000);
    };

    setInterval(createPetal, 300);
  }, []);

  return (
    <div>
      <Head>
        <link
          href="https://use.fontawesome.com/releases/v6.4.0/css/all.css"
          rel="stylesheet"
        />
      </Head>
      <div className="header-image">
        <img src="/header-image.png" alt="" />
      </div>
      <nav className="nav">
        <i className="fa-solid fa-bars"></i>
      </nav>
      <div className="exp">
        <div className="exp-top">スマホを</div>
        <div className="exp-main">振って</div>
        <div className="exp-bottom">ハートを送ろう！</div>
      </div>
      <div className="number">
        <div className="number-left">総ハート数</div>
        <div className="number-people">{totalHearts}</div>
      </div>
      <div className="share">
        <span className="share-top">SNSで</span>
        <a href="#" className="share-button">
          シェア<i className="fa-solid fa-share"></i>
        </a>
      </div>

      <div className="ragopasu-white">
        <img src="/ragopasu-white.png" alt="" />
      </div>

      <div className="ragopasu-black">
        <img src="/ragopasu-black.png" alt="" />
      </div>

      <div className="heart-container" ref={heartContainer}></div>

      <div className="unavalible">
        スマートフォンから
        <br />
        アクセスしてください
      </div>
      <Script src="/animation.js"></Script>
    </div>
  );

  // return (
  //   <div>
  //     <div>現在のあなたのカウント: {userHearts}</div>
  //     <div>全員の合計カウント: {totalHearts}</div>
  //   </div>
  // );
}
