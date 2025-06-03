"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.lamnguage) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md  shadow-lg border border-gray-200 z-50">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-4 text-left hover:bg-gray-100 flex items-center space-x-2 ${i18n.language === lang.code ? "bg-green-50 text-green-700" : ""}`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
