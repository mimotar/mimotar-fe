import React from "react";

import SearchSection from "./components/SearchSection";
import PostTransactImge from "@/app/svgIconComponent/PosTransactImg";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import MoreInfoPreviewCard from "./components/MoreInfoPreviewCard";
import BlogPreviewCard from "./components/BlogPreviewCard";
import { blogSampleDataset } from "@/app/data/blogSampleDataset";
import { MoreInfoPreviewData } from "@/app/data/moreInfoPreviewData";

export default function page() {
  return (
    <section className="flex flex-col h-full w-full">
      <div className="h-[350px] bg-red-300"></div>
      <div className="w-[80%] mx-auto">
        <SearchSection />
        <div className="grid grid-cols-4 ">
          <div className="col-span-3 space-y-8">
            {blogSampleDataset.map((blog, i) => (
              <BlogPreviewCard key={i} data={blog} />
            ))}
          </div>

          <div className="col-span-1 flex flex-col space-y-4 h-full">
            {MoreInfoPreviewData.map((item, i) => (
              <MoreInfoPreviewCard key={i} data={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
