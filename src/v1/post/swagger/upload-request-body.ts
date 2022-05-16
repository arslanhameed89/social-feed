export const UploadRequestBody = {
  author: {
    type: "string",
  },
  title: {
    type: "string",
  },
  content: {
    type: "string",
  },
  category: {
    type: "string",
  },
  tags: {
    type: "array",
    items: {
      type: "string",
    },
    description: "Tags in array []",
  },
};
