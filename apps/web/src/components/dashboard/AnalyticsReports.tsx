"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { useBookings } from "@/hooks/useBooking";

const AnalyticsReports = () => {
  const { bookings, isLoading } = useBookings();

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p>Loading analytics...</p>
      </div>
    );
  }

  const serviceStats = bookings.reduce(
    (acc: Record<string, number>, booking) => {
      acc[booking.service] = (acc[booking.service] || 0) + 1;
      return acc;
    },
    {},
  );

  const monthlyStats = bookings.reduce(
    (acc: Record<string, number>, booking) => {
      const month = new Date(booking.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    },
    {},
  );

  const statusStats = {
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const estimatedRevenue = statusStats.confirmed * 1500; // $1500 per confirmed booking

  // Calculate growth (comparing last 30 days to previous 30 days)
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  const last30Days = bookings.filter(
    (b) => new Date(b.created_at) > thirtyDaysAgo,
  ).length;
  const previous30Days = bookings.filter(
    (b) =>
      new Date(b.created_at) > sixtyDaysAgo &&
      new Date(b.created_at) <= thirtyDaysAgo,
  ).length;

  const growthRate =
    previous30Days > 0
      ? ((last30Days - previous30Days) / previous30Days) * 100
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-green-800 dark:text-green-400">
          Analytics & Reports
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Comprehensive insights into your booking performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 border-green-200 dark:border-green-700 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Total Bookings
                </p>
                <div className="text-3xl font-bold text-green-800 dark:text-green-200 mt-2">
                  {bookings.length}
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  All time
                </p>
              </div>
              <div className="p-3 bg-green-200 dark:bg-green-800 rounded-full">
                <Calendar className="h-6 w-6 text-green-700 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 border-blue-200 dark:border-blue-700 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Confirmed
                </p>
                <div className="text-3xl font-bold text-blue-800 dark:text-blue-200 mt-2">
                  {statusStats.confirmed}
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  {bookings.length > 0
                    ? ((statusStats.confirmed / bookings.length) * 100).toFixed(
                        0,
                      )
                    : 0}
                  % of total
                </p>
              </div>
              <div className="p-3 bg-blue-200 dark:bg-blue-800 rounded-full">
                <CheckCircle className="h-6 w-6 text-blue-700 dark:text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/50 dark:to-yellow-800/50 border-yellow-200 dark:border-yellow-700 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  Pending
                </p>
                <div className="text-3xl font-bold text-yellow-800 dark:text-yellow-200 mt-2">
                  {statusStats.pending}
                </div>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                  Awaiting approval
                </p>
              </div>
              <div className="p-3 bg-yellow-200 dark:bg-yellow-800 rounded-full">
                <Clock className="h-6 w-6 text-yellow-700 dark:text-yellow-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/50 dark:to-emerald-800/50 border-emerald-200 dark:border-emerald-700 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Est. Revenue
                </p>
                <div className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mt-2">
                  ${estimatedRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  From confirmed bookings
                </p>
              </div>
              <div className="p-3 bg-emerald-200 dark:bg-emerald-800 rounded-full">
                <DollarSign className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Metrics */}
      <Card className="shadow-lg border-green-100 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Growth Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Last 30 Days
              </p>
              <div className="text-2xl font-bold text-green-800 dark:text-green-200 mt-2">
                {last30Days}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                bookings
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Previous 30 Days
              </p>
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mt-2">
                {previous30Days}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                bookings
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Growth Rate
              </p>
              <div
                className={`text-2xl font-bold mt-2 ${
                  growthRate >= 0
                    ? "text-green-800 dark:text-green-200"
                    : "text-red-800 dark:text-red-200"
                }`}
              >
                {growthRate >= 0 ? "+" : ""}
                {growthRate.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                vs previous period
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg border-green-100 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
              <TrendingUp className="h-4 w-4" />
              Tour Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(serviceStats).length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                No booking data available
              </p>
            ) : (
              <div className="space-y-3">
                {Object.entries(serviceStats)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([service, count]) => {
                    const percentage = (
                      ((count as number) / bookings.length) *
                      100
                    ).toFixed(1);
                    return (
                      <div key={service} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{service}</span>
                          <span className="font-bold text-green-600">
                            {count as number} bookings
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          {percentage}% of total
                        </p>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg border-green-100 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
              <Calendar className="h-4 w-4" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(monthlyStats).length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                No monthly data available
              </p>
            ) : (
              <div className="space-y-3">
                {Object.entries(monthlyStats)
                  .slice(-6)
                  .map(([month, count]) => (
                    <div
                      key={month}
                      className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <span className="text-sm font-medium">{month}</span>
                      <span className="font-bold text-green-600">
                        {count as number} bookings
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Status Breakdown */}
      <Card className="shadow-lg border-green-100 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-400">
            Booking Status Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-200 dark:bg-red-800 rounded-full">
                  <XCircle className="h-5 w-5 text-red-700 dark:text-red-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">
                    Cancelled
                  </p>
                  <p className="text-2xl font-bold text-red-800 dark:text-red-200">
                    {statusStats.cancelled}
                  </p>
                </div>
              </div>
              <div className="text-sm text-red-600 dark:text-red-400">
                {bookings.length > 0
                  ? ((statusStats.cancelled / bookings.length) * 100).toFixed(0)
                  : 0}
                %
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-200 dark:bg-yellow-800 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                    Pending
                  </p>
                  <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                    {statusStats.pending}
                  </p>
                </div>
              </div>
              <div className="text-sm text-yellow-600 dark:text-yellow-400">
                {bookings.length > 0
                  ? ((statusStats.pending / bookings.length) * 100).toFixed(0)
                  : 0}
                %
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-200 dark:bg-green-800 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-700 dark:text-green-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">
                    Confirmed
                  </p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                    {statusStats.confirmed}
                  </p>
                </div>
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                {bookings.length > 0
                  ? ((statusStats.confirmed / bookings.length) * 100).toFixed(0)
                  : 0}
                %
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsReports;
