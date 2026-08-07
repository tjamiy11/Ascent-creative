import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  demoUsers,
  kindLabel,
  projects,
  queue,
  projectStateLabel,
} from "@/lib/portal-data";

export const metadata: Metadata = {
  title: "Your projects",
  robots: { index: false, follow: false },
};

const words = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven"];

export default function PortalDashboardPage() {
  const user = demoUsers.client;
  const count = queue.length;

  return (
    <div className="container-edge py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <header className="border-b border-[color:var(--color-ink)] pb-8">
          <p className="eyebrow text-[color:var(--color-mute)]">{user.org}</p>
          <h1 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.95]">
            {count === 0 ? (
              <>Nothing needs you right now.</>
            ) : (
              <>
                {words[count] ?? count}{" "}
                {count === 1 ? "thing needs" : "things need"} <em>you.</em>
              </>
            )}
          </h1>
        </header>

        <section aria-labelledby="queue-heading" className="mt-2">
          <h2 id="queue-heading" className="sr-only">
            Waiting on you
          </h2>
          <ul>
            {queue.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="group grid grid-cols-[5.5rem_minmax(0,1fr)_auto] items-baseline gap-x-5 gap-y-1 border-b border-[color:var(--color-line)] py-6 transition-colors hover:bg-[color:var(--color-ink)]/[0.025] sm:gap-x-8"
                >
                  <span className="eyebrow text-[0.62rem] text-[color:var(--color-mute)]">
                    {kindLabel[item.kind]}
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[1.05rem] leading-snug underline-offset-[6px] group-hover:underline">
                      {item.title}
                    </span>
                    <span className="mt-1.5 block text-[0.82rem] text-[color:var(--color-mute)]">
                      {item.project}
                      <span aria-hidden className="mx-2 opacity-40">
                        /
                      </span>
                      {item.meta}
                    </span>
                  </span>

                  <span className="justify-self-end whitespace-nowrap text-right">
                    {item.due ? (
                      <em className="font-display text-[0.9rem]">{item.due}</em>
                    ) : (
                      <span
                        aria-hidden
                        className="text-[0.9rem] text-[color:var(--color-mute)] transition-transform group-hover:translate-x-0.5"
                      >
                        &rarr;
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="projects-heading" className="mt-16 md:mt-20">
          <h2
            id="projects-heading"
            className="eyebrow text-[0.65rem] text-[color:var(--color-mute)]"
          >
            All projects
          </h2>

          <ul className="mt-5 border-t border-[color:var(--color-line)]">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/portal/${project.slug}`}
                  className="group flex items-center gap-5 border-b border-[color:var(--color-line)] py-5 transition-colors hover:bg-[color:var(--color-ink)]/[0.025]"
                >
                  <span className="relative aspect-[3/2] w-24 shrink-0 overflow-hidden bg-[color:var(--color-ink)]/5 sm:w-32">
                    <Image
                      src={project.cover}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.78rem] text-[color:var(--color-mute)]">
                      {project.client}
                    </span>
                    <span className="font-display mt-0.5 block text-[1.15rem] leading-tight underline-offset-[6px] group-hover:underline">
                      {project.title}
                    </span>
                    <span className="mt-1.5 hidden text-[0.82rem] text-[color:var(--color-mute)] sm:block">
                      {project.summary}
                    </span>
                  </span>

                  <span className="hidden shrink-0 text-right sm:block">
                    <span className="eyebrow block text-[0.6rem] text-[color:var(--color-mute)]">
                      {projectStateLabel(project)}
                    </span>
                    <span className="mt-1 block text-[0.82rem] text-[color:var(--color-mute)]">
                      {project.shootDates}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
