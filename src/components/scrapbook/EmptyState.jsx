import { motion } from "framer-motion";
import Frog from "../ui/Frog";

export default function EmptyState() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-20 text-center">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Frog size={96} pose="curious" />
      </motion.div>
      <p className="mt-6 font-display text-2xl text-[--scrap-ink]">Looks a little empty...</p>
      <p className="mt-2 text-[--scrap-ink]/60">
        Be the first person to leave something beautiful.
      </p>
    </div>
  );
}
