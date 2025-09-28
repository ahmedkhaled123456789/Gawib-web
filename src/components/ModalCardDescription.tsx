import React from "react";
import { X } from "lucide-react";

interface ModalCardDescriptionProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

const ModalCardDescription: React.FC<ModalCardDescriptionProps> = ({
  isOpen,
  onClose,
  title,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      {/* المودال */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-96 relative animate-fadeIn text-center">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* العنوان */}
        <h2 className="text-2xl font-bold text-[#085E9C] mb-4">{title}</h2>

        {/* الوصف */}
        <p className="text-gray-700 text-base leading-relaxed">
          {description || "لا يوجد وصف"}
        </p>
      </div>
    </div>
  );
};

export default ModalCardDescription;
