import { Pressable, StyleSheet, Text, View } from "react-native";

import { messages } from "../../lib/i18n";
import type { Locale } from "../../lib/i18n";

interface InfoLinksProps {
  locale: Locale;
  onOpen: (url: string) => void;
}

export function InfoLinks({ locale, onOpen }: InfoLinksProps) {
  const copy = messages[locale].mobile;
  const isPersian = locale === "fa";

  return (
    <View style={[styles.links, isPersian && styles.rowReverse]}>
      <Pressable
        accessibilityRole="link"
        onPress={() => onOpen("https://bekservice.uk/einbiogpt/privacy/")}
      >
        <Text style={styles.link}>{copy.privacyPolicy}</Text>
      </Pressable>
      <Pressable
        accessibilityRole="link"
        onPress={() => onOpen("https://bekservice.uk/einbiogpt/support/")}
      >
        <Text style={styles.link}>{copy.support}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  links: {
    flexDirection: "row",
    gap: 18,
    justifyContent: "center",
    paddingVertical: 4,
  },
  link: {
    color: "#5146e5",
    fontSize: 12,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
});
