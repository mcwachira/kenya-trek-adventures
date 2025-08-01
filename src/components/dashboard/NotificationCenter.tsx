import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle, CheckCircle, Clock, Mail } from "lucide-react";

interface Booking {
  id: number;
  name: string;
  service: string;
  status: string;
  date: string;
  createdAt: string;
}

interface Contact {
  id: number;
  name: string;
  subject: string;
  createdAt: string;
}

interface NotificationCenterProps {
  bookings: Booking[];
  contacts: Contact[];
}

const NotificationCenter = ({
  bookings,
  contacts,
}: NotificationCenterProps) => {
  const recentBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - bookingDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });

  const recentContacts = contacts.filter((contact) => {
    const contactDate = new Date(contact.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - contactDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });

  const upcomingTrips = bookings.filter((booking) => {
    const tripDate = new Date(booking.date);
    const now = new Date();
    const diffTime = tripDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0 && booking.status === "confirmed";
  });

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending",
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-green-600" />
        <h2 className="text-2xl font-bold text-green-800">
          Notification Center
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Pending Reviews</span>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {pendingBookings.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">New Inquiries</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {recentContacts.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Upcoming Trips</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {upcomingTrips.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Recent Bookings</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {recentBookings.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div>
                    <p className="text-sm font-medium">
                      New booking: {booking.service}
                    </p>
                    <p className="text-xs text-gray-500">by {booking.name}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Expeditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTrips.slice(0, 5).map((trip) => (
                <div
                  key={trip.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div>
                    <p className="text-sm font-medium">{trip.service}</p>
                    <p className="text-xs text-gray-500">{trip.name}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    {new Date(trip.date).toLocaleDateString()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationCenter;
