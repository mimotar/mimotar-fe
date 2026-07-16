export default function ActionRequired() {
  return (
    <>
      {/* {actionRequiredProjects.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
            <h2 className="text-h4 text-gray-800">
              Action Required ({actionRequiredProjects.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actionRequiredProjects.map((p) => {
              // Determine prompt copy dynamically based on status & current view
              let actionTitle = "";
              let actionBtnText = "";
              let badgeStyle = "";

              if (p.agreementStatus === "pending_invite") {
                actionTitle = "Review & Sign Agreement Proposal";
                actionBtnText = "Accept / Review";
                badgeStyle = "bg-purple-100 text-purple-700";
              } else if (
                p.agreementStatus === "accepted" &&
                p.escrowStatus === "unfunded"
              ) {
                actionTitle = `Fund Pending Escrow Contract`;
                actionBtnText = "Fund (Flutterwave)";
                badgeStyle = "bg-brand-primary/10 text-brand-primary";
              } else if (p.escrowStatus === "funded" && !p.isDelivered) {
                actionTitle = `Submit Project Deliverables`;
                actionBtnText = "Upload & Deliver";
                badgeStyle = "bg-emerald-50 text-emerald-700 font-semibold";
              } else if (p.isDelivered && !p.isReleased) {
                actionTitle = `Review & Approve Work Deliverables`;
                actionBtnText = "Review Submission";
                badgeStyle = "bg-amber-100 text-[#854d0e]";
              } else if (p.escrowStatus === "disputed") {
                actionTitle = "Escrow Disputed - Support Active";
                actionBtnText = "Dispute Room";
                badgeStyle = "bg-red-100 text-red-700";
              }

              return (
                <div
                  key={p.id}
                  className="bg-white p-5 rounded-2xl shadow-xs border border-gray-100 hover:shadow-md transition flex flex-col justify-between gap-4 animate-fade-in text-left"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-caption px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${badgeStyle}`}
                        >
                          {actionTitle}
                        </span>
                        <span
                          className={`text-[9px] px-2 py-0.5 font-bold uppercase rounded-md tracking-wider ${p.creatorRole === "client" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" : "bg-magenta-55/15 text-[#c026d3] border border-magenta-200/20"}`}
                        >
                          You:{" "}
                          {p.creatorRole === "client" ? "Client" : "Freelancer"}
                        </span>
                      </div>
                      <h3 className="text-h4 text-gray-900 mt-3 line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-body-sm text-gray-400 mt-1">
                        Contract value:{" "}
                        <span className="font-extrabold text-amount text-gray-700">
                          {formatMoney(p.amount, p.currency)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <span className="text-caption text-brand-neutral font-semibold">
                      From:{" "}
                      {p.creatorRole === "client" ? p.otherPartyName : "You"}
                    </span>
                    <button
                      onClick={() => selectProject(p.id)}
                      className="px-3.5 py-1.5 bg-brand-primary text-white text-[11px] font-bold rounded-lg transition hover:bg-brand-primary/95 flex items-center gap-1 cursor-pointer font-sans"
                    >
                      {actionBtnText}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )} */}
    </>
  );
}
