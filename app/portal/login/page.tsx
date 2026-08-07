import type { Metadata } from "next";
import { LoginForm } from "@/components/portal/login-form";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Sign in to your Ascent Studios project.",
  robots: { index: false, follow: false },
};

export default function PortalLoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col justify-between px-8 py-10 sm:px-14 lg:px-20">
        <Link href="/" aria-label="Ascent Studios home" className="w-fit">
          <Image
            src="/brand/ascent-horizontal-grey.png"
            alt="Ascent Studios"
            width={1869}
            height={395}
            priority
            className="h-5 w-auto"
          />
        </Link>

        <div className="max-w-md py-16">
          <p className="eyebrow text-[color:var(--color-mute)]">Client Portal</p>
          <h1 className="font-display mt-4 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95]">
            Your project,
            <br />
            <em>in one place.</em>
          </h1>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-[color:var(--color-mute)]">
            Briefs, shot lists, cuts for review, and final files. Enter the
            email address your project was shared with and we&rsquo;ll send you
            a sign-in link.
          </p>

          <LoginForm />
        </div>

        <p className="text-[0.8rem] text-[color:var(--color-mute)]">
          Not a client yet?{" "}
          <Link href="/contact" className="text-[color:var(--color-ink)] underline underline-offset-4">
            Start a project
          </Link>
        </p>
      </div>

      {/* Stefan's own frame rather than a client still: the portal is Ascent's
          surface, not a showcase of someone else's campaign. Portrait source,
          so a full-height panel crops it barely at all. */}
      <div className="relative hidden lg:block">
        <Image
          src="/photos/cocora-85.jpg"
          alt=""
          fill
          priority
          sizes="55vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
