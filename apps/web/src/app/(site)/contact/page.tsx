import Header from "@/components/Header";

// import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <>
      {/* <SEO
        title="Contact Kenya Trek Adventures | Plan Your Safari & Expedition"
        description="Get in touch with Kenya Trek Adventures to plan your Mount Kenya expedition or safari tour. Expert guidance and personalized service."
        keywords="contact, Kenya Trek Adventures, safari booking, Mount Kenya tours, travel planning"
      /> */}
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-16">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            }}
          />

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact
              <span className="block text-orange-400">Us</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Ready to plan your Kenyan adventure? Get in touch with our expert
              team.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
                  <Send className="h-6 w-6" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Tell us about your dream adventure and we will create a
                  personalized itinerary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Adventure Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white">
                      <option>Select your adventure</option>
                      <option>Mount Kenya Expedition</option>
                      <option>Wildlife Safari</option>
                      <option>Day Trip</option>
                      <option>Custom Adventure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Tell us about your ideal adventure, dates, group size, and any special requirements..."
                    ></textarea>
                  </div>

                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {/*<Card className="bg-white dark:bg-gray-800">*/}
              {/*  <CardHeader>*/}
              {/*    <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">*/}
              {/*      <MapPin className="h-6 w-6" />*/}
              {/*      Visit Our Office*/}
              {/*    </CardTitle>*/}
              {/*  </CardHeader>*/}
              {/*  <CardContent>*/}
              {/*    <p className="text-gray-600 dark:text-gray-300 mb-4">*/}
              {/*      Kenya Trek Adventures*/}
              {/*      <br />*/}
              {/*      Westlands Business Center*/}
              {/*      <br />*/}
              {/*      Nairobi, Kenya*/}
              {/*      <br />*/}
              {/*      P.O. Box 12345-00100*/}
              {/*    </p>*/}
              {/*    <Button*/}
              {/*      variant="outline"*/}
              {/*      className="border-green-600 text-green-600 hover:bg-green-50"*/}
              {/*    >*/}
              {/*      Get Directions*/}
              {/*    </Button>*/}
              {/*  </CardContent>*/}
              {/*</Card>*/}

              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
                    <Phone className="h-6 w-6" />
                    Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Main Office:</strong> +254 700 123 456
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    <strong>Emergency:</strong> +254 700 654 321
                  </p>
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Call Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
                    <Mail className="h-6 w-6" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>General:</strong> info@kenyatrekadventures.com
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    <strong>Bookings:</strong> bookings@kenyatrekadventures.com
                  </p>
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Send Email
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-green-700 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-6 w-6" />
                    WhatsApp Booking
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Get instant responses and quick booking assistance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Chat with our team for immediate assistance and real-time
                    booking support.
                  </p>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    Chat on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Office Hours */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Card className="bg-green-50 dark:bg-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-green-800 dark:text-green-400">
                <Clock className="h-6 w-6" />
                Office Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                    Regular Hours
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monday - Friday: 8:00 AM - 6:00 PM
                    <br />
                    Saturday: 9:00 AM - 4:00 PM
                    <br />
                    Sunday: 10:00 AM - 2:00 PM
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                    Emergency Support
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    24/7 emergency assistance available
                    <br />
                    for all active expeditions and safaris
                    <br />
                    Emergency hotline: +254 700 654 321
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
};

export default Contact;
