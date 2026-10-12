import { Pressable, StyleSheet, Text, View } from "react-native";

import type { PlatformId, ToneId } from "../../lib/i18n";

type OptionId = PlatformId | ToneId;

interface OptionGroupProps<Option extends OptionId> {
  labels: Pick<Record<OptionId, string>, Option>;
  options: readonly Option[];
  selected: Option;
  title: string;
  onSelect: (value: Option) => void;
}

export function OptionGroup<Option extends OptionId>({
  labels,
  options,
  selected,
  title,
  onSelect,
}: OptionGroupProps<Option>) {
  return (
    <View style={styles.group}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.options}>
        {options.map((option) => {
          const isSelected = option === selected;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              key={option}
              onPress={() => onSelect(option)}
              style={[styles.option, isSelected && styles.selectedOption]}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.selectedOptionText,
                ]}
              >
                {labels[option]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 10,
  },
  title: {
    color: "#222638",
    fontSize: 15,
    fontWeight: "700",
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    backgroundColor: "#f0f1f5",
    borderColor: "#e0e2e9",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  selectedOption: {
    backgroundColor: "#eef0ff",
    borderColor: "#5146e5",
  },
  optionText: {
    color: "#414658",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedOptionText: {
    color: "#4338ca",
    fontWeight: "700",
  },
});
