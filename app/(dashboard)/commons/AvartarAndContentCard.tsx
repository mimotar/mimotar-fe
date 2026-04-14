import { formatDate } from "@/app/utils/formatDate";
import Avata from "./Avartar";
import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface AvatarAndContentCard {
  notificationId: number;
  link: string | null;
  names: string;
  date: Date;
  content: string;
  imgUrl: string | null;
  isRead: boolean;
  onRead: (id: number | string) => void;
  isReading: boolean;
}
export default function AvatarAndContentCard({
  notificationId,
  link,
  names,
  date,
  content,
  imgUrl,
  isRead,
  onRead,
  isReading,
}: AvatarAndContentCard) {
  const ReadAbleDate = formatDate(date);

  const queryclient = useQueryClient();

  const navigate = useRouter();
  return (
    <section
      onClick={async (e) => {
        if (isRead) {
          e.stopPropagation();
          return;
        }
        if (!link) {
          e.stopPropagation();
          onRead(notificationId);
          await queryclient.invalidateQueries({ queryKey: ["notification"] });
          return;
        }
        onRead(notificationId);
        await queryclient.invalidateQueries({ queryKey: ["notification"] });
        navigate.push(link);
      }}
      className="flex items-center justify-between gap-3 "
    >
      <div className="flex items-center gap-3">
        <Avata imgUrl={imgUrl || ""} className="size-8" />
        <div className="flex flex-col w-[70%]">
          <div className="inline-flex gap-2 items-center">
            <h1 className="text-sm  font-medium">{names}</h1>
            <span className="text-[#64748B] text-xs">{ReadAbleDate}</span>
          </div>
          <p className="text-sm text-[#0F172A]">{content}.</p>
        </div>
      </div>
      {!isRead && <GoDotFill className={`rounded-full text-green-600`} />}
      {isReading && (
        <small
          className="text-green-600 text-xs
      "
        >
          Reading ...
        </small>
      )}
    </section>
  );
}
