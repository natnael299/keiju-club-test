import { useOwnerStore } from "@/store/owner.store";
import Card from "@/components/shared/Card";

export default function UserCard() {
  const owner = useOwnerStore((state) => state.getSelectedOwner());

  return (
    <Card className="mb-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-extrabold text-primary">
          {owner?.fullName
            ?.split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div>
          <h2 className="text-xl font-bold">{owner?.fullName}</h2>

          <p className="text-sm text-muted-foreground">Keiju Club Member</p>
        </div>
      </div>
    </Card>
  );
}
