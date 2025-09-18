import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { createReport } from "../store/ReportSlice";
import { toast } from "sonner";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  question_id: number;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  question_id,
}) => {
  const [comment, setComment] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.report);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("يرجى كتابة سبب الإبلاغ");
      return;
    }

    try {
      const res = await dispatch(
        createReport({
          question_id,
          comment,
        })
      ).unwrap();
      if (res) {
        toast.success("تم إرسال الإبلاغ بنجاح");
      }

      setComment("");
      onClose();
    } catch (err: any) {
      toast.error(err || "حدث خطأ أثناء إرسال الإبلاغ");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-md p-6 w-[450px]">
        <h2 className="text-center font-bold text-lg mb-4">
          إبلاغ عن خطأ بالسؤال او الجواب
        </h2>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="اكتب سبب الإبلاغ..."
          className="w-full border rounded p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
        />

        <div className="flex justify-between gap-4">
          <button
            className="w-1/2 bg-[#085E9C] text-white py-2 rounded hover:bg-[#064b7a]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "جارٍ الإرسال..." : "إبلاغ"}
          </button>

          <button
            className="w-1/2 border border-[#085E9C] text-[#085E9C] py-2 rounded hover:bg-gray-100"
            onClick={onClose}
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
