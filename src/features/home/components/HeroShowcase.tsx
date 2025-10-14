import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "../styles/heroShowcase.module.scss";
import LargeHero from "./HeroCard";
import { useResponsive } from "@/common/hooks/useMediaQuery";

const modernInterior = "/home/modern-interior.jpeg";
const mahoganyDesk = "/home/mahogany-desk.jpeg";
const title = "Into a gallery of elegance";

export default function HeroShowcase() {
  const { isDesktop } = useResponsive();

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:p-8 my-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-6 min-h-[500px]">
          <div className="md:col-span-3 w-full rounded-xl overflow-hidden flex items-center justify-center">
            {isDesktop ? (
              <LargeHero />
            ) : (
              <div className="relative w-full h-[400px]">
                <Image
                  src={modernInterior}
                  alt="Modern interior"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            )}
          </div>
          <div className="col-span-1 w-full flex flex-col gap-4 mt-4 lg:mt-0">
            <div className="flex-1 bg-surface-dark rounded-xl p-6 flex flex-col gap-4 justify-center">
              <span className="border border-gray-400 rounded-xl px-3 py-1 w-max text-sm font-medium bg-white/70">
                Aesthetic
              </span>
              <span className="text-gray-700 text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                Into a gallery of elegance
              </h3>
            </div>
            <div className="flex-3 flex-col overflow-hidden">
              <div
                className={styles.cardInner}
                style={{ ["--clr" as any]: "#ffff" }}
              >
                <div className={styles.box}>
                  <div className={styles.imgBox}>
                    <Image
                      src={mahoganyDesk}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className={styles.icon}>
                    <a className={styles.iconBox}>
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
