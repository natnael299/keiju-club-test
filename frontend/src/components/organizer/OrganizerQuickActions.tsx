import { CalendarPlus, ListChecks } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/shared/Card";

export default function OrganizerQuickActions() {
  const navigate = useNavigate();

  return (
    <section className="mb-7 grid gap-3 sm:grid-cols-2">
      <button onClick={() => navigate("/organizer/events/new")}>
        <Card className="flex items-center gap-4 text-left">
          <CalendarPlus className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-extrabold">Create event</h3>
            <p className="text-sm text-muted-foreground">
              Add a new Club activity.
            </p>
          </div>
        </Card>
      </button>

      <button onClick={() => navigate("/organizer/events")}>
        <Card className="flex items-center gap-4 text-left">
          <ListChecks className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-extrabold">Manage events</h3>
            <p className="text-sm text-muted-foreground">
              Edit upcoming activities.
            </p>
          </div>
        </Card>
      </button>
    </section>
  );
}
