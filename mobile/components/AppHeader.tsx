import { Pressable, StyleSheet, Text, View, Image } from "react-native";

import { messages } from "../../lib/i18n";
import type { Locale } from "../../lib/i18n";

interface AppHeaderProps {
  locale: Locale;
  localeLoaded: boolean;
  onToggleLocale: () => void;
}

export function AppHeader({
  locale,
  localeLoaded,
  onToggleLocale,
}: AppHeaderProps) {
  const copy = messages[locale];
  const isPersian = locale === "fa";

  return (
    <View style={[styles.header, isPersian && styles.rowReverse]}>
      <View style={[styles.brand, isPersian && styles.rowReverse]}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
        <View>
          <Text style={styles.brandName}>Ein Bio</Text>
          <Text style={styles.brandSubtitle}>{copy.mobile.subtitle}</Text>
        </View>
      </View>
      <Pressable
        accessibilityLabel={copy.common.switchLanguage}
        accessibilityRole="button"
        disabled={!localeLoaded}
        onPress={onToggleLocale}
        style={styles.languageButton}
      >
        <Text style={styles.languageButtonText}>
          {locale === "en" ? "فارسی" : "English"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    borderBottomColor: "#e7e6e2",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  brand: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  logo: {
    borderRadius: 10,
    height: 42,
    width: 42,
  },
  brandName: {
    color: "#1b1d2a",
    fontSize: 17,
    fontWeight: "800",
  },
  brandSubtitle: {
    color: "#696d7a",
    fontSize: 11,
    marginTop: 2,
  },
  languageButton: {
    backgroundColor: "#ffffff",
    borderColor: "#dedfe6",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  languageButtonText: {
    color: "#3c3e4b",
    fontSize: 13,
    fontWeight: "700",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
});
