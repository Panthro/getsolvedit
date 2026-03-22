/**
 * Version-1–style QR matrix (21×21): real finder + timing patterns; data area is
 * decorative (does not encode a payload). Looks like a real QR at a glance.
 */
const SIZE = 21;

const FINDER: number[][] = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

function finderAt(x: number, y: number, ox: number, oy: number): boolean | null {
  const fx = x - ox;
  const fy = y - oy;
  if (fx < 0 || fx > 6 || fy < 0 || fy > 6) return null;
  return FINDER[fy][fx] === 1;
}

function dataModuleBlack(x: number, y: number): boolean {
  const n = x * 17 + y * 23;
  const a = (n ^ (n >> 3)) & 1;
  const b = ((x * y + x + y) % 7) & 1;
  return Boolean(a ^ b);
}

function isBlackModule(x: number, y: number): boolean {
  const tl = finderAt(x, y, 0, 0);
  if (tl !== null) return tl;
  const tr = finderAt(x, y, 14, 0);
  if (tr !== null) return tr;
  const bl = finderAt(x, y, 0, 14);
  if (bl !== null) return bl;

  if (y === 6 && x >= 7 && x <= 13) return x % 2 === 1;
  if (x === 6 && y >= 7 && y <= 13) return y % 2 === 1;

  return dataModuleBlack(x, y);
}

type MenuQrIllustrationProps = {
  className?: string;
};

export function MenuQrIllustration({ className = "" }: MenuQrIllustrationProps) {
  const caption =
    "Decorative QR code illustration showing finder patterns. Your real table QR stays the same when you update the menu.";

  const cells: { x: number; y: number; black: boolean }[] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      cells.push({ x, y, black: isBlackModule(x, y) });
    }
  }

  return (
    <figure className={`mx-auto ${className}`}>
      <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-lg shadow-stone-900/8 ring-1 ring-stone-200/90">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="w-full max-w-[min(100%,220px)] aspect-square mx-auto block"
          role="img"
          aria-label={caption}
        >
          <title>{caption}</title>
          <rect width={SIZE} height={SIZE} fill="#ffffff" />
          {cells.map(({ x, y, black }) =>
            black ? (
              <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#0c0c0c" />
            ) : null
          )}
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-xs text-stone-500 max-w-[260px] mx-auto leading-snug">
        Illustration — your printed QR stays put; only the file behind it changes.
      </figcaption>
    </figure>
  );
}
