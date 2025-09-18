import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import ProfilePage from "../pages/ProfilePage";
import ForgetPassword from "../pages/ForgetPassword";
import GamePurchasePage from "../pages/GamePurchasePage";
import PaymentPage from "../pages/PaymentPage";
import GameBoard from "../pages/GameBoard";
import QuestionPage from "../pages/QuestionPage";
import AwnserPage from "../pages/AwnserPage";
import Congratulations from "../pages/Congratulations";
import PlayPage from "../pages/PlayPage";
import AboutJaweb from "../pages/AboutJaweb";
import RulesPage from "../pages/RulesPage";
import ContactUs from "../pages/ContactUs";
import SocialMedia from "../pages/SocialMedia";
import DealPage from "../pages/DealPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  const token = localStorage.getItem("accessToken");

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="home" element={<HomePage />} />
      <Route
        path="auth"
        element={token ? <Navigate to="/home" /> : <AuthPage />}
      />

      {/* Protected Route  */}
      <Route element={<ProtectedRoute />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="forgetPassword" element={<ForgetPassword />} />
        <Route path="resetPassword" element={<ResetPasswordPage />} />

        <Route path="game" element={<GamePurchasePage />} />
        <Route path="payment" element={<PaymentPage />} />
      </Route>

      <Route path="GameBoard" element={<GameBoard />} />
      <Route path="QuestionPage" element={<QuestionPage />} />
      <Route path="Awnser" element={<AwnserPage />} />
      <Route path="Congratulations" element={<Congratulations />} />
      <Route path="Play" element={<PlayPage />} />
      <Route path="about" element={<AboutJaweb />} />
      <Route path="rules" element={<RulesPage />} />y
      <Route path="ContactUs" element={<ContactUs />} />
      <Route path="SocialMedia" element={<SocialMedia />} />
      <Route path="Deal" element={<DealPage />} />
    </Routes>
  );
};

export default Routers;
