"use client";
import BookingCalendar from "@/components/BookingCalendaer";
import FeaturedExpeditions from "@/components/FeaturedExpeditions";
import GuideProfile from "@/components/GuideProfile";
import Hero from "@/components/Hero";
import SafetySection from "@/components/SafetySection";
import ServiceCards from "@/components/ServiceCards";
import Testimonials from "@/components/Testimonials";
import { useState } from "react";

export default function Home() {
  const [showBooking, setShowBooking] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <Hero onBookNow={() => setShowBooking(true)} />
      <ServiceCards />
      <FeaturedExpeditions />
      {showBooking && <BookingCalendar onClose={() => setShowBooking(false)} />}
      {/*<Testimonials />*/}
      <GuideProfile />
      <SafetySection />
    </div>
  );
}
