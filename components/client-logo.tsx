import Image from "next/image";
import clsx from "clsx";
import type { Client } from "@/lib/site-config";

/**
 * Sizing rule for the client wall.
 *
 * Capping logos with max-height and max-width doesn't work: whichever cap
 * binds first decides the size, so a 5.8:1 wordmark and a 1:1 roundel end up
 * with wildly different visual mass. Measured against the old rule, the wall
 * ran a 2.4x spread in rendered area, from 19px-tall Insomniac to 44px-tall
 * Arc'teryx.
 *
 * Instead every logo is scaled to the same *area*: height = sqrt(AREA/aspect).
 * Area is what the eye reads as "same size" across different shapes.
 *
 * INK is the fraction of the trimmed bounding box that's actually opaque
 * pixels, measured per file. Two logos at identical area still read
 * differently if one is a solid slab (Country Splash, 89% ink) and the other
 * is hairline linework (PGYTECH, 4%), so sparse marks get nudged up and dense
 * ones down. The exponent is deliberately small and the result clamped —
 * this is a thumb on the scale, not a second sizing system.
 */
const AREA = 4200; // px² of rendered logo, the constant every logo is scaled to
const REF_INK = 0.35; // ink coverage that gets no correction
const INK_EXP = 0.2;
const INK_MIN = 0.9;
const INK_MAX = 1.3;
// Bounds apply to the artwork, not the element. Very wide marks get capped by
// W_MAX long before H_MIN matters, so H_MIN only exists as a floor of last
// resort — set it too high and it inflates the widest logos past equal area.
const H_MIN = 16;
const H_MAX = 64;
const W_MAX = 160; // must stay under the slot width below (w-44 = 176px)

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Height to render the <img> at.
 *
 * The sizing target is the *artwork*, not the file. Several SVG lockups sit
 * inside a square viewBox — Ducati's is 82% empty — so sizing by the box made
 * their wordmarks a fifth the size of everything else. `trim` says what
 * fraction of the box the artwork fills; we solve for the artwork, then scale
 * back up to the box the browser actually lays out.
 */
export function logoHeight(client: Client) {
  const tw = client.trim?.w ?? 1;
  const th = client.trim?.h ?? 1;

  const inkAspect = (client.w * tw) / (client.h * th);
  const correction = clamp(
    (REF_INK / (client.ink ?? REF_INK)) ** INK_EXP,
    INK_MIN,
    INK_MAX
  );
  let inkH = clamp(Math.sqrt(AREA / inkAspect) * correction, H_MIN, H_MAX);
  // Cap the artwork's width, not the file's — otherwise a padded file like
  // PGYTECH spends its width allowance on empty margin.
  if (inkH * inkAspect > W_MAX) inkH = W_MAX / inkAspect;

  // Back out to the box the element occupies. The slot clips any overflow,
  // which is only transparent margin.
  return inkH / th;
}

/**
 * One logo in its slot. `tone` picks the colour treatment: the home wall
 * knocks everything to flat black, the testimonials wall uses greyscale.
 */
export function ClientLogo({
  client,
  tone = "ink",
}: {
  client: Client;
  tone?: "ink" | "grey";
}) {
  return (
    <span
      // overflow-hidden because a heavily padded file (Ducati) is laid out at
      // ~2x the slot height to get its artwork to the right size. The overflow
      // is transparent margin, so clipping it costs nothing and stops the box
      // from bleeding over neighbours.
      className="flex h-[72px] w-44 items-center justify-center overflow-hidden"
      title={client.name}
    >
      <Image
        src={client.logo}
        alt={client.name}
        width={client.w}
        height={client.h}
        // maxWidth none: a padded file's box can be wider than the slot, and
        // the global img max-width would shrink its artwork to fit.
        style={{ height: `${logoHeight(client)}px`, width: "auto", maxWidth: "none" }}
        className={clsx(
          "shrink-0 object-contain",
          tone === "grey"
            ? "opacity-70 grayscale mix-blend-multiply"
            : client.mono
            ? "opacity-70 grayscale"
            : "opacity-50 [filter:brightness(0)]"
        )}
        unoptimized
      />
    </span>
  );
}
