import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileProps {
  name: string;
  email: string;
  avatarUrl: string;
}

export function UserProfile({ name, email, avatarUrl }: UserProfileProps) {
  return (
    <div className="flex items-center gap-3 p-4 border-t">
      <Avatar>
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="overflow-hidden">
        <p className="font-semibold truncate">{name}</p>
        <p className="text-sm text-muted-foreground truncate">{email}</p>
      </div>
    </div>
  );
}
