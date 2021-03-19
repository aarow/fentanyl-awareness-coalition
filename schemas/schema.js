// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    {
      title: "Menu",
      name: "menu",
      type: "document",
      fields: [
        {
          title: "Title",
          name: "title",
          type: "string",
        },
        {
          title: "Menu Item",
          name: "menuItem",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "page" }],
            },
            {
              title: "Link",
              type: "object",
              fields: [
                {
                  title: "Url",
                  name: "href",
                  type: "url",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Page",
      name: "page",
      type: "document",
      fields: [
        {
          title: "Title",
          name: "title",
          type: "string",
        },
        {
          title: "Slug",
          name: "slug",
          type: "slug",
          options: {
            source: "title",
            maxLength: 200,
          },
        },
        {
          title: "Body",
          name: "body",
          type: "array",
          of: [
            { type: "block" },
            {
              type: "image",
              fields: [
                {
                  type: "text",
                  name: "alt",
                  title: "Alternative Text",
                  description:
                    "Some visitor cannot see imgages so put something descriptive",
                  options: {
                    isHighlighted: true,
                  },
                },
              ],
            },
          ],
        },
        { title: "Cover", name: "cover", type: "image" },
      ],
    },
  ]),
});
