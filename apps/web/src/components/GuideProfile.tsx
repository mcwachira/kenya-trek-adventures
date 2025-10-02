"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Guide from "@/assets/machua.jpg"

const GuideProfile = () => {
  const certifications = [
    "Kenya Association of Tour Operators (KATO)",
    "Wilderness First Aid Certified",
    "Mountain Leader Qualification",
    "Kenya Professional Safari Guide License",
  ];

  const languages = ["English", "Swahili", "Basic German", "Basic French"];

  return (
    <section
      id="about"
      className="py-20 border-t border-green-700 dark:text-white  dark:from-gray-900 dark:bg-gray-800 "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-green-800  mb-6">
              Meet Your Expert Guide
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-green-700  mb-3">
                  Nelson Machua
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  With over 15 years of experience guiding adventurers through
                  Kenya`&lsquo;`s most spectacular landscapes, David combines
                  deep local knowledge with international safety standards to
                  create unforgettable experiences.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-3">
                  Experience Highlights
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    500+ successful Mount Kenya summits
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    Led expeditions for clients from 35+ countries
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    Expert in wildlife tracking and behavior
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    Certified in high-altitude rescue techniques
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-3">
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-3">
                  Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-orange-300 text-orange-700 dark:text-gray-300"
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Image container with a fixed height so Next/Image can fill */}
            <div className="relative w-full h-96 rounded-xl shadow-2xl overflow-hidden">
              <Image
                src={Guide}
                alt="Nelson Machua - Professional Safari Guide"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-xl shadow-lg z-20">
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years Guiding</div>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-green-700 text-white p-6 rounded-xl shadow-lg z-20">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm">Expeditions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideProfile;
