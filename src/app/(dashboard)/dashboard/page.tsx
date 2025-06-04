"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DashboardOverview from "@/components/dashboard/DashboardOverview";
import BookingManagement from "@/components/dashboard/BookingManagement";
import CustomerManagement from "@/components/dashboard/CustomerManagement";
import PaymentManagement from "@/components/dashboard/PaymentManagent";
import TourManagement from "@/components/dashboard/TourManagment";
import AnalyticsReports from "@/components/dashboard/AnalyticsReports";
import ContentManagement from "@/components/dashboard/ContentManagement";
import DashboardSettings from "@/components/dashboard/DashBoardSettings";
import NotificationCenter from "@/components/dashboard/NotificationCenter";

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  participants: string;
  date: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

const Dashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const savedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    setBookings(savedBookings);
    setContacts(savedContacts);
  }, []);

  const updateBookingStatus = (id: number, status: string) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status } : booking,
    );
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  const deleteBooking = (id: number) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  const deleteContact = (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-2">
              Kenya Trek Adventures - Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive management system for your adventure tourism
              business
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 lg:grid-cols-9 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tours">Tours</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="notifications">Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <DashboardOverview bookings={bookings} contacts={contacts} />
            </TabsContent>

            <TabsContent value="tours">
              <TourManagement />
            </TabsContent>

            <TabsContent value="bookings">
              <BookingManagement
                bookings={bookings}
                updateBookingStatus={updateBookingStatus}
                deleteBooking={deleteBooking}
              />
            </TabsContent>

            <TabsContent value="customers">
              <CustomerManagement
                contacts={contacts}
                deleteContact={deleteContact}
              />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentManagement bookings={bookings} />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsReports bookings={bookings} />
            </TabsContent>

            <TabsContent value="content">
              <ContentManagement />
            </TabsContent>

            <TabsContent value="settings">
              <DashboardSettings />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationCenter bookings={bookings} contacts={contacts} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
