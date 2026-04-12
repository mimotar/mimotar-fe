import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  imgUrl?: string;
  className: string;
  nameAcronyms?: string;
  onClick?: () => void;
}

export default function Avata({
  className,
  imgUrl,
  nameAcronyms,
  onClick,
}: AvatarProps) {
  return (
    <Avatar className={className} onClick={onClick}>
      <AvatarImage src={`${imgUrl ? imgUrl : "/womanAvatar.PNG"}`} />
      <AvatarFallback className="p-1">{imgUrl ?? nameAcronyms}</AvatarFallback>
    </Avatar>
  );
}
