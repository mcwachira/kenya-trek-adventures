import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        mountKenya: "Mount Kenya",
        safaris: "Safaris",
        dayTrips: "Day Trips",
        about: "About",
        safety: "Safety",
        contact: "Contact",
        bookNow: "Book Now",
      },
      hero: {
        title: "Discover Kenya's",
        subtitle: "Majestic Wilderness",
        description:
          "Expert-guided Mount Kenya expeditions and unforgettable safari adventures through Kenya's most spectacular national parks",
        bookAdventure: "Book Your Adventure",
        viewExpeditions: "View Expeditions",
        stats: {
          expeditions: "Successful Expeditions",
          experience: "Years Experience",
          satisfaction: "Client Satisfaction",
        },
      },
      services: {
        title: "Our Adventure Services",
        mountKenya: {
          title: "Mount Kenya Expeditions",
          description:
            "Multi-day climbing adventures to Point Lenana and beyond",
        },
        safaris: {
          title: "Wildlife Safaris",
          description:
            "Experience Kenya's incredible wildlife in their natural habitat",
        },
        dayTrips: {
          title: "Day Adventures",
          description:
            "Perfect for shorter visits and family-friendly experiences",
        },
      },
      testimonials: {
        title: "What Our Adventurers Say",
        subtitle:
          "Real experiences from travelers who've explored Kenya with us",
        rating: "Average Rating",
        clients: "Happy Clients",
        experience: "Years Experience",
      },
      footer: {
        description:
          "Your trusted partner for authentic Kenyan adventures. From Mount Kenya's peaks to the savannas of Maasai Mara, we create unforgettable experiences.",
        quickLinks: "Quick Links",
        destinations: "Popular Destinations",
        contact: "Contact Us",
        whatsapp: "WhatsApp Booking",
        whatsappDesc: "Quick inquiries and instant support",
        chatWhatsapp: "Chat on WhatsApp",
        copyright: "© 2024 Kenya Trek Adventures. All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        cancellation: "Cancellation Policy",
      },
    },
  },
  sw: {
    translation: {
      nav: {
        mountKenya: "Mlima Kenya",
        safaris: "Safari",
        dayTrips: "Ziara za Siku",
        about: "Kuhusu",
        safety: "Usalama",
        contact: "Mawasiliano",
        bookNow: "Hifadhi Sasa",
      },
      hero: {
        title: "Gundua",
        subtitle: "Mazingira Makuu ya Kenya",
        description:
          "Safari za mlima Kenya zenye mwongozi mkuu na machaguo yasiyosahaulika kupitia hifadhi za kitaifa za Kenya",
        bookAdventure: "Hifadhi Safari Yako",
        viewExpeditions: "Ona Safari",
        stats: {
          expeditions: "Safari Zilizofanikiwa",
          experience: "Miaka ya Uzoefu",
          satisfaction: "Kuridhika kwa Wateja",
        },
      },
      services: {
        title: "Huduma Zetu za Machaguo",
        mountKenya: {
          title: "Safari za Mlima Kenya",
          description:
            "Machaguo ya siku nyingi ya kupanda mlima hadi Point Lenana",
        },
        safaris: {
          title: "Safari za Wanyamapori",
          description:
            "Furahia wanyamapori wa ajabu wa Kenya katika mazingira yao asilia",
        },
        dayTrips: {
          title: "Machaguo ya Siku",
          description: "Bora kwa ziara fupi na uzoefu wa familia",
        },
      },
      testimonials: {
        title: "Wanachosema Watalii Wetu",
        subtitle:
          "Uzoefu wa kweli kutoka kwa wasafiri waliochunguza Kenya pamoja nasi",
        rating: "Kiwango cha Wastani",
        clients: "Wateja Wenye Furaha",
        experience: "Miaka ya Uzoefu",
      },
      footer: {
        description:
          "Mshirika wako wa kuaminika kwa machaguo halisi ya Kikenia. Kutoka vilele vya Mlima Kenya hadi nyanda za Maasai Mara, tunaunda uzoefu usiosahaulika.",
        quickLinks: "Viungo vya Haraka",
        destinations: "Maeneo Maarufu",
        contact: "Wasiliana Nasi",
        whatsapp: "Hifadhi kupitia WhatsApp",
        whatsappDesc: "Maswali ya haraka na msaada wa papo hapo",
        chatWhatsapp: "Ongea kwenye WhatsApp",
        copyright: "© 2024 Kenya Trek Adventures. Haki zote zimehifadhiwa.",
        privacy: "Sera ya Faragha",
        terms: "Masharti ya Huduma",
        cancellation: "Sera ya Kughairi",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
