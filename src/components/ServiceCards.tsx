import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ServiceCards = () => {
  const services = [
    {
      title: "Mount Kenya Expeditions",
      description:
        "Conquer Africa's second-highest peak with expert guidance through Sirimon, Chogoria, and Naro Moru routes.",
      image:
        "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "3-7 Days",
      difficulty: "Moderate to Challenging",
      price: "From $450",
      features: [
        "Professional guides",
        "All permits included",
        "Camping equipment",
        "Route flexibility",
      ],
    },
    {
      title: "Safari Adventures",
      description:
        "Witness the Big Five and experience Kenya's incredible wildlife in world-renowned national parks.",
      image:
        "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "2-10 Days",
      difficulty: "Easy to Moderate",
      price: "From $320",
      features: [
        "4WD safari vehicles",
        "Professional driver-guides",
        "Park fees included",
        "Customizable itineraries",
      ],
    },
    {
      title: "Custom Adventures",
      description:
        "Tailored experiences combining climbing, wildlife, and cultural encounters based on your preferences.",
      image:
        "https://images.unsplash.com/photo-1439886183900-e79ec0057170?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "1-14 Days",
      difficulty: "All Levels",
      price: "Custom Pricing",
      features: [
        "Personalized itineraries",
        "Flexible scheduling",
        "Private or group options",
        "Cultural experiences",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-white dark:from-gray-900 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            Choose Your Adventure
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From challenging mountain expeditions to relaxing safari
            experiences, we offer adventures for every type of traveler.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-md"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {service.price}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-green-800">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-300">
                      Duration:
                    </span>
                    <span className="font-semibold text-green-700 dark:text-gray-300">
                      {service.duration}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-300">
                      Difficulty:
                    </span>
                    <span className="font-semibold text-green-700 dark:text-gray-300">
                      {service.difficulty}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-600 dark:text-gray-300 flex items-center"
                    >
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
