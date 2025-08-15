import { Alert } from "react-native";
import { getAuth, signOut } from '@react-native-firebase/auth';

type ToastFunction = (title: string, message: string) => void;

export const confirmSignOut = (showInfoToast: ToastFunction) => {
  const auth = getAuth();

  const performSignOut = async () => {
    try {
      await signOut(auth);
      showInfoToast("Signed out", "You have been signed out successfully");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
        showInfoToast("Error", errorMessage); 
        console.error("Sign-out error:", error);
    }
  };

  Alert.alert(
    "Confirm Sign Out",
    "Are you sure you want to sign out?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: performSignOut }
    ],
    { cancelable: false }
  );
};
