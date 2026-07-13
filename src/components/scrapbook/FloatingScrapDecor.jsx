import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const PETAL_COUNT = 6;
const SCRAP_COUNT = 4;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Sits absolutely-positioned behind page content. Spawns slow, ambient
 * drifting petals, paper scraps, and butterflies, plus an occasional
 * paper airplane that glides across the screen.
 */
export default function FloatingScrapDecor() {
  const [showPlane, setShowPlane] = useState(false);

  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }, (_, i) => ({
        id: `petal-${i}`,
        left: randomBetween(4, 96),
        delay: randomBetween(0, 12),
        duration: randomBetween(16, 26),
        size: randomBetween(14, 22),
      })),
    []
  );

  const scraps = useMemo(
    () =>
      Array.from({ length: SCRAP_COUNT }, (_, i) => ({
        id: `scrap-${i}`,
        left: randomBetween(4, 96),
        delay: randomBetween(0, 14),
        duration: randomBetween(20, 30),
        rotate: randomBetween(-40, 40),
      })),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPlane(true);
      setTimeout(() => setShowPlane(false), 6000);
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-5%] text-[--scrap-sage]"
          style={{ left: `${p.left}%`, fontSize: p.size }}
          initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 180 }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🌿
        </motion.span>
      ))}

      {scraps.map((s) => (
        <motion.span
          key={s.id}
          className="absolute top-[-5%] block h-3 w-4 rounded-sm bg-[--scrap-beige]/70 shadow-sm"
          style={{ left: `${s.left}%` }}
          initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", opacity: [0, 0.8, 0.8, 0], rotate: s.rotate }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {showPlane && (
        <motion.span
          className="absolute top-[18%] text-2xl"
          initial={{ x: "-10vw", opacity: 0, rotate: -8 }}
          animate={{ x: "110vw", opacity: [0, 1, 1, 0], rotate: 8 }}
          transition={{ duration: 6, ease: "easeInOut" }}
        >
          ✈️
        </motion.span>
      )}
    </div>
  );
}
