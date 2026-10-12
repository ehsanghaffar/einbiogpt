import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { messages } from "../lib/i18n";
import type { Locale, PlatformId, ToneId } from "../lib/i18n";
import { AdConsentBanner } from "./components/AdConsentBanner";
import { AppHeader } from "./components/AppHeader";
import { AppIntro } from "./components/AppIntro";
import { BioForm } from "./components/BioForm";
import { BioResultCard } from "./components/BioResultCard";
import { InfoLinks } from "./components/InfoLinks";
import type { BioRequest, GeneratedBio } from "./lib/api";
import { requestBio } from "./lib/api";
import { useLocale } from "./hooks/useLocale";

export default function App() {
  const { locale, localeLoaded, loadFailed, saveFailed, setLocale } = useLocale();
  const [platform, setPlatform] = useState<PlatformId>("instagram");
  const [tone, setTone] = useState<ToneId>("friendly");
  const [aboutYou, setAboutYou] = useState("");
  const [lastRequest, setLastRequest] = useState<BioRequest | null>(null);
  const [result, setResult] = useState<GeneratedBio | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = messages[locale];
  const isPersian = locale === "fa";

  const generate = async (request: BioRequest) => {
    if (generating) return;

    setLastRequest(request);
    setGenerating(true);
    setError(null);
    setResult(null);
    setCopied(false);
    try {
      setResult(await requestBio(request, locale));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : copy.bio.errorUnexpected,
      );
    } finally {
      setGenerating(false);
    }
  };

  const copyBio = async () => {
    if (!result) return;

    try {
      const { setStringAsync } = await import("expo-clipboard");
      await setStringAsync(result.bio);
      setCopied(true);
      setError(null);
    } catch (clipboardError) {
      console.error("Could not copy the generated Ein Bio text.", clipboardError);
      setError(copy.mobile.clipboardError);
    }
  };

  const openExternalPage = (url: string) => {
    void Linking.openURL(url).catch((openError: unknown) => {
      console.error("Could not open the Ein Bio information page.", openError);
      setError(copy.bio.errorUnexpected);
    });
  };

  const onGenerate = () =>
    void generate({ aboutYou: aboutYou.trim(), platform, tone });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <AppHeader
          locale={locale}
          localeLoaded={localeLoaded}
          onToggleLocale={() => void setLocale(locale === "en" ? "fa" : "en")}
        />
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <AppIntro locale={locale} />
          <BioForm
            aboutYou={aboutYou}
            error={error}
            generating={generating}
            locale={locale}
            onAboutYouChange={setAboutYou}
            onGenerate={onGenerate}
            onPlatformChange={setPlatform}
            onToneChange={setTone}
            platform={platform}
            tone={tone}
          />
          {saveFailed || loadFailed ? (
            <Text
              accessibilityLiveRegion="polite"
              style={[styles.storageError, isPersian && styles.textRight]}
            >
              {saveFailed
                ? copy.mobile.localeSaveError
                : copy.mobile.localeLoadError}
            </Text>
          ) : null}
          {result ? (
            <BioResultCard
              copied={copied}
              locale={locale}
              onCopy={() => void copyBio()}
              onRegenerate={() => {
                if (lastRequest) void generate(lastRequest);
              }}
              result={result}
            />
          ) : null}
          <InfoLinks locale={locale} onOpen={openExternalPage} />
        </ScrollView>
      </KeyboardAvoidingView>
      <AdConsentBanner locale={locale} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: "#faf9f7",
    flex: 1,
  },
  content: {
    gap: 18,
    padding: 18,
    paddingBottom: 28,
  },
  storageError: {
    color: "#b42318",
    fontSize: 13,
  },
  textRight: {
    textAlign: "right",
  },
});
