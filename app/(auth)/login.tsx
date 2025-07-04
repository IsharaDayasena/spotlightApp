/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "@/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useSSO } from "@clerk/clerk-expo";

export default function login() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("OAuthError:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Brand Section*/}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>Spotlight</Text>
        <Text style={styles.tagline}> Don't miss anything</Text>
      </View>
      {/* Illustration*/}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/login.png")}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Login Section*/}

      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>
          <Text>Continue with Google</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By continuing,you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
