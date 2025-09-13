import Image from "next/image";
import styles from "../styles/largeHero.module.scss";

interface Props {
  image?: string;
  title?: string;
  tagText?: string;
  color?: string; // pass '#fff' or '#ffffff'
}

export default function LargeHero({
  image = "/home/modern-interior.jpeg",
  title = "Interior",
  tagText = "gorgeous interior",
  color = "#ffffff",
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.box}>
          <div
            className={`${styles.poster}`}
          >    
            <Image
               src={image}
               alt="Modern interior"
               fill
               style={{ objectFit: "cover" }}
               priority
            />
          </div>
          <div className={styles.firstInverted}>
            <div 
            className="border-1 border-gray-700 p-2 rounded-full text-xs font-medium"
              >
              {tagText}
            </div>
          </div>
           {/* <div className={styles.secondInverted}>
            <div 
            className="text-5xl"
              >
              Modern
            </div>
          </div>
           <div className={styles.thirdInverted}>
            <div 
            className="border-1 border-gray-700 px-4 py-2 rounded-full text-sm font-medium"
              >
              Minimalist
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
