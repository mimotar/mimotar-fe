import type { CountdownData } from "../types/dispute";

interface NegotiationCountdownProps {
  countdown: CountdownData;
}

interface CountdownUnitProps {
  value: number;
  label: string;
}

function CountdownUnit({ value, label }: CountdownUnitProps) {
  return (
    <div className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-xl border border-[#CBD5E1] bg-[#F8FAFC]">
      <span className="text-3xl font-semibold leading-none text-[#0F172A]">
        {String(value)}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">
        {label}
      </span>
    </div>
  );
}

export default function NegotiationCountdown({
  countdown,
}: NegotiationCountdownProps) {
  return (
    <section className="flex flex-wrap items-center gap-4">
      <p className="text-xl font-medium text-[#64748B]">Negotiation ends in:</p>
      <div className="flex items-center gap-2.5">
        <CountdownUnit value={countdown.days} label="Days" />
        <CountdownUnit value={countdown.hours} label="Hours" />
        <CountdownUnit value={countdown.minutes} label="Mins" />
      </div>
    </section>
  );
}
