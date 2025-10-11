"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, LogOut, User } from "lucide-react";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import BookingManagement from "@/components/dashboard/BookingManagement";
import CustomerManagement from "@/components/dashboard/CustomerManagement";
import PaymentManagement from "@/components/dashboard/PaymentManagent";
import TourManagement from "@/components/dashboard/TourManagment";
import AnalyticsReports from "@/components/dashboard/AnalyticsReports";
import ContentManagement from "@/components/dashboard/ContentManagement";
import DashboardSettings from "@/components/dashboard/DashBoardSettings";
import NotificationCenter from "@/components/dashboard/NotificationCenter";
import { useAuth } from "@/hooks/useAuth";
import { useBookings, useContacts } from "@/hooks/useBooking";

const Dashboard = () => {
  const { user, isLoadingUser, signOut, isSigningOut } = useAuth();
  const { bookings, isLoading: isLoadingBookings } = useBookings();
  const { contacts, isLoading: isLoadingContacts } = useContacts();
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoadingUser || isLoadingBookings || isLoadingContacts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!user) {
    return null; // Middleware will redirect to login
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const userName =
    user.adminDetails?.full_name || user.email?.split("@")[0] || "Admin";

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header with User Info */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-2">
              Kenya Trek Adventures - Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive management system for your adventure tourism
              business
            </p>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-green-100 dark:border-green-800">
              <Avatar className="h-9 w-9 bg-green-600">
                <AvatarFallback className="bg-green-600 text-white text-sm">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {userName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut()}
              disabled={isSigningOut}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {isSigningOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              <span className="ml-2 hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
            <BookingManagement />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerManagement />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentManagement bookings={bookings} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsReports />
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
  );
};

export default Dashboard;
