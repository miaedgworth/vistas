import { requireLogin } from "@/lib/auth";
import { getSettings } from "@/lib/content";
import { saveSettings } from "@/app/admin/actions";
import { AdminPage, Field, SaveButton, inputClass } from "@/components/admin/Field";

export const dynamic = "force-dynamic";

export default async function DetailsPage() {
  await requireLogin();
  const s = await getSettings();

  return (
    <AdminPage
      title="Hours & contact"
      intro="These appear across the site and in the information Google reads, so search results update too."
    >
      <form action={saveSettings} className="space-y-6 rounded-2xl bg-white p-7 ring-1 ring-teal/10">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Opening hours" hint="Shown to visitors, e.g. 8am–5pm, every day">
            <input name="hoursLabel" defaultValue={s.hoursLabel} className={inputClass} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Opens" hint="24-hour, for Google">
              <input name="hoursOpens" type="time" defaultValue={s.hoursOpens} className={inputClass} />
            </Field>
            <Field label="Closes" hint="24-hour, for Google">
              <input name="hoursCloses" type="time" defaultValue={s.hoursCloses} className={inputClass} />
            </Field>
          </div>
          <Field label="Phone">
            <input name="phone" defaultValue={s.phone} className={inputClass} />
          </Field>
          <Field label="Email">
            <input name="email" type="email" defaultValue={s.email} className={inputClass} />
          </Field>
          <Field label="Street">
            <input name="addressStreet" defaultValue={s.addressStreet} className={inputClass} />
          </Field>
          <Field label="Parish / town">
            <input name="addressLocality" defaultValue={s.addressLocality} className={inputClass} />
          </Field>
          <Field label="Island / region">
            <input name="addressRegion" defaultValue={s.addressRegion} className={inputClass} />
          </Field>
          <Field label="Postcode">
            <input name="addressPostcode" defaultValue={s.addressPostcode} className={inputClass} />
          </Field>
          <Field label="Facebook page URL">
            <input name="facebook" type="url" defaultValue={s.facebook} className={inputClass} />
          </Field>
          <Field label="Video credit" hint="Shown under the video on the Events page">
            <input name="videoCredit" defaultValue={s.videoCredit} className={inputClass} />
          </Field>
        </div>
        <SaveButton>Save details</SaveButton>
      </form>
    </AdminPage>
  );
}
