import { motion } from "framer-motion";
import PropTypes from "prop-types";

const LoadingSpinner = ({ size = "medium" }) => {
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1,
  };

  const sizes = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`${sizes[size]} rounded-full border-4 border-purple-200`}
        style={{
          borderTopColor: "rgb(147, 51, 234)",
          borderRightColor: "rgb(147, 51, 234, 0.5)",
        }}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-purple-600 font-medium"
      >
        Loading...
      </motion.div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default LoadingSpinner;
