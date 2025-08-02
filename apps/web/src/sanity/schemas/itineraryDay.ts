// /schemas/objects/itineraryDay.ts
import { defineType, defineField } from "sanity";

export const itineraryDay = defineType({
  name: "itineraryDay",
  title: "Itinerary Day",
  type: "object",
  fields: [
    defineField({
      name: "day",
      title: "Day",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
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
});
