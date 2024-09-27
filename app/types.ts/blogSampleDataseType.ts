import { blogSampleDataset } from "../data/blogSampleDataset";

export type blogSampleDatasetType = {
  id: string;
  imgUrl: string;
  title: string;
  category?: string;
  content: string;
};
