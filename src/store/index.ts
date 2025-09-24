import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import passwordReducer from "./resetPassword";
import contactReducer from "./contactSlice";
import gameReducer from "./gameSlice";
import gamePackageReducer from "./GamePackagesSlice";
import discountReducer from "./DiscountSlice";
import socialReducer from "./SocialLinksSlice";
import categoriesReducer from "./categoriesSlice";
import preGameReducer from "./preGameSlice";
import settingReducer from "./settingSlice";
import answerReducer from "./answerSlice";
import gameFeaturesSlice from "./gameFeaturesSlice";
import reportSlice from "./ReportSlice";
import paymentSlice from "./paymentSlice";
import freePaymentSlice from "./freePaymentSlic";
import endGameReducer from "./endGameSlic";
import activeGamesReducer from "./ActiveGameSlic";

const store = configureStore({
  reducer: {
    auth: authReducer,
    password: passwordReducer,
    contact: contactReducer,
    game: gameReducer,
    gamePackage: gamePackageReducer,
    discount: discountReducer,
    social: socialReducer,
    category: categoriesReducer,
    preGame: preGameReducer,
    settings: settingReducer,
    answer: answerReducer,
    gameFeatures: gameFeaturesSlice,
    report: reportSlice,
    payment: paymentSlice,
    freePaymentSlice: freePaymentSlice,
    endGame: endGameReducer,
    activeGames: activeGamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
