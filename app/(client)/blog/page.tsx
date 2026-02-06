import React from "react";

import SearchSection from "./components/SearchSection";
import PostTransactImge from "@/app/svgIconComponent/PosTransactImg";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import MoreInfoPreviewCard from "./components/MoreInfoPreviewCard";
import BlogPreviewCard from "./components/BlogPreviewCard";
import { blogSampleDataset } from "@/app/data/blogSampleDataset";
import { MoreInfoPreviewData } from "@/app/data/moreInfoPreviewData";
import Footer from "../component/Footer";
import "./cssmodule/heroBannerBg.css";

export default function page() {
  return (
    <section className="flex flex-col h-full w-full">
      <div className="md:min-h-[456px] min-h-[300px]  flex flex-col  justify-center items-center hero">
        <div className="lg:max-w-[935px] sm:w-[80%] w-[90%]">
          <h1 className="md:text-5xl text-3xl font-medium text-white text-center">
            How To Use MIMOTAR Services Safely{" "}
          </h1>
          <p className="md:text-xl text-lg mt-4 text-white  text-center">
            Discover the best practices for using escrow services to ensure
            secure transactions
          </p>
          <div className="flex justify-end mt-4">
            <PrimaryButton className="w-[135px] h-[48px]">
              Read More
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className="2xl:w-[80%] w-[90%] mx-auto mb-20">
        <SearchSection />
        <div className="grid md:grid-cols-4  grid-cols-1 md:gap-4">
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
      <Footer />
    </section>
  );
}
