import {defineType} from "sanity";

export const tag = defineType({
 name:"tag",
 title: "Tags",
 type: "document",
 fields: [
    {
        name: "name",
        title: "Tag Name",
        type: "string",
    },
    {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
            source: "name",
            maxLength: 96,
        }
    }
 ]
})