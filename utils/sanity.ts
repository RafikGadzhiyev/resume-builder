import { createClient } from "@sanity/client";
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TEST_TOKEN,
  apiVersion: "2021-08-31",
  useCdn: true,
});
