import type { ConfigContext, ExpoConfig } from "expo/config";

const GOOGLE_TEST_APP_ID = "ca-app-pub-3940256099942544~3347511713";

export default ({ config }: ConfigContext): ExpoConfig => {
  const isProduction = process.env.BUILD_VARIANT === "production";
  const androidAppId =
    process.env.ADMOB_ANDROID_APP_ID ??
    (isProduction ? undefined : GOOGLE_TEST_APP_ID);
  const bannerUnitId = process.env.EXPO_PUBLIC_ADMOB_BANNER_ID;

  if (isProduction && !androidAppId) {
    throw new Error("ADMOB_ANDROID_APP_ID is required for production builds.");
  }
  if (isProduction && !bannerUnitId) {
    throw new Error(
      "EXPO_PUBLIC_ADMOB_BANNER_ID is required for production builds.",
    );
  }

  return {
    ...config,
    name: config.name ?? "Ein Bio",
    slug: config.slug ?? "einbio",
    version: config.version ?? "1.0.0",
    plugins: [
      ...(config.plugins ?? []),
      [
        "react-native-google-mobile-ads",
        {
          androidAppId,
          delayAppMeasurementInit: true,
        },
      ],
    ],
  };
};
