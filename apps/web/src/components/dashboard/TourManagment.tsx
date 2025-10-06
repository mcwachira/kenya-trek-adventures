"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Mountain, MapPin, Search, Filter, Grid, List, Upload } from "lucide-react";
import { toast } from "sonner";
import {useToursData} from "@/hooks/useToursData";
import {Tour} from "@/lib/sanity";
import {TourFormValues, tourSchema} from "@/lib/auth";

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
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const form = useForm<TourFormValues>({
        resolver: zodResolver(tourSchema),
        defaultValues: {
            title: "",
            description: "",
            duration: "",
            price: "",
            difficulty: "Easy",
            category: "mount-kenya",
            location: "",
            maxParticipants: 8,
            status: "active",
            highlights: "",
            included: "",
        },
    });

    const filteredTours = tours.filter(tour => {
        const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tour.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "all" || tour.category === categoryFilter;
        const matchesStatus = statusFilter === "all" || tour.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });
    // const uploadImage = async (file: File): Promise<string | null> => {
        // try {
        //     setUploadingImage(true);
        //     const fileExt = file.name.split('.').pop();
        //     const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        //     const filePath = `tours/${fileName}`;
        //
        //     const { error: uploadError } = await supabase.storage
        //         .from('boma-listings')
        //         .upload(filePath, file);
        //
        //     if (uploadError) throw uploadError;
        //
        //     const { data } = supabase.storage
        //         .from('boma-listings')
        //         .getPublicUrl(filePath);
        //
        //     return data.publicUrl;
        // } catch (error) {
        //     console.error('Error uploading image:', error);
        //     toast.error('Failed to upload image');
        //     return null;
        // } finally {
        //     setUploadingImage(false);
        // }
    };

    const handleSubmit = async (values: TourFormValues) => {
        // let imageUrl = editingTour?.image || "";
        //
        // if (imageFile) {
        //     const uploadedUrl = await uploadImage(imageFile);
        //     if (uploadedUrl) imageUrl = uploadedUrl;
        // }
        //
        // const slug = values.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        //
        // const tourData = {
        //     ...values,
        //     slug,
        //     image: imageUrl,
        //     highlights: values.highlights.split(',').map(h => h.trim()).filter(h => h.length > 0),
        //     included: values.included.split(',').map(i => i.trim()).filter(i => i.length > 0),
        //     max_participants: values.maxParticipants,
        // };
        //
        // if (editingTour) {
        //     updateTour({ ...editingTour, ...tourData } as Tour);
        // } else {
        //     addTour(tourData as any);
        // }
        //
        // setShowEditor(false);
        // setEditingTour(null);
        // setImageFile(null);
        // form.reset();
    // };

    const handleEditTour = (tour: Tour) => {
        // setEditingTour(tour);
        // form.reset({
        //     title: tour.title,
        //     description: tour.description,
        //     duration: tour.duration,
        //     price: tour.price,
        //     difficulty: tour.difficulty,
        //     category: tour.category,
        //     location: tour.location,
        //     maxParticipants: tour.max_participants,
        //     status: tour.status,
        //     highlights: tour.highlights.join(', '),
        //     included: tour.included.join(', '),
        // });
        // setShowEditor(true);
    };

    const handleDeleteTour = (id: string) => {
        if (confirm('Are you sure you want to delete this tour?')) {
            // deleteTour(id);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-500 text-white hover:bg-green-600';
            case 'Moderate': return 'bg-yellow-500 text-white hover:bg-yellow-600';
            case 'Challenging': return 'bg-red-500 text-white hover:bg-red-600';
            default: return 'bg-gray-500 text-white hover:bg-gray-600';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'mount-kenya': return 'bg-blue-500 text-white hover:bg-blue-600';
            case 'safari': return 'bg-orange-500 text-white hover:bg-orange-600';
            case 'day-trip': return 'bg-purple-500 text-white hover:bg-purple-600';
            default: return 'bg-gray-500 text-white hover:bg-gray-600';
        }
    };


    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-green-800 dark:text-green-400">Tour Management</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Manage all tours, safaris, and day trips</p>
                </div>
                <Button onClick={() => { setShowEditor(true); setEditingTour(null); form.reset(); }} className="bg-green-600 hover:bg-green-700">
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
                                variant={viewMode === 'table' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('table')}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'grid' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('grid')}
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
                            {editingTour ? <Edit className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                            {editingTour ? 'Edit Tour' : 'Add New Tour'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tour Title</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Enter tour title" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field} placeholder="Tour description" rows={3} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div>
                                            <FormLabel>Tour Image</FormLabel>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                                    className="flex-1"
                                                />
                                                {uploadingImage && <span className="text-sm">Uploading...</span>}
                                            </div>
                                            {(imageFile || editingTour?.image) && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {imageFile ? imageFile.name : 'Current image will be kept'}
                                                </p>
                                            )}
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Location</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Tour location" />
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
                                                        <FormLabel>Duration</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="e.g., 5 Days" />
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
                                                        <FormLabel>Price</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="e.g., 850" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="difficulty"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Difficulty</FormLabel>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Easy">Easy</SelectItem>
                                                                <SelectItem value="Moderate">Moderate</SelectItem>
                                                                <SelectItem value="Challenging">Challenging</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="category"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Category</FormLabel>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="mount-kenya">Mount Kenya</SelectItem>
                                                                <SelectItem value="safari">Safari</SelectItem>
                                                                <SelectItem value="day-trip">Day Trip</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="maxParticipants"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Max Participants</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Status</FormLabel>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="active">Active</SelectItem>
                                                                <SelectItem value="inactive">Inactive</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="highlights"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Highlights (comma-separated)</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            placeholder="Point Lenana Summit, Alpine Lakes, Unique Vegetation"
                                                            rows={2}
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
                                                    <FormLabel>What's Included (comma-separated)</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            placeholder="Professional guide, All meals, Park fees"
                                                            rows={2}
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
                                        disabled={isAddingTour || isUpdatingTour || uploadingImage}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        {editingTour ? 'Update Tour' : 'Create Tour'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setShowEditor(false);
                                            setEditingTour(null);
                                            setImageFile(null);
                                            form.reset();
                                        }}
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
            <Card className="shadow-lg border-green-100 dark:border-green-800">
                <CardHeader>
                    <CardTitle className="text-green-800 dark:text-green-400">
                        All Tours ({filteredTours.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {viewMode === 'table' ? (
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
                                        <TableRow key={tour.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg overflow-hidden">
                                                        {tour.image ? (
                                                            <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
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
                                                    {tour.category === 'mount-kenya' ? 'Mount Kenya' :
                                                        tour.category === 'day-trip' ? 'Day Trip' : 'Safari'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{tour.duration}</TableCell>
                                            <TableCell>{tour.price}</TableCell>
                                            <TableCell>
                                                <Badge className={getDifficultyColor(tour.difficulty)}>
                                                    {tour.difficulty}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={tour.status === 'active' ? 'default' : 'secondary'}>
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
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleDeleteTour(tour.id)}
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
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTours.map((tour) => (
                                <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-video relative bg-gradient-to-br from-green-400 to-green-600">
                                        {tour.image ? (
                                            <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Mountain className="h-12 w-12 text-white" />
                                            </div>
                                        )}
                                        <Badge className={`absolute top-2 right-2 ${getDifficultyColor(tour.difficulty)}`}>
                                            {tour.difficulty}
                                        </Badge>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg mb-2">{tour.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                            <MapPin className="h-4 w-4" />
                                            {tour.location}
                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-lg font-bold text-green-700">{tour.price}</span>
                                            <Badge className={getCategoryColor(tour.category)}>
                                                {tour.category === 'mount-kenya' ? 'Mount Kenya' :
                                                    tour.category === 'day-trip' ? 'Day Trip' : 'Safari'}
                                            </Badge>
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
                                                onClick={() => handleDeleteTour(tour.id)}
                                                className="text-red-600 hover:text-red-700"
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
