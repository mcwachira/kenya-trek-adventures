"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Mountain,
  MapPin,
  Search,
  Filter,
  Grid,
  List,
  Loader2,
  DollarSign,
} from "lucide-react";
import { useToursData } from "@/hooks/useTours";
import { useCurrency } from "@/hooks/useCurrency";
import { TourFormValues, tourSchema } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tour, TourCategory, getCategoryLabel } from "@/types";

const TourManagement = () => {
  const {
    tours,
    addTour,
    updateTour,
    deleteTour,
    isAddingTour,
    isUpdatingTour,
    isDeletingTour,
    isLoading,
  } = useToursData();

  console.log(tours);

  const { formatPrice, currency, currencySymbol } = useCurrency();

  const [showEditor, setShowEditor] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<TourFormValues>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      title: "",
      category: "day-trip",
      description: "",
      duration: 1,
      price: 0,
      difficulty: "Easy",
      location: "",
      elevation: "",
      route: "",
      highlights: "",
      included: "",
      excluded: "",
    },
  });

  const resetForm = () => {
    form.reset();
    setImageFile(null);
    setEditingTour(null);
  };

  const handleEditTour = (tour: Tour) => {
    setEditingTour(tour);
    form.reset({
      title: tour.title,
      category: tour.category,
      description: tour.description,
      duration: tour.duration,
      price: tour.price,
      difficulty: tour.difficulty,
      location: tour.location || "",
      elevation: tour.elevation || "",
      route: tour.route || "",
      highlights: tour.highlights?.join(", ") || "",
      included: tour.included?.join(", ") || "",
      excluded: tour.excluded?.join(", ") || "",
    });
    setShowEditor(true);
  };

  const handleDeleteTour = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;
    deleteTour(id);
  };

  const onSubmit = (data: TourFormValues) => {
    const payload: any = {
      title: data.title,
      category: data.category,
      description: data.description,
      duration: data.duration,
      price: data.price,
      difficulty: data.difficulty,
      location: data.location,
      elevation: data.elevation,
      route: data.route,
      highlights: data.highlights
        ? data.highlights
            .split(",")
            .map((h) => h.trim())
            .filter(Boolean)
        : [],
      included: data.included
        ? data.included
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : [],
      excluded: data.excluded
        ? data.excluded
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : [],
    };

    if (imageFile) {
      payload.image = imageFile;
    }

    if (editingTour) {
      updateTour({ ...editingTour, ...payload });
    } else {
      addTour(payload);
    }

    setShowEditor(false);
    resetForm();
  };

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tour.location &&
        tour.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      categoryFilter === "all" || tour.category === categoryFilter;
    const matchesDifficulty =
      difficultyFilter === "all" || tour.difficulty === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500 text-white hover:bg-green-600";
      case "Moderate":
        return "bg-yellow-500 text-white hover:bg-yellow-600";
      case "Challenging":
        return "bg-red-500 text-white hover:bg-red-600";
      default:
        return "bg-gray-500 text-white hover:bg-gray-600";
    }
  };

  const getCategoryColor = (category: TourCategory) => {
    switch (category) {
      case "mount-kenya":
        return "bg-blue-500 text-white hover:bg-blue-600";
      case "day-trip":
        return "bg-purple-500 text-white hover:bg-purple-600";
      case "safaris":
        return "bg-orange-500 text-white hover:bg-orange-600";
      default:
        return "bg-gray-500 text-white hover:bg-gray-600";
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-400">
            Tour Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage all tours, safaris, and day trips • Displaying prices in{" "}
            {currency.toUpperCase()} ({currencySymbol})
          </p>
        </div>
        <Button
          onClick={() => {
            setShowEditor(true);
            resetForm();
          }}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Tour
        </Button>
      </div>

      {/* Currency Info Alert */}
      <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-950">
        <CardContent className="py-3">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-green-600" />
            <p className="text-green-800 dark:text-green-200">
              <strong>Note:</strong> All tour prices are stored in USD. They're
              automatically converted to {currency.toUpperCase()} for display
              based on your settings.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter Tours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search tours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="mount-kenya">Mount Kenya</SelectItem>
                <SelectItem value="day-trip">Day Trip</SelectItem>
                <SelectItem value="safaris">Safaris</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Challenging">Challenging</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tour Editor */}
      {showEditor && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
              {editingTour ? (
                <Edit className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
              {editingTour ? "Edit Tour" : "Add New Tour"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tour Title *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter tour title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="mount-kenya">
                                Mount Kenya
                              </SelectItem>
                              <SelectItem value="day-trip">Day Trip</SelectItem>
                              <SelectItem value="safaris">Safaris</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tour description"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormItem>
                      <FormLabel>Tour Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setImageFile(e.target.files?.[0] || null)
                          }
                        />
                      </FormControl>
                    </FormItem>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location *</FormLabel>
                          <FormControl>
                            <Input placeholder="Tour location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (days) *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="5"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (USD) *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="850"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                            <p className="text-xs text-gray-500">
                              Enter price in USD. Will display as{" "}
                              {formatPrice(field.value || 0)}
                            </p>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Easy">Easy</SelectItem>
                              <SelectItem value="Moderate">Moderate</SelectItem>
                              <SelectItem value="Challenging">
                                Challenging
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="highlights"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Highlights (comma-separated)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Point Lenana Summit, Alpine Lakes, Unique Vegetation"
                              rows={2}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="included"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Included (comma-separated)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Professional guide, All meals, Park fees"
                              rows={2}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isAddingTour || isUpdatingTour}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {(isAddingTour || isUpdatingTour) && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    {editingTour ? "Update Tour" : "Create Tour"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowEditor(false);
                      resetForm();
                    }}
                    disabled={isAddingTour || isUpdatingTour}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Tours Display */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-400">
            All Tours ({filteredTours.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          ) : viewMode === "table" ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tour</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price ({currency.toUpperCase()})</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTours.map((tour) => (
                    <TableRow key={tour._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg overflow-hidden">
                            {tour.imageUrl ? (
                              <img
                                src={tour.imageUrl}
                                alt={tour.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Mountain className="h-6 w-6 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{tour.title}</div>
                            {tour.location && (
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {tour.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(tour.category)}>
                          {getCategoryLabel(tour.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>{tour.duration} days</TableCell>
                      <TableCell className="font-semibold">
                        {formatPrice(tour.price)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(tour.difficulty)}>
                          {tour.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditTour(tour)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteTour(tour._id)}
                            className="text-red-600 hover:text-red-700"
                            disabled={isDeletingTour}
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTours.map((tour) => (
                <Card
                  key={tour._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video relative bg-gradient-to-br from-green-400 to-green-600">
                    {tour.imageUrl ? (
                      <img
                        src={tour.imageUrl}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Mountain className="h-12 w-12 text-white" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge className={getCategoryColor(tour.category)}>
                        {getCategoryLabel(tour.category)}
                      </Badge>
                      <Badge className={getDifficultyColor(tour.difficulty)}>
                        {tour.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{tour.title}</h3>
                    {tour.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        {tour.location}
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-green-700 dark:text-green-400">
                        {formatPrice(tour.price)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {tour.duration} days
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleEditTour(tour)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteTour(tour._id)}
                        className="text-red-600 hover:text-red-700"
                        disabled={isDeletingTour}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TourManagement;
