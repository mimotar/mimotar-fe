import { FileText, ImageIcon } from "lucide-react";

import type { EvidenceFile } from "../types/dispute";

interface EvidenceItemProps {
  evidence: EvidenceFile;
}

export default function EvidenceItem({ evidence }: EvidenceItemProps) {
  const Icon = evidence.fileType === "pdf" ? FileText : ImageIcon;

  return (
    <div className="inline-flex min-w-[220px] flex-col gap-1 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3">
      <div className="inline-flex items-center gap-2 text-[#475569]">
        <Icon size={20} />
        <span className="text-xl font-medium">{evidence.fileName}</span>
      </div>
      <p className="text-base text-[#64748B]">{evidence.submittedAt}</p>
    </div>
  );
}
