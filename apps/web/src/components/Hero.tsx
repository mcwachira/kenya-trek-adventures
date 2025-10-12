"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "@/assets/hero-background.jpg";
import { useTranslation } from "react-i18next";

interface HeroProps {
  onBookNow: () => void;
}

const Hero = ({ onBookNow }: HeroProps) => {
  const { t } = useTranslation();
  console.log("HeroImage:", HeroImage);
  return (
    <section className="relative min-h-screen  flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImage}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          {t("hero.title")}
          <span className="block text-orange-400">{t("hero.subtitle")}</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          {t("hero.description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            onClick={onBookNow}
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            {t("hero.bookAdventure")}
          </Button>

          <Link href="/mount-kenya">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-800 px-8 py-4 text-lg font-semibold"
            >
              {t("hero.viewExpeditions")}
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">500+</div>
            <div className="text-sm text-gray-300">
              {t("hero.stats.expeditions")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">15+</div>
            <div className="text-sm text-gray-300">
              {t("hero.stats.experience")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">98%</div>
            <div className="text-sm text-gray-300">
              {t("hero.stats.satisfaction")}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white" size={32} />
      </div>
    </section>
  );
};

export default Hero;
