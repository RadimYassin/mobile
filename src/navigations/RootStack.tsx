import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";

// Screens
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import VerifyAccountScreen from "../screens/auth/VerifyAccountScreen";
import SuccessScreen from "../screens/auth/SucssessScreen";
import HomeTab from "./HomeTab";

// Setup Profile Screens
import SetupProfileScreen from "../screens/SetupProfile";
import SelectCountryScreen from "../screens/SetupProfile/SelectCountry";
import PersonalInfoScreen from "../screens/SetupProfile/SetupProfile";
import EducationScreen from "../screens/SetupProfile/SchoolingDetails";
import ExperienceTypeScreen from "../screens/SetupProfile/ExperienceType";
import InternshipDetails from "../screens/SetupProfile/InternshipDetails";
import IndustrySelectionScreen from "../screens/SetupProfile/IndustrySelection";
import InternshipTypeScreen from "../screens/SetupProfile/InternshipType";
import ProjectAcademic from "../screens/SetupProfile/ProjectAcademic";
import AreasOfInterestScreen from "../screens/SetupProfile/AreasOfInterestScreen";
import ProfilePhotoScreen from "../screens/SetupProfile/ProfilePhoto";
import CertificationScreen from "../screens/SetupProfile/Certification";

// Screen Options
const headerCardOptions = {
  headerShown: true,
  presentation: "card" as const,
  headerShadowVisible: false,
};

const modalOptions = {
  headerShown: true,
  presentation: "modal" as const,
  headerShadowVisible: false,
};

const containedModalOptions = {
  headerShown: true,
  presentation: "containedModal" as const,
  headerShadowVisible: false,
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      {/* 🔄 Splash and Main Entry */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeTab} />

      {/* 🔐 Auth Screens */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccountScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />

      {/* 👤 Profile Setup Screens */}
      <Stack.Screen name="SetupProfile" component={SetupProfileScreen} options={headerCardOptions} />
      <Stack.Screen name="SelectCountry" component={SelectCountryScreen} options={headerCardOptions} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={headerCardOptions} />
      <Stack.Screen name="Education" component={EducationScreen} options={headerCardOptions} />
      <Stack.Screen name="ExperienceType" component={ExperienceTypeScreen} options={headerCardOptions} />
      <Stack.Screen name="Internship_Experience_Details" component={InternshipDetails} options={headerCardOptions} />
      <Stack.Screen name="Certification" component={CertificationScreen} options={headerCardOptions} />
      <Stack.Screen name="ProjectAcademic" component={ProjectAcademic} options={headerCardOptions} />
      <Stack.Screen name="AreasOfInterest" component={AreasOfInterestScreen} options={headerCardOptions} />

      {/* 📄 Modals */}
      <Stack.Screen name="IndustrySelection" component={IndustrySelectionScreen} options={modalOptions} />
      <Stack.Screen name="InternshipType" component={InternshipTypeScreen} options={modalOptions} />
      <Stack.Screen name="ProfilePhoto" component={ProfilePhotoScreen} options={containedModalOptions} />
    </Stack.Navigator>
  );
};

export default RootStack;
