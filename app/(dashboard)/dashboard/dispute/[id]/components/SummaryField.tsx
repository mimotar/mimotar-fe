interface SummaryFieldProps {
  label: string;
  value: string;
}

export default function SummaryField({ label, value }: SummaryFieldProps) {
  return (
    <div className="flex min-w-[170px] flex-1 flex-col gap-1">
      <p className="text-base font-medium text-[#94A3B8]">{label}</p>
      <p className="text-[22px] font-medium leading-tight text-[#1E293B]">{value}</p>
    </div>
  );
}
