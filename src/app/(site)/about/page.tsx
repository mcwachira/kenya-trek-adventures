import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Mountain,
  Users,
  Award,
  Globe,
  Heart,
  Shield,
  Star,
  Clock,
} from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Happy Clients", value: "2,500+" },
    { icon: Mountain, label: "Tours Completed", value: "1,200+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: Globe, label: "Destinations", value: "20+" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Adventure",
      description:
        "We live and breathe adventure, sharing our love for Kenya's wild places with every guest.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Your safety is our top priority. All our guides are certified and our equipment is top-quality.",
    },
    {
      icon: Star,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our service, from planning to execution.",
    },
    {
      icon: Globe,
      title: "Conservation",
      description:
        "We're committed to sustainable tourism that benefits local communities and protects wildlife.",
    },
  ];

  // const team = [
  //   {
  //     name: "Nelson Machua",
  //     role: "Founder & Lead Guide",
  //     experience: "15+ years",
  //     specialties: ["Mount Kenya", "Wildlife Photography"],
  //     image:
  //       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  //   },
  //   {
  //     name: "Sarah Wanjiku",
  //     role: "Safari Guide & Wildlife Expert",
  //     experience: "12+ years",
  //     specialties: ["Big Five Tracking", "Bird Watching"],
  //     image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  //   },
  //   {
  //     name: "David Kiprop",
  //     role: "Mountain Guide",
  //     experience: "10+ years",
  //     specialties: ["Technical Climbing", "High Altitude Trekking"],
  //     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  //   }
  // ];

  return (
    <div className="min-h-screen  bg-gradient-to-b from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About
            <span className="block text-orange-400">Kenya Trek Adventures</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Your trusted partner for authentic African adventures since 2009.
            Experience Kenya&apos;s wonders with passionate local experts.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-400 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Founded in 2009 by passionate mountain guide Nelson Machua,
                Kenya Trek Adventures began with a simple vision: to share the
                incredible beauty and adventure opportunities of Kenya with
                travelers from around the world.
              </p>
              <p>
                What started as small Mount Kenya expeditions has grown into a
                comprehensive adventure tourism company, offering everything
                from challenging mountain climbs to wildlife safaris and
                cultural day trips.
              </p>
              <p>
                Today, we&apos;re proud to be one of Kenya&apos;s most trusted
                adventure tour operators, with a team of certified guides who
                are not just experts in their fields, but also passionate
                ambassadors for Kenya&apos;s natural heritage.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Kenya landscape"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-6 w-6" />
                <span className="text-2xl font-bold">15+</span>
              </div>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-green-50 dark:bg-gray-700 rounded-2xl my-16 ">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-4">
            Our Impact
          </h3>

          <p className="text-lg text-gray-600 dark:texy-gray-300">
            Numbers that speak to our commitment and experience
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-800 dark:text-green-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-4">
            Our Values
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow dark:bg-gray-700"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-green-800 dark:text-green-400">
                  {value.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-green-50 dark:bg-gray-800 rounded-2xl my-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-4">
            Our Services
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Comprehensive adventure experiences across Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mountain className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2">
              Mount Kenya Expeditions
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Professional guided climbs to Point Lenana via multiple routes.
              From beginner-friendly paths to challenging technical climbs.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2">
              Wildlife Safaris
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Experience Kenya&apos;s incredible wildlife in world-famous parks
              like Maasai Mara, Amboseli, and Tsavo.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2">
              Day Adventures
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Perfect for short visits. Explore Hell&apos;s Gate, Lake Nakuru,
              coffee farms, and cultural sites near Nairobi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
