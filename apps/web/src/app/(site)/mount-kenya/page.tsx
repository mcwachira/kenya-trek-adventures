import Header from "@/components/Header";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mountain, Clock, CheckCircle } from "lucide-react";

const MountKenya = () => {
  const routes = [
    {
      name: "Sirimon-Chogoria Route",
      duration: "5 Days",
      difficulty: "Moderate",
      price: "$850",
      description:
        "The most scenic route combining the best of both Sirimon and Chogoria paths",
    },
    {
      name: "Naro Moru Route",
      duration: "4 Days",
      difficulty: "Challenging",
      price: "$750",
      description:
        "The fastest route to Point Lenana, ideal for experienced hikers",
    },
    {
      name: "Chogoria Route",
      duration: "5 Days",
      difficulty: "Moderate",
      price: "$800",
      description: "The most beautiful route with stunning gorges and lakes",
    },
  ];

  const included = [
    "Professional mountain guide",
    "All park fees and permits",
    "Mountain hut accommodation",
    "All meals during trek",
    "Porter services",
    "Safety equipment",
    "Certificate of achievement",
  ];

  return (
    <>
      {/* <SEO
        title="Mount Kenya Expeditions | Professional Climbing Tours"
        description="Conquer Africa's second highest peak with our expert-guided Mount Kenya expeditions. Multiple routes available for all skill levels."
        keywords="Mount Kenya, climbing, Point Lenana, expedition, mountain guide, Kenya hiking"
      /> */}
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            }}
          />

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mount Kenya
              <span className="block text-orange-400">Expeditions</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Challenge yourself on Africa&apos;s second highest peak. Multiple
              routes to Point Lenana (4,985m) with expert guides.
            </p>
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg"
            >
              Book Your Expedition
            </Button>
          </div>
        </section>

        {/* Routes Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-400 mb-4">
              Choose Your Route
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Each route offers unique experiences and challenges. All lead to
              Point Lenana summit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {routes.map((route, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
                    <Mountain className="h-6 w-6" />
                    {route.name}
                  </CardTitle>
                  <CardDescription>{route.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4" />
                        {route.duration}
                      </span>
                      <span className="text-sm font-medium text-orange-600">
                        {route.difficulty}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-800 dark:text-green-400">
                      {route.price}
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {" "}
                        / person
                      </span>
                    </div>
                    <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-green-50 dark:bg-gray-800 rounded-2xl my-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-4">
              What&apos;s Included
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need for a safe and successful summit attempt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default MountKenya;
