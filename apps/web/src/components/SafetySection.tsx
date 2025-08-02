import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SafetySection = () => {
  const safetyFeatures = [
    {
      title: "Professional Equipment",
      description:
        "High-quality mountaineering and safari equipment, regularly inspected and maintained to international standards.",
      icon: "🎒",
    },
    {
      title: "Emergency Protocols",
      description:
        "Comprehensive emergency procedures including evacuation plans, satellite communication, and partnerships with rescue services.",
      icon: "🚑",
    },
    {
      title: "Weather Monitoring",
      description:
        "Real-time weather tracking and route adjustments to ensure safe conditions throughout your adventure.",
      icon: "🌤️",
    },
    {
      title: "Medical Support",
      description:
        "First aid certified guides, medical kits on all expeditions, and partnerships with local medical facilities.",
      icon: "⚕️",
    },
    {
      title: "Risk Assessment",
      description:
        "Thorough pre-expedition briefings, route planning, and continuous risk evaluation during activities.",
      icon: "📋",
    },
    {
      title: "Insurance Coverage",
      description:
        "Comprehensive insurance recommendations and guidance on coverage for high-altitude and wildlife activities.",
      icon: "🛡️",
    },
  ];

  const emergencyContacts = [
    { service: "Kenya Emergency Services", number: "999" },
    { service: "Tourist Police", number: "+254 20 341 6000" },
    { service: "Kenya Wildlife Service", number: "+254 20 600 0800" },
    { service: "Mount Kenya National Park", number: "+254 62 31439" },
  ];

  return (
    <section
      id="safety"
      className="py-20 border-t border-green-700 bg-white  dark:from-gray-900 dark:bg-gray-800 boder-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            Your Safety is Our Priority
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive safety measures and emergency protocols ensure peace
            of mind throughout your adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {safetyFeatures.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <CardTitle className="text-green-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-green-800 mb-6">
              Safety Requirements
            </h3>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">
                  Medical Requirements
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Valid travel insurance with high-altitude coverage</li>
                  <li>
                    • Yellow fever vaccination certificate (if applicable)
                  </li>
                  <li>• Basic fitness level assessment</li>
                  <li>
                    • Medical history disclosure for high-altitude activities
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-700 mb-2">
                  Pre-Expedition Briefing
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Safety protocols and emergency procedures</li>
                  <li>• Equipment familiarization and safety checks</li>
                  <li>• Route planning and weather conditions</li>
                  <li>• Communication procedures and check-in times</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-800 mb-6">
              Emergency Contacts
            </h3>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-700">
                    {contact.service}
                  </span>
                  <span className="font-semibold text-green-700">
                    {contact.number}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">
                24/7 Emergency Support
              </h4>
              <p className="text-sm text-red-700 mb-2">
                For expedition emergencies, contact our guide directly:
              </p>
              <p className="font-semibold text-red-800">+254 xxx xxx xxx</p>
              <p className="text-xs text-red-600 mt-2">
                Available via voice call, SMS, or WhatsApp during expeditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
