import { useEffect } from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const ToastNotification = ({ message, isOpen, onClose }: ToastProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 7000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <Stack
            className="flex-row w-full h-[115px] items-center rounded-[4px] bg-[#E1F9F0] pl-10 relative"
            sx={{ borderLeft: "8px solid #34D399" }}
          >
            <CheckIcon color="success" fontSize="large" />
            <Stack className="ml-5">
              <Typography className="text-[#004434] text-[16px] font-bold">
                {message}
              </Typography>
              <Typography className="text-[#637381] text-[16px]">
                You can view and manage your invoice in the &apos;My Invoices&apos;
                section.
              </Typography>
            </Stack>
            <IconButton className="absolute right-4 top-4" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;
