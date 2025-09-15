import Image from "next/image";
import styles from "../styles/largeHero.module.scss";
import { cn } from "@/lib/utils";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",      // available Anton weight
  subsets: ["latin"], // required
});

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
            className="border-1 border-gray-700 p-2 rounded-full text-sm font-medium"
              >
              {tagText}
            </div>
          </div>
           <div className={styles.secondInverted}>
            <span 
            className={cn(anton.className,"text-6xl uppercase")}
              >
              Modern
            </span>
          </div>
           <div className={styles.thirdInverted}>
            <span 
            className="text-5xl"
              >
              Minimalist
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
