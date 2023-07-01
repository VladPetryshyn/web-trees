import { AnimatePresence, motion } from "framer-motion";
import { FC, } from "react";

interface PropsB {
  onClick(): void;
  children?: React.ReactNode
}

const Backdrop: FC<PropsB> = ({ children, onClick }) => {

  return (
    <motion.div
      onClick={onClick}
      className="bg-[#0000004d] fixed w-screen h-screen top-0 left-0 flex items-center justify-center px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

interface Props {
  handleClose(): void;
  isOpen: boolean;
  children?: React.ReactNode
}

export const Modal: FC<Props> = ({ handleClose, isOpen, children }) => {

  return (
    <AnimatePresence
      initial={false}
      onExitComplete={() => null}
    >
      {isOpen && <Backdrop onClick={handleClose}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="m-auto bg-light-bg rounded-lg p-5"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      </Backdrop>
      }
    </AnimatePresence>
  );
};
