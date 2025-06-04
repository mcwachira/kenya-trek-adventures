"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  User,
  Search,
  MessageSquare,
  Calendar,
} from "lucide-react";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface CustomerManagementProps {
  contacts: Contact[];
  deleteContact: (id: number) => void;
}
const CustomerManagement = ({
  contacts,
  deleteContact,
}: CustomerManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold text-green-800">
          Customer Management
        </h2>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {contacts.length} Total Customers
        </Badge>
      </div>
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Customers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>
      {/* Customer List */}
      <div className="space-y-4">
        {filteredContacts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">
                {searchTerm
                  ? "No customers match your search"
                  : "No customer contacts yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredContacts.map((contact) => (
            <Card key={contact.id} className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-green-800 dark:text-green-400">
                    {contact.subject}
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{contact.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-green-600" />
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span>
                        Contacted:{" "}
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-green-600" />
                      <span>Inquiry Type: {contact.subject}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <p className="text-sm font-medium mb-2">Customer Message:</p>
                  <p className="text-sm">{contact.message}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      window.open(
                        `mailto:${contact.email}?subject=Re: ${contact.subject}`,
                        "_blank",
                      )
                    }
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Reply via Email
                  </Button>
                  {contact.phone && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        window.open(`tel:${contact.phone}`, "_blank")
                      }
                    >
                      Call Customer
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteContact(contact.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;
