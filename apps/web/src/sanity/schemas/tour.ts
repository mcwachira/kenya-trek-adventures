// /schemas/documents/tour.ts
import { defineType, defineField } from "sanity";

export const tour = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration (days)",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: ["Easy", "Moderate", "Challenging"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Tour location (e.g., Mount Kenya, Masai Mara)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
      description: "Key highlights of the tour",
    }),
    defineField({
      name: "elevation",
      title: "Elevation",
      type: "string",
      description: "Maximum elevation (e.g., 4,985m)",
    }),
    defineField({
      name: "route",
      title: "Route",
      type: "string",
      description: "Route description or name",
    }),
    defineField({
      name: "included",
      title: "What's Included",
      type: "array",
      of: [{ type: "string" }],
      description: "Items/services included in the tour",
    }),
    defineField({
      name: "excluded",
      title: "What's Excluded",
      type: "array",
      of: [{ type: "string" }],
      description: "Items/services not included in the tour",
    }),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [{ type: "itineraryDay" }],
      description: "Day-by-day itinerary",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "image",
      duration: "duration",
      difficulty: "difficulty",
    },
    prepare(selection) {
      const { title, subtitle, media, duration, difficulty } = selection;
      return {
        title: title,
        subtitle: `${subtitle || "No location"} • ${duration} days • ${difficulty}`,
        media: media,
      };
    },
  },
});
