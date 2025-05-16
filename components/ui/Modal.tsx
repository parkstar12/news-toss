import React from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-[500px] h-[500px] bg-white rounded-[10px]">
        <h1>Modal</h1>
        {children}
      </div>
    </div>
  );
};

export default Modal;
