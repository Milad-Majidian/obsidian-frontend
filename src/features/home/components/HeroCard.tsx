import Image from "next/image";
import styles from "../styles/HeroCard.module.scss";
import { cn } from "@/lib/utils";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

interface Props {
  image?: string;
  title?: string;
  tagText?: string;
  color?: string;
}

export default function HeroCard({
  image = "/home/modern-interior.jpeg",
  title = "Interior",
  tagText = "Gorgeous Interior",
  color = "#ffffff",
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.box}>
          {/* Poster */}
            <Image
              src={image}
              alt="Modern interior"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          {/* Tag */}
           <div className={styles.invertedBox}>
            <div className="border border-gray-700 p-2 rounded-full text-sm font-medium">
              {tagText}
            </div>
          </div> 
           <div className={styles.invertedBoxWide}>
            <h2 className={cn(anton.className, styles.heroTitle)}>Modern</h2>
          </div>
          <div className={styles.invertedBoxWider}>
            <h3 className={cn(anton.className, styles.heroSubtitle)}>
              Minimalist
            </h3>
          </div> 
        </div>
      </div>
    </div>
  );
}
