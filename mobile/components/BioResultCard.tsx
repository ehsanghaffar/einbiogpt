import { Pressable, StyleSheet, Text, View } from "react-native";

import { messages } from "../../lib/i18n";
import type { Locale } from "../../lib/i18n";
import type { GeneratedBio } from "../lib/api";

interface BioResultCardProps {
  copied: boolean;
  locale: Locale;
  result: GeneratedBio;
  onCopy: () => void;
  onRegenerate: () => void;
}

export function BioResultCard({
  copied,
  locale,
  result,
  onCopy,
  onRegenerate,
}: BioResultCardProps) {
  const copy = messages[locale];
  const isPersian = locale === "fa";

  return (
    <View style={styles.card}>
      <Text
        accessibilityRole="header"
        style={[styles.title, isPersian && styles.textRight]}
      >
        {copy.mobile.outputTitle}
      </Text>
      <Text
        selectable
        style={[
          styles.result,
          isPersian && styles.textRight,
          isPersian && styles.inputRtl,
        ]}
      >
        {result.bio}
      </Text>
      {result.note ? (
        <Text style={[styles.note, isPersian && styles.textRight]}>
          {result.note}
        </Text>
      ) : null}
      <View style={[styles.actions, isPersian && styles.rowReverse]}>
        <Pressable
          accessibilityRole="button"
          onPress={onCopy}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>
            {copied ? copy.mobile.copied : copy.mobile.copy}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onRegenerate}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>
            {copy.mobile.regenerate}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#dfe1e8",
    borderRadius: 18,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  title: {
    color: "#222638",
    fontSize: 17,
    fontWeight: "800",
  },
  result: {
    color: "#303443",
    fontSize: 16,
    lineHeight: 25,
  },
  inputRtl: {
    writingDirection: "rtl",
  },
  note: {
    color: "#6b7280",
    fontSize: 12,
    lineHeight: 18,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: "#f0f1f5",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: "#373a4b",
    fontSize: 13,
    fontWeight: "700",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  textRight: {
    textAlign: "right",
  },
});
