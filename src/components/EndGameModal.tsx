// src/components/EndGameModal.tsx
import { X } from "lucide-react";

interface EndGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
}

const EndGameModal: React.FC<EndGameModalProps> = ({ isOpen, onClose, onExit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-md p-6 w-80 relative shadow-lg border border-gray-300">
        {/* زر الإغلاق */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* النص */}
        <h2 className="text-lg font-bold mb-6 text-center ">
          هل تريد الخروج من اللعبة
        </h2>

        {/* الأزرار */}
        <div className="flex justify-between gap-3">
          <button
            className="flex-1 border border-[#085E9C] text-[#085E9C] py-2 rounded hover:bg-gray-100 transition"
            onClick={onClose}
          >
            إلغاء
          </button>

          <button
            className="flex-1 bg-[#085E9C] text-white py-2 rounded hover:bg-blue-800 transition"
            onClick={onExit}
          >
            خروج
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndGameModal;
