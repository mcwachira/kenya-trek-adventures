import { MarkerIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const tourType = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  icon: MarkerIcon,
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
    }),
    defineField({
      name: "duration",
      title: "Duration (in days)",
      type: "number",
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: ["Easy", "Moderate", "Challenging"],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "elevation",
      title: "Elevation",
      type: "string",
    }),
    defineField({
      name: "route",
      title: "Route",
      type: "string",
    }),
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
      of: [{ type: "itineraryDay" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
