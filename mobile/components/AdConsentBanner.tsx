import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import mobileAds, {
  AdsConsent,
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import type { Locale } from "../../lib/i18n";
import { messages } from "../../lib/i18n";

interface AdConsentBannerProps {
  locale: Locale;
}

export function AdConsentBanner({ locale }: AdConsentBannerProps) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const copy = messages[locale].mobile;
  const configuredBannerId = process.env.EXPO_PUBLIC_ADMOB_BANNER_ID;
  const bannerId = __DEV__ ? TestIds.BANNER : configuredBannerId;

  useEffect(() => {
    let active = true;

    const gatherConsentAndStartAds = async () => {
      let consentUpdateFailed = false;
      try {
        await AdsConsent.gatherConsent();
      } catch (error) {
        consentUpdateFailed = true;
        console.error("Could not gather ads consent.", error);
      }

      if (!active) return;

      try {
        const { canRequestAds } = await AdsConsent.getConsentInfo();
        if (!canRequestAds) {
          if (consentUpdateFailed) setFailed(true);
          return;
        }

        await mobileAds().initialize();
        if (active) setReady(true);
      } catch (error) {
        console.error("Could not initialize Google Mobile Ads.", error);
        if (active) setFailed(true);
      }
    };

    void gatherConsentAndStartAds();

    return () => {
      active = false;
    };
  }, []);

  if (failed) {
    return (
      <Text accessibilityLiveRegion="polite" style={styles.message}>
        {copy.adsUnavailable}
      </Text>
    );
  }
  if (!ready || !bannerId) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{copy.advertisement}</Text>
      <BannerAd
        onAdFailedToLoad={() => setFailed(true)}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        unitId={bannerId}
        size={BannerAdSize.BANNER}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderTopColor: "#e5e7eb",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 4,
    paddingTop: 6,
  },
  label: {
    color: "#6b7280",
    fontSize: 10,
    marginBottom: 2,
    textTransform: "uppercase",
  },
  message: {
    color: "#6b7280",
    fontSize: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    textAlign: "center",
  },
});
