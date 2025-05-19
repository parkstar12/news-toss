import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      tabIndex={-1}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className={`relative z-50 bg-white rounded-main p-[60px] w-[90vw] h-[90vh] shadow-lg transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          className="absolute top-[30px] right-[30px] z-50"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <div className="overflow-y-auto h-full">{children}</div>
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-[200px] bg-gradient-to-t from-white/90 to-transparent" />
      </div>
    </div>,
    document.body
  );
};

export default Modal;
