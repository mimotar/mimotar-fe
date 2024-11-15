import { formatDate } from "@/app/utils/formatDate";
import Avata from "./Avartar";
import { GoDotFill } from "react-icons/go";

interface AvatarAndContentCard {
  names: string;
  date: Date;
  content: string;
  imgUrl: string;
  isRead: boolean;
}
export default function AvatarAndContentCard({
  names,
  date,
  content,
  imgUrl,
  isRead,
}: AvatarAndContentCard) {
  const ReadAbleDate = formatDate(date);
  return (
    <section className="flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-3">
        <Avata imgUrl={imgUrl} className="size-8" />
        <div className="flex flex-col ">
          <div className="inline-flex gap-2 items-center">
            <h1 className="text-sm  font-medium">{names}</h1>
            <span className="text-[#64748B] text-xs">{ReadAbleDate}</span>
          </div>
          <p className="text-sm text-[#0F172A]">{content}.</p>
        </div>
      </div>
      {!isRead && <GoDotFill className={`rounded-full text-green-600`} />}
    </section>
  );
}
