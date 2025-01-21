import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { XCircleIcon } from "@heroicons/react/24/outline";

const ErrorMessage = ({ error, onClose }) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 relative"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-red-400 hover:text-red-500"
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
  onClose: PropTypes.func,
};

export default ErrorMessage;
