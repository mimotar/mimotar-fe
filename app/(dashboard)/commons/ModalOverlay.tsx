import React from "react";

interface ModalOverlayProps {
  children: React.ReactNode;
  className?: string;
  closeOverLayModal: () => void;
}
export default function ModalOverlay({
  className,
  children,
  closeOverLayModal,
}: ModalOverlayProps) {
  const handleCloseModalOverlay = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "modal-container") {
      e.stopPropagation();
      closeOverLayModal();
    }
  };
  return (
    <section
      onClick={handleCloseModalOverlay}
      id="modal-container"
      className={`fixed h-full w-full inset-0 flex flex-col justify-center items-center overflow-y-auto bg-transparent ${className}`}
    >
      {children}
    </section>
  );
}
