import { TrendingUp } from "lucide-react";

export default function ActiveContract_RecentLog() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* <div className="lg:col-span-2 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-gray-800">
              Your Active Contracts ({activeProjects.length})
            </h2>
            <button
              onClick={() => setActivePage("projects")}
              className="text-body-sm font-bold text-brand-primary hover:underline flex items-center gap-1 font-sans"
            >
              See All
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {activeProjects.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center flex flex-col items-center justify-center border border-gray-50 shadow-xs animate-fade-in">
              <div className="w-14 h-14 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-4">
                <QuestionIcon className="w-7 h-7" />
              </div>
              <h3 className="text-h3 text-gray-900">
                Start your first project to secure payments
              </h3>
              <p className="text-body-sm text-brand-neutral mt-2 max-w-sm leading-relaxed">
                Connect with clients locally or internationally. No milestones
                are worked on without funded reserves protecting your delivery.
              </p>
              <button
                onClick={() => setActivePage("start-project")}
                className="mt-6 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-xl px-5 py-2.5 text-xs font-bold transition flex items-center gap-2 cursor-pointer active:scale-95 shadow-sm font-sans"
              >
                <Plus className="w-4 h-4" /> Start Project
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {activeProjects.map((p) => {
                let statusBadge = "";
                let statusLabel = "";

                if (p.escrowStatus === "unfunded") {
                  statusBadge = "bg-gray-100 text-gray-500";
                  statusLabel = "Awaiting Funding";
                } else if (p.escrowStatus === "funded" && !p.isDelivered) {
                  statusBadge = "bg-purple-100 text-brand-primary font-bold";
                  statusLabel = "In Progress";
                } else if (p.isDelivered && !p.isReleased) {
                  statusBadge = "bg-amber-100 text-[#854d0e] font-bold";
                  statusLabel = "Delivered";
                } else if (p.escrowStatus === "disputed") {
                  statusBadge = "bg-red-100 text-red-700 font-bold";
                  statusLabel = "Disputed";
                }

                return (
                  <div
                    key={p.id}
                    onClick={() => selectProject(p.id)}
                    className="bg-white p-5 rounded-2xl shadow-xs border border-gray-100/30 hover:shadow-md transition cursor-pointer flex items-center justify-between gap-4 animate-fade-in group text-left"
                  >
                    <div className="space-y-1 max-w-[70%]">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-caption px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold ${statusBadge}`}
                        >
                          {statusLabel}
                        </span>
                        <span
                          className={`text-[9px] px-2 py-0.5 font-bold uppercase rounded-md tracking-wider ${p.creatorRole === "client" ? "bg-indigo-50 text-indigo-700 border border-indigo-100/50" : "bg-magenta-55/15 text-[#c026d3] border border-magenta-200/20"}`}
                        >
                          You:{" "}
                          {p.creatorRole === "client" ? "Client" : "Freelancer"}
                        </span>
                        <span className="text-caption text-gray-400 font-mono">
                          ID: {p.id.split("-")[1]}
                        </span>
                      </div>
                      <h4 className="text-h5 text-gray-900 line-clamp-1 group-hover:text-brand-primary transition">
                        {p.title}
                      </h4>
                      <p className="text-body-sm text-gray-400">
                        Total Escrow Value:{" "}
                        <span className="font-extrabold text-amount text-gray-700">
                          {formatMoney(p.amount, p.currency)}
                        </span>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-caption text-gray-400 block mb-1">
                        Fee:{" "}
                        {p.feePayer === "split"
                          ? "Split (1.5% each)"
                          : p.feePayer === "client"
                            ? "Client Paid"
                            : "Freelancer Paid"}
                      </span>
                      <span className="text-caption font-bold text-gray-700 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100 font-mono">
                        {p.deadline}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div> */}

      {/* Recent Activities Log column */}
      <div className="space-y-4 text-left ">
        <h2 className="text-h4 text-gray-800 text-left">Recent Account Logs</h2>
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100/50 space-y-4">
          <div className="flex items-center gap-1.5 p-3.5 bg-purple-50 rounded-xl">
            <TrendingUp className="w-4 h-4 text-brand-primary" />
            <div className="text-caption text-slate-700 font-semibold leading-tight font-sans">
              Platform fee payer averages:{" "}
              <span className="font-bold text-brand-primary">
                Split-fee Option (50-50)
              </span>{" "}
              is preferred for payouts.
            </div>
          </div>

          <div className="relative border-l-2 border-gray-100 pl-4.5 space-y-5 py-2">
            <div className="relative">
              <div className="absolute -left-[24.5px] top-0 bg-emerald-500 rounded-full w-[11px] h-[11px] border-2 border-white" />
              <span className="text-caption text-gray-400 font-mono block">
                2 Hours Ago
              </span>
              <span className="text-body-sm font-bold text-gray-800">
                Funds Secured in Escrow
              </span>
              <p className="text-caption text-gray-500 mt-0.5 leading-normal">
                Naira secure: ₦850,000 deposits locked for E-Commerce platform
                development.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[24.5px] top-0 bg-[#eab308] rounded-full w-[11px] h-[11px] border-2 border-white" />
              <span className="text-caption text-gray-400 font-mono block">
                1 Day Ago
              </span>
              <span className="text-body-sm font-bold text-gray-800">
                Milestone Completed
              </span>
              <p className="text-caption text-gray-500 mt-0.5 leading-normal">
                Amara updated UI Figma wireframes and submitted design assets
                for client check.
              </p>
            </div>

            <div className="relative font-sans">
              <div className="absolute -left-[24.5px] top-0 bg-blue-500 rounded-full w-[11px] h-[11px] border-2 border-white" />
              <span className="text-caption text-gray-400 font-mono block">
                3 Days Ago
              </span>
              <span className="text-body-sm font-bold text-gray-805">
                Contract Agreement Signed
              </span>
              <p className="text-caption text-gray-500 mt-0.5 leading-normal">
                Both parties acknowledged and authorized dispute guidelines for
                Milestone 1.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
