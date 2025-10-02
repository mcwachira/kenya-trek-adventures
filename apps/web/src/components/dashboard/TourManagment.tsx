"use client";
import { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Edit,
  Trash2,
  Mountain,
  Calendar,
  Users,
  DollarSign,
  MapPin,
  Grid,
  List,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import { Tour, useToursData } from "@/hooks/useToursData";

const TourManagement = () => {
  const {
    tours,
    addTour,
    updateTour,
    deleteTour,
    isAddingTour,
    isUpdatingTour,
    isDeletingTour,
  } = useToursData();

  const [showEditor, setShowEditor] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    difficulty: "Easy" as Tour["difficulty"],
    image: "",
    category: "mount-kenya" as Tour["category"],
    highlights: "",
    included: "",
    location: "",
    maxParticipants: 8,
    status: "active" as Tour["status"],
  });

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || tour.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || tour.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateTour = () => {
    const tourData = {
      ...formData,
      highlights: formData.highlights
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h.length > 0),
      included: formData.included
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i.length > 0),
    };

    addTour(tourData);
    setShowEditor(false);
    resetForm();
  };

  const handleEditTour = (tour: Tour) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title,
      description: tour.description,
      duration: tour.duration,
      price: tour.price,
      difficulty: tour.difficulty,
      image: tour.image,
      category: tour.category,
      highlights: tour.highlights.join(", "),
      included: tour.included.join(", "),
      location: tour.location,
      maxParticipants: tour.maxParticipants,
      status: tour.status,
    });
    setShowEditor(true);
  };

  const handleUpdateTour = () => {
    if (!editingTour) return;

    const updatedTour: Tour = {
      ...editingTour,
      ...formData,
      highlights: formData.highlights
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h.length > 0),
      included: formData.included
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i.length > 0),
    };

    updateTour(updatedTour);
    setShowEditor(false);
    setEditingTour(null);
    resetForm();
  };

  const handleDeleteTour = (id: number) => {
    if (confirm("Are you sure you want to delete this tour?")) {
      deleteTour(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      duration: "",
      price: "",
      difficulty: "Easy",
      image: "",
      category: "mount-kenya",
      highlights: "",
      included: "",
      location: "",
      maxParticipants: 8,
      status: "active",
    });
  };

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "mount-kenya":
        return "bg-blue-500 text-white hover:bg-blue-600";
      case "safari":
        return "bg-orange-500 text-white hover:bg-orange-600";
      case "day-trip":
        return "bg-purple-500 text-white hover:bg-purple-600";
      default:
        return "bg-gray-500 text-white hover:bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-400">
            Tour Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage all tours, safaris, and day trips
          </p>
        </div>
        <Button
          onClick={() => setShowEditor(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Tour
        </Button>
      </div>
      {/* Filters and Search */}
      <Card className="shadow-lg border-green-100 dark:border-green-800">
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
                <SelectItem value="safari">Safari</SelectItem>
                <SelectItem value="day-trip">Day Trip</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
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
        <Card className="shadow-lg border-green-100 dark:border-green-800">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Tour Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter tour title"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Tour description"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Tour location"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      placeholder="e.g., 5 Days"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="e.g., $850"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value: Tour["difficulty"]) =>
                        setFormData({ ...formData, difficulty: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Challenging">Challenging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: Tour["category"]) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mount-kenya">Mount Kenya</SelectItem>
                        <SelectItem value="safari">Safari</SelectItem>
                        <SelectItem value="day-trip">Day Trip</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxParticipants">Max Participants</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={formData.maxParticipants}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxParticipants: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: Tour["status"]) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="highlights">
                    Highlights (comma-separated)
                  </Label>
                  <Textarea
                    id="highlights"
                    value={formData.highlights}
                    onChange={(e) =>
                      setFormData({ ...formData, highlights: e.target.value })
                    }
                    placeholder="Point Lenana Summit, Alpine Lakes, Unique Vegetation"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="included">
                    What&apos;s Included (comma-separated)
                  </Label>
                  <Textarea
                    id="included"
                    value={formData.included}
                    onChange={(e) =>
                      setFormData({ ...formData, included: e.target.value })
                    }
                    placeholder="Professional guide, All meals, Park fees"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                onClick={editingTour ? handleUpdateTour : handleCreateTour}
                disabled={isAddingTour || isUpdatingTour}
                className="bg-green-600 hover:bg-green-700"
              >
                {editingTour ? "Update Tour" : "Create Tour"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditor(false);
                  setEditingTour(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Tours Display */}
      <Card className="shadow-lg border-green-100 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-400">
            All Tours ({filteredTours.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tour</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTours.map((tour) => (
                    <TableRow
                      key={tour.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg overflow-hidden">
                            {tour.image ? (
                              <img
                                src={tour.image}
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
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {tour.location}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(tour.category)}>
                          {tour.category === "mount-kenya"
                            ? "Mount Kenya"
                            : tour.category === "day-trip"
                              ? "Day Trip"
                              : "Safari"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {tour.duration}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          {tour.price}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(tour.difficulty)}>
                          {tour.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            tour.status === "active" ? "default" : "secondary"
                          }
                        >
                          {tour.status}
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
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteTour(tour.id)}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map((tour) => (
                <Card
                  key={tour.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    {tour.image ? (
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <Mountain className="h-12 w-12 text-white" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 space-y-1">
                      <Badge className={getCategoryColor(tour.category)}>
                        {tour.category === "mount-kenya"
                          ? "Mount Kenya"
                          : tour.category === "day-trip"
                            ? "Day Trip"
                            : "Safari"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{tour.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      {tour.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4" />
                          {tour.duration}
                        </span>
                        <span className="flex items-center gap-1 font-semibold">
                          <DollarSign className="h-4 w-4" />
                          {tour.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge className={getDifficultyColor(tour.difficulty)}>
                          {tour.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          Max {tour.maxParticipants}
                        </div>
                      </div>
                      <div className="flex gap-1 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditTour(tour)}
                          className="flex-1"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteTour(tour.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredTours.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No tours match your filters
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TourManagement;
