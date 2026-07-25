import EventForm from "@/components/organizer/EventForm";
import OrganizerLayout from "@/layouts/OrganizerLayout";

export default function EditEvent() {
  return (
    <OrganizerLayout>
      <section className="mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Edit event
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Update event details.
        </p>
      </section>

      <EventForm />
    </OrganizerLayout>
  );
}
