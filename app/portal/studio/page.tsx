import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  activity,
  projects,
  projectStateLabel,
  studioQueue,
} from "@/lib/portal-data";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioDashboardPage() {
  const onYou = studioQueue.filter((i) => i.waitingOn === "studio");
  const onThem = studioQueue.filter((i) => i.waitingOn === "client");

  return (
    <div className="container-edge py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-b border-[color:var(--color-ink)] pb-8">
          <div>
            <p className="eyebrow text-[color:var(--color-mute)]">Studio</p>
            <h1 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.95]">
              {projects.length} active projects.
            </h1>
          </div>
          <Link
            href="/portal/studio/new"
            className="bg-[color:var(--color-ink)] px-5 py-2.5 text-[0.85rem] text-[color:var(--color-paper)] transition-opacity hover:opacity-80"
          >
            New proposal
          </Link>
        </header>

        <div className="mt-12 gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] xl:gap-16">
          <div className="min-w-0 space-y-12">
            <QueueBlock
              heading="Waiting on you"
              empty="Nothing on your plate."
              items={onYou}
            />
            <QueueBlock
              heading="Waiting on the client"
              empty="Everyone's caught up."
              items={onThem}
              muted
            />

            <section aria-labelledby="studio-projects">
              <h2
                id="studio-projects"
                className="eyebrow text-[0.65rem] text-[color:var(--color-mute)]"
              >
                Projects
              </h2>
              <ul className="mt-5 border-t border-[color:var(--color-line)]">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/portal/${project.slug}`}
                      className="group flex items-center gap-5 border-b border-[color:var(--color-line)] py-4 transition-colors hover:bg-[color:var(--color-ink)]/[0.025]"
                    >
                      <span className="relative aspect-[3/2] w-20 shrink-0 overflow-hidden bg-[color:var(--color-ink)]/5">
                        <Image
                          src={project.cover}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.78rem] text-[color:var(--color-mute)]">
                          {project.client}
                        </span>
                        <span className="font-display mt-0.5 block text-[1.1rem] leading-tight underline-offset-[6px] group-hover:underline">
                          {project.title}
                        </span>
                      </span>
                      <span className="hidden shrink-0 text-right sm:block">
                        <span className="eyebrow block text-[0.6rem] text-[color:var(--color-mute)]">
                          {projectStateLabel(project)}
                        </span>
                        <span className="mt-1 block text-[0.8rem] text-[color:var(--color-mute)]">
                          {project.shootDates}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="mt-12 lg:mt-0">
            <h2 className="eyebrow border-b border-[color:var(--color-ink)] pb-3 text-[0.65rem] text-[color:var(--color-mute)]">
              Activity
            </h2>
            <ul>
              {activity.map((event) => (
                <li
                  key={event.id}
                  className="border-b border-[color:var(--color-line)] py-3.5"
                >
                  <p className="text-[0.85rem] leading-snug">
                    <span
                      className={
                        event.who === "You"
                          ? "text-[color:var(--color-mute)]"
                          : ""
                      }
                    >
                      {event.who}
                    </span>{" "}
                    {event.what}
                  </p>
                  <p className="mt-1 text-[0.72rem] text-[color:var(--color-mute)]">
                    {event.project} · {event.when}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

function QueueBlock({
  heading,
  items,
  empty,
  muted = false,
}: {
  heading: string;
  items: { id: string; title: string; project: string; meta: string; href: string }[];
  empty: string;
  muted?: boolean;
}) {
  return (
    <section>
      <h2 className="eyebrow text-[0.65rem] text-[color:var(--color-mute)]">
        {heading}
      </h2>
      {items.length === 0 ? (
        <p className="mt-4 text-[0.88rem] text-[color:var(--color-mute)]">
          {empty}
        </p>
      ) : (
        <ul className="mt-4 border-t border-[color:var(--color-line)]">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-[color:var(--color-line)] py-4 transition-colors hover:bg-[color:var(--color-ink)]/[0.025]"
              >
                <span className="min-w-0 flex-1">
                  <span
                    className={
                      muted
                        ? "block text-[0.98rem] leading-snug text-[color:var(--color-mute)] underline-offset-[6px] group-hover:text-[color:var(--color-ink)] group-hover:underline"
                        : "block text-[0.98rem] leading-snug underline-offset-[6px] group-hover:underline"
                    }
                  >
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[0.8rem] text-[color:var(--color-mute)]">
                    {item.project}
                    <span aria-hidden className="mx-2 opacity-40">
                      /
                    </span>
                    {item.meta}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
