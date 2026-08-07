"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

type Row = { id: number; a: string; b: string; c: string };

let nextId = 100;
const row = (a = "", b = "", c = "") => ({ id: nextId++, a, b, c });

type Mode = "proposal" | "briefing";

/**
 * Stefan's authoring surface, in two modes.
 *
 * Proposal is the default because it comes first in the real sequence and
 * it's the one that decides whether there's a job at all. The two modes are
 * deliberately different lengths: a proposal is short enough to write between
 * calls, while a briefing is the long-form detail that only matters once the
 * client has already said yes.
 *
 * Demo only — nothing is saved and the dropzones don't upload.
 */
export function BriefingComposer() {
  const [mode, setMode] = useState<Mode>("proposal");
  const [sent, setSent] = useState(false);

  const [client, setClient] = useState("");
  const [title, setTitle] = useState("");
  const [pitch, setPitch] = useState("");
  const [approach, setApproach] = useState("");

  const [deliverables, setDeliverables] = useState<Row[]>([row(), row(), row()]);
  const [price, setPrice] = useState("");
  const [terms, setTerms] = useState("50% to book the dates, 50% on delivery.");
  const [holdUntil, setHoldUntil] = useState("");

  const [dates, setDates] = useState("");
  const [firstCut, setFirstCut] = useState("");
  const [delivery, setDelivery] = useState("");

  const [shots, setShots] = useState<Row[]>([
    row("01"),
    row("02"),
    row("03"),
  ]);
  const [call, setCall] = useState("");
  const [location, setLocation] = useState("");

  function patch(
    set: React.Dispatch<React.SetStateAction<Row[]>>,
    id: number,
    next: Partial<Row>
  ) {
    set((prev) => prev.map((r) => (r.id === id ? { ...r, ...next } : r)));
  }

  if (sent) {
    const filled =
      mode === "proposal"
        ? deliverables.filter((d) => d.a.trim()).length
        : shots.filter((s) => s.b.trim()).length;
    return (
      <div className="container-edge py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-[color:var(--color-mute)]">Sent</p>
          <h1 className="font-display mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-[0.95]">
            {client || "The client"} has it.
          </h1>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-[color:var(--color-mute)]">
            {mode === "proposal" ? (
              <>
                They got a link straight to the proposal for{" "}
                <em className="text-[color:var(--color-ink)]">
                  {title || "the project"}
                </em>
                : {filled} deliverables, {price || "the price"}, and one Accept
                button. You&rsquo;ll see it the moment they open it.
              </>
            ) : (
              <>
                The brief for{" "}
                <em className="text-[color:var(--color-ink)]">
                  {title || "the project"}
                </em>{" "}
                is live: concept, {filled} setups, and logistics. The shot list
                is waiting on their sign-off.
              </>
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/portal/studio"
              className="bg-[color:var(--color-ink)] px-5 py-2.5 text-[0.85rem] text-[color:var(--color-paper)] transition-opacity hover:opacity-80"
            >
              Back to studio
            </Link>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="border border-[color:var(--color-line)] px-5 py-2.5 text-[0.85rem] transition-colors hover:border-[color:var(--color-ink)]"
            >
              Keep editing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-edge py-10 md:py-14">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/portal/studio"
          className="text-[0.82rem] text-[color:var(--color-mute)] transition-colors hover:text-[color:var(--color-ink)]"
        >
          &larr; Studio
        </Link>

        <header className="mt-6 border-b border-[color:var(--color-ink)] pb-8">
          <div className="flex w-fit items-center rounded-full border border-[color:var(--color-line)] p-0.5">
            {(["proposal", "briefing"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={clsx(
                  "rounded-full px-4 py-1.5 text-[0.8rem] capitalize transition-colors",
                  mode === m
                    ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                    : "text-[color:var(--color-mute)] hover:text-[color:var(--color-ink)]"
                )}
              >
                {m}
              </button>
            ))}
          </div>
          <h1 className="font-display mt-5 text-[clamp(2rem,4.5vw,3rem)] leading-[0.95]">
            {mode === "proposal" ? (
              <>
                What are we <em>pitching?</em>
              </>
            ) : (
              <>
                What are we <em>shooting?</em>
              </>
            )}
          </h1>
          <p className="mt-3 max-w-[48ch] text-[0.9rem] leading-relaxed text-[color:var(--color-mute)]">
            {mode === "proposal"
              ? "Keep it short. The client sees one page ending in an Accept button — every extra field is one more thing between them and yes."
              : "The long version, for work that's already booked. Only the client on this project sees it."}
          </p>
        </header>

        <form
          className="divide-y divide-[color:var(--color-line)]"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <Block heading="Project">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Client" value={client} onChange={setClient} placeholder="Mamitas" />
              <Field label="Title" value={title} onChange={setTitle} placeholder="Summer Launch" />
            </div>
          </Block>

          {mode === "proposal" ? (
            <>
              <Block heading="The one line">
                <Field
                  label="Pitch"
                  value={pitch}
                  onChange={setPitch}
                  placeholder="A launch film and three cutdowns, shot over two days."
                />
              </Block>

              <Block heading="Approach">
                <textarea
                  rows={4}
                  value={approach}
                  onChange={(e) => setApproach(e.target.value)}
                  placeholder="Two short paragraphs, in the voice you'd use on a call."
                  className="w-full resize-none border border-[color:var(--color-line)] bg-transparent p-3.5 text-[0.95rem] leading-relaxed outline-none transition-colors placeholder:text-[color:var(--color-mute)]/60 focus:border-[color:var(--color-ink)]"
                />
              </Block>

              <Block heading="What they get">
                <RepeatRows
                  rows={deliverables}
                  set={setDeliverables}
                  patch={patch}
                  addLabel="Add a deliverable"
                  cols="minmax(0,14rem)_minmax(0,1fr)"
                  placeholders={["60-second launch film", "The hero. Yours for paid and organic."]}
                />
              </Block>

              <Block heading="When">
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="Shoot" value={dates} onChange={setDates} placeholder="Apr 11–12" />
                  <Field label="First cut" value={firstCut} onChange={setFirstCut} placeholder="Apr 25" />
                  <Field label="Final" value={delivery} onChange={setDelivery} placeholder="May 9" />
                </div>
              </Block>

              <Block heading="Investment">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Total" value={price} onChange={setPrice} placeholder="$18,500" />
                  <Field label="Terms" value={terms} onChange={setTerms} />
                </div>
                <div className="mt-5">
                  <Field
                    label="Dates held until (optional)"
                    value={holdUntil}
                    onChange={setHoldUntil}
                    placeholder="Fri Apr 4"
                  />
                  <p className="mt-2 text-[0.78rem] leading-relaxed text-[color:var(--color-mute)]">
                    Only fill this in if you&rsquo;re genuinely holding the
                    dates. Clients can smell an invented deadline, and it costs
                    more jobs than it wins.
                  </p>
                </div>
              </Block>
            </>
          ) : (
            <>
              <Block heading="Concept">
                <textarea
                  rows={5}
                  value={approach}
                  onChange={(e) => setApproach(e.target.value)}
                  placeholder="What is this, in the voice you'd use on a call. The client reads this first."
                  className="w-full resize-none border border-[color:var(--color-line)] bg-transparent p-3.5 text-[0.95rem] leading-relaxed outline-none transition-colors placeholder:text-[color:var(--color-mute)]/60 focus:border-[color:var(--color-ink)]"
                />
              </Block>

              <Block heading="Deck & references">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Dropzone label="Drop a deck" hint="PDF or Keynote" />
                  <Dropzone label="Drop moodboard stills" hint="JPG or PNG, up to 20" />
                </div>
              </Block>

              <Block heading="Shot list">
                <RepeatRows
                  rows={shots}
                  set={setShots}
                  patch={patch}
                  addLabel="Add a setup"
                  cols="2.5rem_minmax(0,1fr)"
                  placeholders={["01", "Setup"]}
                  thirdPlaceholder="Lens / movement"
                />
              </Block>

              <Block heading="Logistics">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Shoot dates" value={dates} onChange={setDates} placeholder="Apr 11–12" />
                  <Field label="Call time" value={call} onChange={setCall} placeholder="16:00, wrap by 22:00" />
                  <div className="sm:col-span-2">
                    <Field label="Location" value={location} onChange={setLocation} placeholder="Fulton Market rooftop, Chicago" />
                  </div>
                </div>
              </Block>
            </>
          )}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 py-8">
            <p className="mr-auto text-[0.85rem] text-[color:var(--color-mute)]">
              {mode === "proposal"
                ? "They get an email with a link straight to the proposal."
                : "The client gets an email with a link straight to this brief."}
            </p>
            <button
              type="button"
              className="border border-[color:var(--color-line)] px-5 py-2.5 text-[0.85rem] transition-colors hover:border-[color:var(--color-ink)]"
            >
              Save draft
            </button>
            <button
              type="submit"
              className="bg-[color:var(--color-ink)] px-5 py-2.5 text-[0.85rem] text-[color:var(--color-paper)] transition-opacity hover:opacity-80"
            >
              {mode === "proposal" ? "Send proposal" : "Send to client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function RepeatRows({
  rows,
  set,
  patch,
  addLabel,
  cols,
  placeholders,
  thirdPlaceholder,
}: {
  rows: Row[];
  set: React.Dispatch<React.SetStateAction<Row[]>>;
  patch: (
    set: React.Dispatch<React.SetStateAction<Row[]>>,
    id: number,
    next: Partial<Row>
  ) => void;
  addLabel: string;
  cols: string;
  placeholders: [string, string];
  thirdPlaceholder?: string;
}) {
  return (
    <div>
      <ul className="border-t border-[color:var(--color-line)]">
        {rows.map((r) => (
          <li
            key={r.id}
            className="grid items-center gap-x-3 border-b border-[color:var(--color-line)] py-2.5"
            style={{ gridTemplateColumns: `${cols} 1.5rem` }}
          >
            <input
              aria-label={placeholders[0]}
              value={r.a}
              onChange={(e) => patch(set, r.id, { a: e.target.value })}
              placeholder={placeholders[0]}
              className="w-full bg-transparent text-[0.92rem] outline-none placeholder:text-[color:var(--color-mute)]/60"
            />
            <div className="min-w-0">
              <input
                aria-label={placeholders[1]}
                value={r.b}
                onChange={(e) => patch(set, r.id, { b: e.target.value })}
                placeholder={placeholders[1]}
                className="w-full bg-transparent text-[0.92rem] outline-none placeholder:text-[color:var(--color-mute)]/60"
              />
              {thirdPlaceholder && (
                <input
                  aria-label={thirdPlaceholder}
                  value={r.c}
                  onChange={(e) => patch(set, r.id, { c: e.target.value })}
                  placeholder={thirdPlaceholder}
                  className="mt-0.5 w-full bg-transparent text-[0.8rem] text-[color:var(--color-mute)] outline-none placeholder:text-[color:var(--color-mute)]/60"
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => set((prev) => prev.filter((x) => x.id !== r.id))}
              aria-label="Remove row"
              className="justify-self-end text-[0.9rem] text-[color:var(--color-mute)] transition-colors hover:text-[color:var(--color-ink)]"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => set((prev) => [...prev, row()])}
        className="mt-3 text-[0.84rem] underline underline-offset-4 hover:opacity-60"
      >
        {addLabel}
      </button>
    </div>
  );
}

function Block({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-8 first:pt-8">
      <h2 className="eyebrow mb-5 text-[0.65rem] text-[color:var(--color-mute)]">
        {heading}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const id = `f-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="eyebrow block text-[0.6rem] text-[color:var(--color-mute)]"
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full border-b border-[color:var(--color-line)] bg-transparent pb-2 text-[0.95rem] outline-none transition-colors placeholder:text-[color:var(--color-mute)]/60 focus:border-[color:var(--color-ink)]"
      />
    </div>
  );
}

function Dropzone({ label, hint }: { label: string; hint: string }) {
  return (
    <button
      type="button"
      className="border border-dashed border-[color:var(--color-line)] px-5 py-8 text-center transition-colors hover:border-[color:var(--color-ink)]"
    >
      <span className="block text-[0.9rem]">{label}</span>
      <span className="mt-1 block text-[0.78rem] text-[color:var(--color-mute)]">
        {hint}
      </span>
    </button>
  );
}
