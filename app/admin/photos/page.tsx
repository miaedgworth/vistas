import Image from "next/image";
import { requireLogin } from "@/lib/auth";
import { getPhotos } from "@/lib/content";
import { sql } from "@/lib/db";
import {
  adoptDefaults,
  deletePhoto,
  movePhoto,
  updatePhotoAlt,
  uploadPhoto,
} from "@/app/admin/actions";
import { AdminPage, Field, SaveButton, inputClass } from "@/components/admin/Field";

export const dynamic = "force-dynamic";

const slots = [
  {
    key: "hero",
    title: "Home page hero",
    note: "The big photo at the top of the home page. Landscape works best. Only the first photo is used.",
  },
  {
    key: "strip",
    title: "Home page photo strip",
    note: "The row of three photos. Portrait shots suit the frames best.",
  },
  {
    key: "about",
    title: "About page photo",
    note: "Beside the writing on the About page. Only the first photo is used.",
  },
  {
    key: "merch",
    title: "Merch photo",
    note: "In the gift cards box on the About page. Only the first photo is used.",
  },
];

export default async function PhotosAdmin() {
  await requireLogin();

  const stored = (await sql`select slot, count(*)::int as n from photos group by slot`) as {
    slot: string;
    n: number;
  }[];
  const counts = Object.fromEntries(stored.map((r) => [r.slot, r.n]));
  const groups = await Promise.all(
    slots.map(async (slot) => ({ ...slot, photos: await getPhotos(slot.key) })),
  );

  return (
    <AdminPage
      title="Photos"
      intro="Upload new pictures and reorder them. Every photo needs a short description — that's what people using a screen reader hear, and what Google reads."
    >
      {groups.map((group) => {
        const isDefault = !counts[group.key];
        return (
          <section key={group.key} className="rounded-2xl bg-white p-7 ring-1 ring-teal/10">
            <h2 className="text-lg font-medium tracking-brand">{group.title}</h2>
            <p className="mt-1 text-sm text-teal/70">{group.note}</p>

            {isDefault && (
              <div className="mt-5 rounded-xl bg-cream/60 p-5">
                <p className="text-sm">
                  Showing the photos the site was built with. Import them to
                  reorder or replace them.
                </p>
                <form action={adoptDefaults} className="mt-4">
                  <input type="hidden" name="slot" value={group.key} />
                  <button
                    type="submit"
                    className="rounded-full bg-teal px-6 py-2.5 text-xs font-semibold uppercase tracking-brand text-white"
                  >
                    Import these
                  </button>
                </form>
              </div>
            )}

            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {group.photos.map((photo, index) => (
                <li key={photo.id} className="rounded-xl bg-sand/60 p-4">
                  <div className="overflow-hidden rounded-lg bg-white">
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      width={400}
                      height={300}
                      unoptimized
                      className="h-40 w-full object-cover"
                    />
                  </div>

                  {isDefault ? (
                    <p className="mt-3 text-sm text-teal/70">{photo.alt}</p>
                  ) : (
                    <>
                      <form action={updatePhotoAlt} className="mt-3 space-y-3">
                        <input type="hidden" name="id" value={photo.id} />
                        <Field label="Description">
                          <input name="alt" defaultValue={photo.alt} className={inputClass} />
                        </Field>
                        <button
                          type="submit"
                          className="rounded-full bg-teal px-5 py-2 text-xs font-semibold uppercase tracking-brand text-white"
                        >
                          Save
                        </button>
                      </form>

                      <div className="mt-3 flex flex-wrap items-center gap-4">
                        {index > 0 && (
                          <form action={movePhoto}>
                            <input type="hidden" name="id" value={photo.id} />
                            <input type="hidden" name="direction" value="up" />
                            <button type="submit" className="text-sm underline underline-offset-4 hover:text-ray">
                              Move earlier
                            </button>
                          </form>
                        )}
                        {index < group.photos.length - 1 && (
                          <form action={movePhoto}>
                            <input type="hidden" name="id" value={photo.id} />
                            <input type="hidden" name="direction" value="down" />
                            <button type="submit" className="text-sm underline underline-offset-4 hover:text-ray">
                              Move later
                            </button>
                          </form>
                        )}
                        <form action={deletePhoto}>
                          <input type="hidden" name="id" value={photo.id} />
                          <button type="submit" className="text-sm text-teal/60 underline underline-offset-4 hover:text-ray">
                            Remove
                          </button>
                        </form>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>

            <form
              action={uploadPhoto}
              className="mt-6 grid gap-4 rounded-xl border-2 border-dashed border-teal/20 p-5 sm:grid-cols-2"
            >
              <input type="hidden" name="slot" value={group.key} />
              <Field label="Choose an image" hint="JPEG, PNG or WebP, up to 8MB">
                <input
                  name="file"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  required
                  className="w-full text-sm"
                />
              </Field>
              <Field label="Description" hint="What's in the photo?">
                <input
                  name="alt"
                  required
                  placeholder="Rattan chairs in the golden-hour sun"
                  className={inputClass}
                />
              </Field>
              <div className="sm:col-span-2">
                <SaveButton>Upload photo</SaveButton>
              </div>
            </form>
          </section>
        );
      })}
    </AdminPage>
  );
}
