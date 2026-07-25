import EventForm from "@/components/organizer/EventForm";
import OrganizerLayout from "@/layouts/OrganizerLayout";

export default function CreateEvent() {
  return (
    <OrganizerLayout>
      <section className="mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Create event
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Add a new activity to Keiju Club.
        </p>
      </section>

      <EventForm />
    </OrganizerLayout>
  );
}
