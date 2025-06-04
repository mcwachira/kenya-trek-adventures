import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CreditCard, TrendingUp } from "lucide-react";

interface Booking {
  id: number;
  name: string;
  service: string;
  status: string;
  createdAt: string;
}

interface PaymentManagementProps {
  bookings: Booking[];
}

const PaymentManagement = ({ bookings }: PaymentManagementProps) => {
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
  const pendingBookings = bookings.filter((b) => b.status === "pending");

  const totalRevenue = confirmedBookings.length * 1500; // Average price
  const pendingRevenue = pendingBookings.length * 1500;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800">Payment Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${totalRevenue.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500">
              From {confirmedBookings.length} confirmed bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              ${pendingRevenue.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500">
              From {pendingBookings.length} pending bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {bookings.length > 0
                ? Math.round((confirmedBookings.length / bookings.length) * 100)
                : 0}
              %
            </div>
            <p className="text-sm text-gray-500">Payment confirmation rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {confirmedBookings.slice(0, 10).map((booking) => (
              <div
                key={booking.id}
                className="flex justify-between items-center p-3 border rounded"
              >
                <div>
                  <p className="font-medium">{booking.name}</p>
                  <p className="text-sm text-gray-500">{booking.service}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$1,500</p>
                  <Badge className="bg-green-100 text-green-800">Paid</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentManagement;
