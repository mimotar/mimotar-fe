import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  imgUrl?: string;
  className: string;
}

export default function Avata({ className, imgUrl }: AvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={`${imgUrl ? imgUrl : "https://github.com/shadcn.png"}`}
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
("https://github.com/shadcn.png");
