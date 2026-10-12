import { StyleSheet, Text, View } from "react-native";

import { messages } from "../../lib/i18n";
import type { Locale } from "../../lib/i18n";

export function AppIntro({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const isPersian = locale === "fa";

  return (
    <View style={styles.intro}>
      <Text style={[styles.eyebrow, isPersian && styles.textRight]}>
        {copy.bio.eyebrow}
      </Text>
      <Text
        accessibilityRole="header"
        style={[styles.title, isPersian && styles.textRight]}
      >
        {copy.bio.title}
      </Text>
      <Text style={[styles.description, isPersian && styles.textRight]}>
        {copy.bio.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  intro: {
    gap: 8,
  },
  eyebrow: {
    color: "#5146e5",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  title: {
    color: "#1b1d2a",
    fontSize: 25,
    fontWeight: "800",
    lineHeight: 33,
  },
  description: {
    color: "#626675",
    fontSize: 14,
    lineHeight: 21,
  },
  textRight: {
    textAlign: "right",
  },
});
