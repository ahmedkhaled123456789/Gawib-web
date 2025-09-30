import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Loader2 } from "lucide-react";
import PaymenSuccess from "../pages/PaymenSuccess";
import ShareApp from "../pages/ShareApp";
import ActiveGames from "../components/ActiveGames";

// Lazy imports
const HomePage = lazy(() => import("../pages/HomePage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const ForgetPassword = lazy(() => import("../pages/ForgetPassword"));
const GamePurchasePage = lazy(() => import("../pages/GamePurchasePage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage"));
const GameBoard = lazy(() => import("../pages/GameBoard"));
const QuestionPage = lazy(() => import("../pages/QuestionPage"));
const AwnserPage = lazy(() => import("../pages/AwnserPage"));
const Congratulations = lazy(() => import("../pages/Congratulations"));
const PlayPage = lazy(() => import("../pages/PlayPage"));
const AboutJaweb = lazy(() => import("../pages/AboutJaweb"));
const RulesPage = lazy(() => import("../pages/RulesPage"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const SocialMedia = lazy(() => import("../pages/SocialMedia"));
const DealPage = lazy(() => import("../pages/DealPage"));
const ResetPasswordPage = lazy(() => import("../pages/ResetPasswordPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const Routers = () => {
  const token = localStorage.getItem("accessToken");

  return (
    <Suspense
      fallback={
        <div className=" h-screen flex justify-center items-center">
          <Loader2 className="animate-spin mx-auto mt-20" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route
          path="auth"
          element={token ? <Navigate to="/home" /> : <AuthPage />}
        />
        <Route
          path="forgetPassword"
          element={token ? <Navigate to="/home" /> : <ForgetPassword />}
        />
        <Route path="reset-password" element={<ResetPasswordPage />} />

        {/* Protected Route  */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="game" element={<GamePurchasePage />} />
          <Route path="/payment-return" element={<PaymentPage />} />
        </Route>
        
        <Route path="payment-success" element={<PaymenSuccess />} />

        <Route path="GameBoard" element={<GameBoard />} />
        <Route path="QuestionPage" element={<QuestionPage />} />
        <Route path="Awnser" element={<AwnserPage />} />
        <Route path="congratulations" element={<Congratulations />} />
        <Route path="Play" element={<PlayPage />} />
        <Route path="about" element={<AboutJaweb />} />
        <Route path="rules" element={<RulesPage />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="socialMedia" element={<SocialMedia />} />
        <Route path="Deal" element={<DealPage />} />
        <Route path="share-app" element={<ShareApp />} />
        <Route path="active-game" element={<ActiveGames />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
