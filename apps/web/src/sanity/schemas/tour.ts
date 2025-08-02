// /schemas/documents/tour.ts
import { defineType, defineField } from "sanity";

export const tour = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "duration", title: "Duration (days)", type: "number" }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: ["Easy", "Moderate", "Challenging"],
      },
    }),
    defineField({ name: "price", title: "Price (USD)", type: "number" }),
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
    }),
    defineField({ name: "elevation", title: "Elevation", type: "string" }),
    defineField({ name: "route", title: "Route", type: "string" }),
    defineField({
      name: "included",
      title: "Included",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "excluded",
      title: "Excluded",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [{ type: "itineraryDay" }], // Use your object here
    }),
  ],
});
