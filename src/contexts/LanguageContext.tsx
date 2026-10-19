import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { loadData, saveData, LOCALSTORAGE_KEYS } from "@/shared";

export const LANGUAGES = [
  { code: 'sv', label: 'Svenska' },
  { code: 'en', label: 'English' }
] as const;

type Language = (typeof LANGUAGES)[number]['code'];


type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return loadData<Language>(LOCALSTORAGE_KEYS.LANGUAGE_OPTION) ?? "en";
  });

  useEffect(() => {
    saveData(LOCALSTORAGE_KEYS.LANGUAGE_OPTION, language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};