import { defineType, defineField } from "sanity";

export const itineraryDay = defineType({
  name: "itineraryDay",
  title: "Itinerary Day",
  type: "object",
  fields: [
    defineField({
      name: "day",
      title: "Day Number",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "activities",
      title: "Activities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "accommodation",
      title: "Accommodation",
      type: "string",
    }),
    defineField({
      name: "meals",
      title: "Meals",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "day",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || `Day ${subtitle}`,
        subtitle: `Day ${subtitle}`,
      };
    },
  },
});
