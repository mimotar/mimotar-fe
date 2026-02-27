import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  imgUrl?: string;
  className: string;
  nameAcronyms?: string;
}

export default function Avata({
  className,
  imgUrl,
  nameAcronyms,
}: AvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={`${imgUrl ? imgUrl : "/womanAvatar.PNG"}`} />
      <AvatarFallback className="p-1">{imgUrl ?? nameAcronyms}</AvatarFallback>
    </Avatar>
  );
}
