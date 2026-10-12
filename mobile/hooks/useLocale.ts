import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { useEffect, useState } from "react";

import type { Locale } from "../../lib/i18n";

const LOCALE_STORAGE_KEY = "einbio.locale";

function getDeviceLocale(): Locale {
  return getLocales()[0]?.languageCode?.toLowerCase() === "fa" ? "fa" : "en";
}

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(getDeviceLocale);
  const [localeLoaded, setLocaleLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => {
    let active = true;

    const loadLocale = async () => {
      try {
        const savedLocale = await AsyncStorage.getItem(LOCALE_STORAGE_KEY);
        if (active && (savedLocale === "en" || savedLocale === "fa")) {
          setLocaleState(savedLocale);
        }
      } catch (error) {
        console.error("Could not load the saved Ein Bio language.", error);
        if (active) setLoadFailed(true);
      } finally {
        if (active) setLocaleLoaded(true);
      }
    };

    void loadLocale();
    return () => {
      active = false;
    };
  }, []);

  const setLocale = async (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    setSaveFailed(false);

    try {
      await AsyncStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
      setLoadFailed(false);
    } catch (error) {
      console.error("Could not save the Ein Bio language.", error);
      setSaveFailed(true);
    }
  };

  return { locale, localeLoaded, loadFailed, saveFailed, setLocale };
}
