import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar } from "lucide-react";

interface Booking {
  id: number;
  service: string;
  createdAt: string;
  status: string;
}

interface AnalyticsReportsProps {
  bookings: Booking[];
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
const AnalyticsReports = ({ bookings }: AnalyticsReportsProps) => {
  const serviceStats = bookings.reduce((acc: any, booking) => {
    acc[booking.service] = (acc[booking.service] || 0) + 1;
    return acc;
  }, {});

  const monthlyStats = bookings.reduce((acc: any, booking) => {
    const month = new Date(booking.createdAt).toLocaleDateString("en-US", {
      month: "long",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800">Analytics & Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Tour Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(serviceStats).map(([service, count]) => (
                <div
                  key={service}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm">{service}</span>
                  <span className="font-medium">
                    {count as number} bookings
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(monthlyStats).map(([month, count]) => (
                <div key={month} className="flex justify-between items-center">
                  <span className="text-sm">{month}</span>
                  <span className="font-medium">
                    {count as number} bookings
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {bookings.length}
              </div>
              <p className="text-sm text-gray-500">Total Bookings</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {bookings.filter((b) => b.status === "confirmed").length}
              </div>
              <p className="text-sm text-gray-500">Confirmed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {bookings.filter((b) => b.status === "pending").length}
              </div>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {bookings.filter((b) => b.status === "cancelled").length}
              </div>
              <p className="text-sm text-gray-500">Cancelled</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsReports;
