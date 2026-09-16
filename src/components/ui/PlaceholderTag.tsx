import { SHOW_PLACEHOLDER_TAGS } from '@/lib/site';

/**
 * Marks a value that is a stand-in, so nothing invented can quietly read as
 * fact during client review. Flip SHOW_PLACEHOLDER_TAGS in lib/site.ts once
 * every real value has landed.
 */
export function PlaceholderTag({ show = true }: { show?: boolean }) {
  if (!SHOW_PLACEHOLDER_TAGS || !show) return null;
  return (
    <span className="ml-1.5 inline-block rounded-full border border-warn-500/50 bg-warn-500/10 px-1.5 py-px align-middle text-[0.625rem] font-medium uppercase tracking-wide text-warn-500">
      sample
    </span>
  );
}
