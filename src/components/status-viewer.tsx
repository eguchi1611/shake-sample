import headerImage from "@/assets/header-image.png";
import ragopasuBlack from "@/assets/ragopasu-black.png";
import ragopasuWhite from "@/assets/ragopasu-white.png";
import { useShake } from "@/hooks/use-shake";
import useTotalHearts from "@/hooks/use-total-hearts";
import useUserHearts from "@/hooks/use-user-heartx";
import { db } from "@/lib/firebase";
import style from "@/styles/viewer.module.scss";
import { useUser } from "@/user-provider";
import { ref, set } from "firebase/database";
import Image from "next/image";
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
    const createPetal = () => {
      const petalEl = document.createElement("span");
      petalEl.className = style.heart;
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

    const timer = setInterval(createPetal, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header_image}>
        <Image src={headerImage} alt="header image" />
      </div>
      <nav className={style.nav}>
        <i className="fa-solid fa-bars"></i>
      </nav>
      <div className={style.exp}>
        <div className={style.exp_top}>スマホを</div>
        <div className={style.exp_main}>振って</div>
        <div className={style.exp_bottom}>ハートを送ろう！</div>
      </div>
      <div className={style.number}>
        <div className={style.number_container}>
          <div className={style.number_left}>総ハート数</div>
          <div className={style.number_people}>{totalHearts}</div>
        </div>
      </div>
      <div className={style.share}>
        <span className={style.share_top}>SNSで</span>
        <a href="#" className={style.share_button}>
          シェア<i className="fa-solid fa-share"></i>
        </a>
      </div>

      <div className={`${style.ragopasu} ${style.ragopasu_white}`}>
        <Image src={ragopasuWhite} alt="" />
      </div>

      <div className={`${style.ragopasu} ${style.ragopasu_black}`}>
        <Image src={ragopasuBlack} alt="" />
      </div>

      <div className={style.heart_container} ref={heartContainer}></div>
    </div>
  );
}
