import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { BIO_PLATFORMS, BIO_TONES } from "../../lib/bio-options";
import { formatCount, formatMessage, messages } from "../../lib/i18n";
import type { Locale, PlatformId, ToneId } from "../../lib/i18n";
import { OptionGroup } from "./OptionGroup";

const MAX_ABOUT_LENGTH = 2000;

interface BioFormProps {
  aboutYou: string;
  error: string | null;
  generating: boolean;
  locale: Locale;
  platform: PlatformId;
  tone: ToneId;
  onAboutYouChange: (value: string) => void;
  onGenerate: () => void;
  onPlatformChange: (value: PlatformId) => void;
  onToneChange: (value: ToneId) => void;
}

export function BioForm({
  aboutYou,
  error,
  generating,
  locale,
  platform,
  tone,
  onAboutYouChange,
  onGenerate,
  onPlatformChange,
  onToneChange,
}: BioFormProps) {
  const copy = messages[locale];
  const isPersian = locale === "fa";

  return (
    <View style={styles.card}>
      <OptionGroup
        labels={copy.platforms}
        onSelect={onPlatformChange}
        options={BIO_PLATFORMS.map(({ value }) => value)}
        selected={platform}
        title={copy.mobile.choosePlatform}
      />
      <OptionGroup
        labels={copy.tones}
        onSelect={onToneChange}
        options={BIO_TONES}
        selected={tone}
        title={copy.mobile.chooseTone}
      />
      <View style={styles.inputGroup}>
        <Text style={[styles.label, isPersian && styles.textRight]}>
          {copy.mobile.aboutYou}
        </Text>
        <TextInput
          accessibilityLabel={copy.bio.aboutLabel}
          maxLength={MAX_ABOUT_LENGTH}
          multiline
          onChangeText={onAboutYouChange}
          placeholder={copy.mobile.aboutPlaceholder}
          placeholderTextColor="#8a8fa0"
          style={[
            styles.input,
            isPersian && styles.textRight,
            isPersian && styles.inputRtl,
          ]}
          textAlignVertical="top"
          value={aboutYou}
        />
        <Text style={[styles.counter, isPersian && styles.textRight]}>
          {formatMessage(copy.bio.characterCount, {
            count: formatCount(aboutYou.length, locale),
            limit: formatCount(MAX_ABOUT_LENGTH, locale),
          })}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={!aboutYou.trim() || generating}
        onPress={onGenerate}
        style={[
          styles.generateButton,
          (!aboutYou.trim() || generating) && styles.disabledButton,
        ]}
      >
        {generating ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.generateButtonText}>{copy.mobile.generate}</Text>
        )}
      </Pressable>

      {error ? (
        <Text
          accessibilityLiveRegion="polite"
          style={[styles.error, isPersian && styles.textRight]}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e6e6eb",
    borderRadius: 18,
    borderWidth: 1,
    gap: 20,
    padding: 16,
  },
  inputGroup: {
    gap: 9,
  },
  label: {
    color: "#222638",
    fontSize: 15,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#fbfbfc",
    borderColor: "#dfe1e8",
    borderRadius: 12,
    borderWidth: 1,
    color: "#222638",
    fontSize: 15,
    lineHeight: 22,
    minHeight: 128,
    padding: 13,
  },
  inputRtl: {
    writingDirection: "rtl",
  },
  counter: {
    color: "#777b88",
    fontSize: 12,
  },
  generateButton: {
    alignItems: "center",
    backgroundColor: "#5146e5",
    borderRadius: 12,
    justifyContent: "center",
    minHeight: 50,
    paddingHorizontal: 16,
  },
  disabledButton: {
    opacity: 0.55,
  },
  generateButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  error: {
    color: "#b42318",
    fontSize: 13,
  },
  textRight: {
    textAlign: "right",
  },
});
