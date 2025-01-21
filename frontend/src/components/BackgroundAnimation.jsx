import { motion } from "framer-motion";

const BackgroundAnimation = () => {
  return (
    <motion.div
      className="fixed inset-0 -z-10 bg-repeat bg-cover bg-center"
      style={{
        backgroundImage: "url('/public/background.jpg')",
      }}
      animate={{
        background: [
          "linear-gradient(120deg, rgba(34, 197, 94, 0.7), rgba(234, 179, 8, 0.7), rgba(59, 130, 246, 0.7)), url('/public/background.jpg')",
          "linear-gradient(120deg, rgba(59, 130, 246, 0.7), rgba(34, 197, 94, 0.7), rgba(234, 179, 8, 0.7)), url('/public/background.jpg')",
          "linear-gradient(120deg, rgba(234, 179, 8, 0.7), rgba(59, 130, 246, 0.7), rgba(34, 197, 94, 0.7)), url('/public/background.jpg')",
        ],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    />
  );
};

export default BackgroundAnimation;
