import React, { useState, useEffect, useRef } from "react";
import { Image, Loader, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActiveGames } from "../store/activeGameSlic";
import type { RootState, AppDispatch } from "../store";
import { toast } from "sonner";
import { addQuestion } from "../store/AddGameSlice";

type MediaType = "image" | "video" | "audio" | null;

const AddQuestions: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { games, loading, error } = useSelector(
    (state: RootState) => state.activeGames
  );

  const [activeButton, setActiveButton] = useState<number>(200);
  const [questionText, setQuestionText] = useState<string>("");
  const [answerText, setAnswerText] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<string>("");

  const [questionMedia, setQuestionMedia] = useState<File | null>(null);
  const [questionMediaType, setQuestionMediaType] = useState<MediaType>(null);
  const [answerMedia, setAnswerMedia] = useState<File | null>(null);
  const [answerMediaType, setAnswerMediaType] = useState<MediaType>(null);

  const [isSaving, setIsSaving] = useState(false);

  // References to hidden file inputs
  const questionFileInputRef = useRef<HTMLInputElement>(null);
  const answerFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(getActiveGames());
  }, [dispatch]);

  const handleButtonClick = (value: number) => {
    setActiveButton(value);
  };

  const handleMediaChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "question" | "answer"
  ) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const mimeType = file.type;
    let mediaType: MediaType = null;

    if (mimeType.startsWith("image/")) mediaType = "image";
    else if (mimeType.startsWith("video/")) mediaType = "video";
    else if (mimeType.startsWith("audio/")) mediaType = "audio";

    if (type === "question") {
      setQuestionMedia(file);
      setQuestionMediaType(mediaType);
    } else {
      setAnswerMedia(file);
      setAnswerMediaType(mediaType);
    }
  };

  const renderMediaPreview = (
    media: File | null,
    type: MediaType,
    onClick: () => void
  ) => {
    if (!media) return null;

    const url = URL.createObjectURL(media);

    if (type === "image")
      return (
        <img
          src={url}
          alt="preview"
          className="max-h-48 max-w-full object-contain rounded cursor-pointer"
          onClick={onClick}
        />
      );

    if (type === "video")
      return (
        <video
          controls
          className="max-h-48 max-w-full rounded object-contain cursor-pointer"
          onClick={onClick}
        >
          <source src={url} type={media.type} />
        </video>
      );

    if (type === "audio")
      return (
        <audio controls className="w-full cursor-pointer" onClick={onClick}>
          <source src={url} type={media.type} />
        </audio>
      );

    return null;
  };

  const handleSave = () => {
    if (
      !selectedGame ||
      !questionText.trim() ||
      !answerText.trim() ||
      !activeButton
    ) {
      toast.error("⚠️ من فضلك املا جميع الحقول");
      return;
    }

    setIsSaving(true);

    const formData = new FormData();
    formData.append("game_id", selectedGame);
    formData.append("question_text", questionText);
    formData.append("answer_text", answerText);
    formData.append("hint", comment);
    formData.append("points", activeButton.toString());

    if (questionMediaType === "image" && questionMedia)
      formData.append("question_image", questionMedia);
    if (questionMediaType === "video" && questionMedia)
      formData.append("question_video", questionMedia);
    if (questionMediaType === "audio" && questionMedia)
      formData.append("question_audio", questionMedia);

    if (answerMediaType === "image" && answerMedia)
      formData.append("answer_image", answerMedia);
    if (answerMediaType === "video" && answerMedia)
      formData.append("answer_video", answerMedia);
    if (answerMediaType === "audio" && answerMedia)
      formData.append("answer_audio", answerMedia);

    dispatch(addQuestion(formData))
      .unwrap()
      .then(() => {
        toast.success("✅ تم حفظ السؤال بنجاح");
        setQuestionText("");
        setAnswerText("");
        setComment("");
        setSelectedGame("");
        setQuestionMedia(null);
        setQuestionMediaType(null);
        setAnswerMedia(null);
        setAnswerMediaType(null);
      })
      .catch((err: string) => {
        toast.error("❌ فشل حفظ السؤال: " + err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-gray-100 p-4">
      {/* زرار الرجوع */}
      <div className="w-full max-w-6xl mb-4">
        <button
          className="flex items-center gap-2 text-blue-600 hover:underline"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} /> رجوع
        </button>
      </div>

      {/* محتوى الصفحة */}
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-6xl w-full">
        <div className="flex flex-wrap gap-6">
          {/* قسم السؤال */}
          <div className="flex-1 border p-4 rounded-lg min-w-[300px]">
            <h2 className="text-center font-semibold mb-2">السؤال</h2>
            <textarea
              className="w-full h-32 border rounded p-2 resize-none"
              placeholder="اكتب السؤال هنا..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            ></textarea>

            <div className="mt-4 border h-48 flex flex-col items-center justify-center gap-2 overflow-hidden">
              {renderMediaPreview(questionMedia, questionMediaType, () =>
                questionFileInputRef.current?.click()
              )}

              {!questionMedia && (
                <label
                  htmlFor="questionFile"
                  className="cursor-pointer flex flex-col items-center gap-1 text-gray-500 hover:text-gray-800"
                >
                  <Image size={30} />
                  <span className="text-sm">رفع صورة أو فيديو أو صوت</span>
                </label>
              )}

              <input
                ref={questionFileInputRef}
                id="questionFile"
                type="file"
                accept="image/*,video/*,audio/*"
                className="hidden"
                onChange={(e) => handleMediaChange(e, "question")}
              />
            </div>
          </div>

          {/* قسم الإجابة */}
          <div className="flex-1 border p-4 rounded-lg min-w-[300px]">
            <h2 className="text-center font-semibold mb-2">الجواب</h2>
            <textarea
              className="w-full h-32 border rounded p-2 resize-none"
              placeholder="اكتب الإجابة هنا..."
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
            ></textarea>

            <div className="mt-4 border h-48 flex flex-col items-center justify-center gap-2 overflow-hidden">
              {renderMediaPreview(answerMedia, answerMediaType, () =>
                answerFileInputRef.current?.click()
              )}

              {!answerMedia && (
                <label
                  htmlFor="answerFile"
                  className="cursor-pointer flex flex-col items-center gap-1 text-gray-500 hover:text-gray-800"
                >
                  <Image size={30} />
                  <span className="text-sm">رفع صورة أو فيديو أو صوت</span>
                </label>
              )}

              <input
                ref={answerFileInputRef}
                id="answerFile"
                type="file"
                accept="image/*,video/*,audio/*"
                className="hidden"
                onChange={(e) => handleMediaChange(e, "answer")}
              />
            </div>
          </div>

          {/* القسم الجانبي */}
          <div className="w-full md:w-64 border p-4 rounded-lg flex flex-col gap-4 min-w-[280px]">
            <div className="flex gap-2 justify-center flex-wrap">
              {[600, 400, 200].map((value) => (
                <button
                  key={value}
                  onClick={() => handleButtonClick(value)}
                  className={`px-4 py-2 rounded text-black ${
                    activeButton === value ? "bg-gray-400" : "bg-gray-100"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium">اختر اللعبة</label>
              <select
                className="w-full border rounded p-2"
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
              >
                <option value="">اختر لعبة</option>
                {loading && <option>جاري التحميل...</option>}
                {error && <option>خطأ في التحميل</option>}
                {games?.map((gameGroup) =>
                  gameGroup.games?.map((g: any) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">hint</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="اكتب hint هنا..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="flex gap-2 justify-center mt-4 flex-wrap">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? <Loader className="animate-spin" /> : "حفظ"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestions;
