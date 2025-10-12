"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Booking } from "@/hooks/useBooking";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building, Palette, Users, Globe } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAppSettings } from "@/hooks/useAppSettings";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CompanyFormValues,
  companySchema,
  RegionalFormValues,
  regionalSchema,
} from "@/lib/auth";
import { useForm } from "react-hook-form";

const DashboardSettings = () => {
  const { theme, setTheme } = useTheme();
  const { getSetting, updateSetting, isUpdating } = useAppSettings();

  const companyForm = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: getSetting("companyName") || "Kenya Trek Adventures",
      email: getSetting("companyEmail") || "info@kenyatrek.com",
      phone: getSetting("companyPhone") || "+254 700 000 000",
    },
  });

  const regionalForm = useForm({
    resolver: zodResolver(regionalSchema),
    defaultValues: {
      currency: getSetting("currency") || "usd",
      timezone: getSetting("timezone") || "eat",
    },
  });

  const handleCompanySubmit = (values: CompanyFormValues) => {
    updateSetting({ key: "companyName", value: values.companyName });
    updateSetting({ key: "companyEmail", value: values.email });
    updateSetting({ key: "companyPhone", value: values.phone });
  };

  const handleRegionalSubmit = (values: RegionalFormValues) => {
    updateSetting({ key: "currency", value: values.currency });
    updateSetting({ key: "timezone", value: values.timezone });
    toast.success(
      "Settings saved! Currency changes will reflect across the site.",
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 dark:text-green-400">
        Dashboard Settings
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...companyForm}>
              <form
                onSubmit={companyForm.handleSubmit(handleCompanySubmit)}
                className="space-y-4"
              >
                <FormField
                  control={companyForm.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={companyForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={companyForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isUpdating}
                >
                  Save Changes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Regional Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...regionalForm}>
              <form
                onSubmit={regionalForm.handleSubmit(handleRegionalSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={regionalForm.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Currency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="kes">KES (KSh)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={regionalForm.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Zone</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="eat">
                            East Africa Time (EAT)
                          </SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">
                            Eastern Standard Time
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isUpdating}
                >
                  Save Changes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 border rounded">
                <div>
                  <p className="font-medium">Admin User</p>
                  <p className="text-sm text-gray-500">admin@kenyatrek.com</p>
                </div>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  Admin
                </span>
              </div>
              <Button variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Invite Team Member
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance & Theme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Theme</label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Quick Theme Toggle</p>
                <p className="text-sm text-gray-500">
                  Switch between light and dark mode
                </p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSettings;
