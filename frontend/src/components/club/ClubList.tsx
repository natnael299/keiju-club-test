import ClubEventDetailCard from "@/components/cards/ClubEventDetailCard";
import type { ClubEvent } from "@/types";

type Props = {
  events: ClubEvent[];
};

export default function ClubList({ events }: Props) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <ClubEventDetailCard key={event.id} event={event} />
      ))}
    </div>
  );
}
