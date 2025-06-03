import Image from "next/image";
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      country: "United States",
      expedition: "Mount Kenya - Sirimon Route",
      rating: 5,
      comment:
        "Absolutely incredible experience! Our guide was knowledgeable, safety-focused, and made the challenging climb achievable. The views from Point Lenana were breathtaking.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "James Mitchell",
      country: "United Kingdom",
      expedition: "Maasai Mara Safari",
      rating: 5,
      comment:
        "We witnessed the Great Migration and saw all of the Big Five! The cultural visit to a Maasai village was a highlight. Professional service from start to finish.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Maria Rodriguez",
      country: "Spain",
      expedition: "Custom Adventure",
      rating: 5,
      comment:
        "They created a perfect 7-day itinerary combining Mount Kenya climbing with Amboseli safari. Excellent organization and unforgettable memories!",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            What Our Adventurers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from travelers who've explored Kenya with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-green-50 to-orange-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
                <div>
                  <h3 className="font-semibold text-green-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">{testimonial.country}</p>
                </div>
              </div>

              <div className="mb-3">{renderStars(testimonial.rating)}</div>

              <p className="text-gray-700 mb-4 italic">
                "{testimonial.comment}"
              </p>

              <div className="text-sm text-orange-600 font-medium">
                {testimonial.expedition}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 text-green-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">4.9/5</div>
              <div className="text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">200+</div>
              <div className="text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">15+</div>
              <div className="text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
