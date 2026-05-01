import { motion } from "framer-motion";

const Sparkle = ({ style }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-[#FED8B1] rounded-full shadow-[0_0_8px_#FED8B1]"
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        y: [0, -120],
      }}
      transition={{
        duration: 3 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
    />
  );
};

export default Sparkle;