import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Activity,
  Clock,
  MapPin,
  ArrowUpRight,
  // ArrowDownRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface DashboardOverviewProps {
  bookings: Booking[];
  contacts: Contact[];
}

const DashboardOverView = ({ bookings, contacts }: DashboardOverviewProps) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.createdAt);
    return (
      bookingDate.getMonth() === currentMonth &&
      bookingDate.getFullYear() === currentYear
    );
  });

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed",
  );
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending",
  );
  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "cancelled",
  );

  const totalRevenue = confirmedBookings.length * 1500;
  const upcomingTrips = confirmedBookings.filter(
    (booking) => new Date(booking.date) > new Date(),
  );

  const popularTours = bookings.reduce(
    (acc: Record<string, number>, booking) => {
      acc[booking.service] = (acc[booking.service] || 0) + 1;
      return acc;
    },
    {},
  );

  const topTour = Object.entries(popularTours).sort(
    ([, a], [, b]) => (b as number) - (a as number),
  )[0];

  // Calculate growth percentages (mock data for demo)
  const bookingGrowth = 12.5;
  const revenueGrowth = 8.3;
  const customerGrowth = 15.2;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800">
        <h1 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">
          Welcome back, Admin! 🌍
        </h1>
        <p className="text-green-600 dark:text-green-300">
          Here&lsquo;s what&lsquo;s happening with Kenya Trek Adventures today
        </p>
      </div>
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 border-green-200 dark:border-green-700 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
              Total Bookings
            </CardTitle>
            <div className="p-2 bg-green-200 dark:bg-green-800 rounded-lg">
              <Calendar className="h-4 w-4 text-green-700 dark:text-green-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-200">
              {thisMonthBookings.length}
            </div>
            <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-2">
              <ArrowUpRight className="h-3 w-3 mr-1" />+{bookingGrowth}% from
              last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/50 dark:to-emerald-800/50 border-emerald-200 dark:border-emerald-700 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Monthly Revenue
            </CardTitle>
            <div className="p-2 bg-emerald-200 dark:bg-emerald-800 rounded-lg">
              <DollarSign className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-800 dark:text-emerald-200">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 mt-2">
              <ArrowUpRight className="h-3 w-3 mr-1" />+{revenueGrowth}% from
              last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/50 dark:to-teal-800/50 border-teal-200 dark:border-teal-700 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-teal-700 dark:text-teal-300">
              New Customers
            </CardTitle>
            <div className="p-2 bg-teal-200 dark:bg-teal-800 rounded-lg">
              <Users className="h-4 w-4 text-teal-700 dark:text-teal-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-800 dark:text-teal-200">
              {contacts.length}
            </div>
            <div className="flex items-center text-xs text-teal-600 dark:text-teal-400 mt-2">
              <ArrowUpRight className="h-3 w-3 mr-1" />+{customerGrowth}% from
              last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/50 dark:to-cyan-800/50 border-cyan-200 dark:border-cyan-700 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
              Upcoming Trips
            </CardTitle>
            <div className="p-2 bg-cyan-200 dark:bg-cyan-800 rounded-lg">
              <MapPin className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-800 dark:text-cyan-200">
              {upcomingTrips.length}
            </div>
            <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-2">
              Confirmed expeditions ahead
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg border-green-100 dark:border-green-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Booking Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <span className="font-medium">Confirmed</span>
              <Badge className="bg-green-500 text-white hover:bg-green-600">
                {confirmedBookings.length}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <span className="font-medium">Pending</span>
              <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
                {pendingBookings.length}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <span className="font-medium">Cancelled</span>
              <Badge className="bg-red-500 text-white hover:bg-red-600">
                {cancelledBookings.length}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-green-100 dark:border-green-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Performing Tour
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topTour ? (
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
                <div className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                  {topTour[0]}
                </div>
                <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {topTour[1]} bookings
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  This month
                </p>
              </div>
            ) : (
              <div className="text-center p-4 text-gray-500">
                No bookings yet
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg border-green-100 dark:border-green-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="p-2 bg-blue-200 dark:bg-blue-800 rounded-lg">
                <Activity className="h-4 w-4 text-blue-700 dark:text-blue-300" />
              </div>
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200">
                  Active Tours
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  8 currently running
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <div className="p-2 bg-orange-200 dark:bg-orange-800 rounded-lg">
                <Clock className="h-4 w-4 text-orange-700 dark:text-orange-300" />
              </div>
              <div>
                <p className="font-medium text-orange-800 dark:text-orange-200">
                  Pending Reviews
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  {pendingBookings.length} awaiting approval
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Recent Activity */}
      <Card className="shadow-lg border-green-100 dark:border-green-800 mb-4">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {booking.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {booking.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.service}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    className={
                      booking.status === "confirmed"
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : booking.status === "pending"
                          ? "bg-yellow-500 text-white hover:bg-yellow-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                    }
                  >
                    {booking.status}
                  </Badge>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverView;
