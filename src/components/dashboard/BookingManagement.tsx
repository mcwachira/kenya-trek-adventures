"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Mail,
  Phone,
  User,
  MapPin,
  Users,
  Filter,
  Download,
  Search,
  // Eye,
  // Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

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

interface BookingManagementProps {
  bookings: Booking[];
  updateBookingStatus: (id: number, status: string) => void;
  deleteBooking: (id: number) => void;
}

const BookingManagement = ({
  bookings,
  updateBookingStatus,
  deleteBooking,
}: BookingManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesService =
      serviceFilter === "all" || booking.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });
  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Service",
      "Participants",
      "Date",
      "Status",
      "Created",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredBookings.map((booking) =>
        [
          booking.name,
          booking.email,
          booking.phone,
          booking.service,
          booking.participants,
          booking.date,
          booking.status,
          new Date(booking.createdAt).toLocaleDateString(),
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings-export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500 text-white hover:bg-green-600";
      case "pending":
        return "bg-yellow-500 text-white hover:bg-yellow-600";
      case "cancelled":
        return "bg-red-500 text-white hover:bg-red-600";
      default:
        return "bg-gray-500 text-white hover:bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const uniqueServices = [
    ...new Set(bookings.map((booking) => booking.service)),
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-400">
            Booking Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage all tour bookings and reservations
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            onClick={() => setViewMode("table")}
            size="sm"
          >
            Table
          </Button>
          <Button
            variant={viewMode === "cards" ? "default" : "outline"}
            onClick={() => setViewMode("cards")}
            size="sm"
          >
            Cards
          </Button>
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>
      {/* Filters */}
      <Card className="shadow-lg border-green-100 dark:border-green-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {uniqueServices.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-md px-3 py-2">
              {filteredBookings.length} of {bookings.length} bookings
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table View */}
      {/* Table View */}
      {viewMode === "table" && (
        <Card className="shadow-lg border-green-100 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-400">
              All Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No bookings match your filters
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Tour</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow
                        key={booking.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {booking.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{booking.name}</div>
                              <div className="text-sm text-gray-500">
                                {booking.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{booking.service}</div>
                        </TableCell>
                        <TableCell>
                          <div>
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-400" />
                            {booking.participants}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1">{booking.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateBookingStatus(booking.id, "confirmed")
                              }
                              disabled={booking.status === "confirmed"}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateBookingStatus(booking.id, "pending")
                              }
                              disabled={booking.status === "pending"}
                              className="text-yellow-600 hover:text-yellow-700"
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteBooking(booking.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      {/* Cards View */}
      {viewMode === "cards" && (
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No bookings match your filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <Card
                key={booking.id}
                className="shadow-lg border-green-100 dark:border-green-800 hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {booking.service}
                    </CardTitle>
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1">{booking.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-green-600" />
                        <span className="font-medium">{booking.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{booking.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{booking.phone}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span className="text-sm">
                          {new Date(booking.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <span className="text-sm">
                          {booking.participants} participants
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Submitted:{" "}
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {booking.message && (
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <p className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Customer Message:
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {booking.message}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      onClick={() =>
                        updateBookingStatus(booking.id, "confirmed")
                      }
                      className="bg-green-600 hover:bg-green-700"
                      disabled={booking.status === "confirmed"}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateBookingStatus(booking.id, "pending")}
                      disabled={booking.status === "pending"}
                      className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Pending
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateBookingStatus(booking.id, "cancelled")
                      }
                      disabled={booking.status === "cancelled"}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteBooking(booking.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
