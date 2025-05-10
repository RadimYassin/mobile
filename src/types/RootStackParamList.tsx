export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerifyAccount: undefined;
  Success: undefined;
  Home: undefined;
  Messages: undefined;
  ChatScreen: { id: string }; 
  ProfileScreen: undefined;
  PreferencesScreen: undefined;
  ProfileSetupScreen: undefined;
  AccountScreen: undefined;
  PrivacyScreen: undefined;
  NotificationsScreen: undefined;
  SupportScreen: undefined;
  FilterInternships: undefined;
  InternshipDetails: { internshipId: string, companyId: string };
  ViewInternships: undefined;
  ApplyForInternship: {id:string, visible: boolean; onClose: () => void; onSubmit: () => void, companyId: string , internshipId: string};

  SetupProfile: undefined;
  SelectCountry   : undefined;
  PersonalInfo: undefined;
  Education: undefined;
  ExperienceType: undefined;
  InternshipExperience: undefined;
  WorkingExperience: undefined;

  Internship_Experience_Details: undefined;
  IndustrySelection: undefined;
  InternshipType: undefined;
  ProjectAcademic: undefined;
  AreasOfInterest: undefined;
  ProfilePhoto: undefined;
  Certification: undefined;
  Post:undefined;
  // <Stack.Screen name="PostDetails" component={} options={{ title: 'Post Details' }} />
  PostDetails: { post: any }; 
  NewPost:undefined;
  Notification: undefined;

  EditProfile: undefined;
};

