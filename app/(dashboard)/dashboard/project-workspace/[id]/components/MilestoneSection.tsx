import { formatNumberToCurrency } from "@/app/utils/formatNumberToCurrency";
import { ITransaction } from "../../../projects/types/ITransaction";

interface IMilestoneSectionProps {
  project: ITransaction;
  role: "CLIENT" | "FREELANCER";
}

export default function MilestoneSection({
  project,
  role,
}: IMilestoneSectionProps) {
  return (
    <div className="pt-4 border-t border-gray-50">
      <span className="text-label text-gray-400 block mb-3 font-bold uppercase tracking-wider text-[10px]">
        Escrow Milestone Phases ({project.milestones.length})
      </span>
      <div className="space-y-4">
        {project.milestones.map((m, i) => {
          const isProjectFunded =
            project.payment?.status == "PENDING" ||
            project.payment?.status == "FAILED";

          // Determine Milestone Status Layout
          let statusBadge = null;
          let cardBorderColor = "border-gray-100";
          let cardBgColor = "bg-gray-50/50";

          if (m.status === "COMPLETED") {
            statusBadge = (
              <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Released
              </span>
            );
            cardBorderColor = "border-emerald-100/55";
            cardBgColor = "bg-emerald-50/[0.02]";
          } else if (m.status === "DISPUTE") {
            statusBadge = (
              <span className="text-[10px] text-red-650 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider animate-pulse">
                Disputed
              </span>
            );
            cardBorderColor = "border-red-100/60";
            cardBgColor = "bg-red-50/[0.01]";
          } else if (m.status === "ONGOING") {
            statusBadge = (
              <span className="text-[10px] text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Submitted - Pending Release
              </span>
            );
            cardBorderColor = "border-amber-100/60";
            cardBgColor = "bg-amber-50/[0.02]";
          } else if (!isProjectFunded) {
            statusBadge = (
              <span className="text-[10px] text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Awaiting Funding
              </span>
            );
          } else {
            statusBadge = (
              <span className="text-[10px] text-brand-primary bg-brand-primary/5 border border-brand-primary/10 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Active / In Progress
              </span>
            );
            cardBorderColor = "border-brand-primary/10";
            cardBgColor = "bg-white";
          }

          return (
            <div
              key={m.id}
              className={`p-5 rounded-2xl flex flex-col gap-3.5 border ${cardBorderColor} ${cardBgColor} text-xs font-sans transition-all duration-200`}
            >
              {/* Upper row: title & amount & status */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200/50 font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      Phase {i + 1}
                    </span>
                    {statusBadge}
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 font-display mt-1">
                    {m.name}
                  </h4>
                  <span className="text-[10.5px] text-gray-405 block font-semibold">
                    Deadline:{" "}
                    <span className="text-gray-600">{m.deadline}</span>
                  </span>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 bg-white shadow-xs border border-gray-150 px-3.5 py-2 rounded-xl">
                  <span className="text-[10px] text-gray-400 font-bold uppercase font-mono tracking-wider">
                    Value:
                  </span>
                  <span className="text-xs font-extrabold text-gray-900 font-mono">
                    {/* {formatMoney(m.amount, project.currency)} */}
                    {formatNumberToCurrency(m.amount, project.currency)}
                  </span>
                </div>
              </div>

              {/* Spec / Attachments row */}
              {(m.files && m.files.length > 0) || m.files ? (
                <div className="text-[10.5px] bg-gray-50/50 border border-gray-100 p-2.5 rounded-xl flex flex-wrap items-center gap-2 text-gray-600 font-medium">
                  <span className="text-gray-450 font-semibold">
                    📎 Technical Specifications:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {m.files?.map((file, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-brand-primary font-mono select-all font-semibold bg-white border border-gray-150 px-2 py-0.5 rounded text-[9.5px]"
                      >
                        {file.fileName}
                      </span>
                    )) || (
                      <span className="text-brand-primary font-mono select-all font-semibold bg-white border border-gray-150 px-2 py-0.5 rounded text-[9.5px]">
                        {/* {m.deliveryFile} */}
                      </span>
                    )}
                  </div>
                </div>
              ) : null}

              {/* Details on Submissions or Disputes */}
              {/* {m.isSubmitted && m.deliveryNotes && (
                          <div className="mt-1 p-3 bg-amber-50/20 border border-amber-100 rounded-xl space-y-2 text-left font-sans">
                            <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wider block">
                              Freelancer Submission deliverables
                            </span>
                            <p className="text-xs text-gray-700 italic">
                              "{m.deliveryNotes}"
                            </p>
                            {m.deliveryFile && (
                              <div className="text-[10px] font-bold text-brand-primary bg-brand-primary/5 px-2 py-1 rounded w-fit border border-brand-primary/10 select-all font-mono">
                                💾 {m.deliveryFile}
                              </div>
                            )}
                            <div className="p-2.5 bg-amber-50 text-amber-950 rounded-lg flex items-center gap-2 font-medium text-[10px] border border-amber-100/50">
                              <span className="text-xs">⏱️</span>
                              <span>
                                <strong>
                                  48-Hour Escrow Watchdog Enabled:
                                </strong>{" "}
                                If no dispute is filed or approved, this phase
                                funds will automatically transfer into the
                                freelancer's wallet balance.
                              </span>
                            </div>
                          </div>
                        )} */}

              {m.status === "DISPUTE" && "" && (
                <div className="mt-1 p-3 bg-red-50/20 border border-red-100 rounded-xl space-y-1.5 text-left font-sans">
                  <span className="text-[9px] font-bold text-red-650 uppercase tracking-wider block">
                    Active Milestone dispute details
                  </span>
                  <p className="text-xs text-red-900 bg-red-50/40 p-2 rounded-lg border border-red-100/40 leading-relaxed font-semibold">
                    Reason specified:
                    {/* "{m.disputeReason}" */}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Independent assessment has locked these escrow funds from
                    release. Chat support will reach out over WhatsApp within
                    12-24h.
                  </p>
                </div>
              )}

              {i === 0 &&
                (project.pay_escrow_fee === "FREELANCER" ||
                  project.pay_escrow_fee === "BOTH") &&
                m.status !== "COMPLETED" && (
                  <div className="p-3 bg-brand-primary/[0.015] border border-dashed border-brand-primary/20 rounded-xl space-y-0.5 mt-0.5 text-left">
                    <span className="text-[9px] text-brand-primary font-bold uppercase tracking-wider font-mono">
                      ⚠️ Escrow Fee Scheduled
                    </span>
                    <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
                      Platform fee of{" "}
                      {project.pay_escrow_fee === "BOTH" ? "1.5%" : "3%"} (
                      {formatNumberToCurrency(
                        project.amount *
                          (project.pay_escrow_fee === "BOTH" ? 0.015 : 0.03),
                        project.currency,
                      )}
                      {/* {formatMoney(
                        project.amount *
                          (project.pay_escrow_fee === "BOTH" ? 0.015 : 0.03),
                        project.currency,
                      )} */}
                      ) will be processed on release of this first phase.
                      Subsequent phases have zero deductions.
                    </p>
                  </div>
                )}

              {/* INTERACTIVE COMPONENT ACTIONS PER ROLE */}
              {isProjectFunded && m.status !== "COMPLETED" && (
                <div className="mt-2 pt-3.5 border-t border-gray-100">
                  {role === "FREELANCER" ? (
                    <></>
                  ) : (
                    // Freelancer actions
                    // <div className="space-y-3.5">
                    //   {!m.isSubmitted &&
                    //     !m.isDisputed &&
                    //     (submittingMilestoneId === m.id ? (
                    //       <form
                    //         onSubmit={(e) => {
                    //           e.preventDefault();
                    //           if (!milestoneNotes) {
                    //             showAlert(
                    //               "Please explain what you are delivering for this phase.",
                    //               "error",
                    //             );
                    //             return;
                    //           }
                    //           submitMilestoneDelivery(
                    //             project.id,
                    //             m.id,
                    //             milestoneNotes,
                    //             milestoneFilesList.join(", ") ||
                    //               undefined,
                    //             milestoneFilesList,
                    //           );
                    //           setSubmittingMilestoneId(null);
                    //           setMilestoneNotes("");
                    //           setMilestoneFile("");
                    //           setMilestoneFilesList([]);
                    //         }}
                    //         className="bg-white border border-brand-primary/10 p-4 rounded-xl space-y-4.5 shadow-xs animate-fade-in"
                    //       >
                    //         <div className="flex items-center justify-between border-b border-gray-55 pb-2">
                    //           <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">
                    //             Submitting Deliverables for Phase{" "}
                    //             {i + 1}
                    //           </span>
                    //           <span className="text-[9px] text-gray-400 font-medium">
                    //             Step 2 of 2
                    //           </span>
                    //         </div>

                    //         <div className="space-y-1.5">
                    //           <label className="block text-[10px] font-bold text-gray-500 uppercase">
                    //             Submission Notes or Description
                    //           </label>
                    //           <textarea
                    //             value={milestoneNotes}
                    //             onChange={(e) =>
                    //               setMilestoneNotes(e.target.value)
                    //             }
                    //             placeholder="Define what you built, add live staging credentials, Github pull requests, or design document pointers..."
                    //             className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-primary font-medium"
                    //             rows={2.5}
                    //             required
                    //           />
                    //         </div>

                    //         {/* Drag & Drop File Upload Area */}
                    //         <InteractiveMultiUploader
                    //           id={`milestone-file-uploader-${m.id}`}
                    //           files={milestoneFilesList}
                    //           onChange={setMilestoneFilesList}
                    //           label="Upload Work Deliverables Attachment"
                    //           placeholder="Drag & drop work deliverables, zip archives, or assets here"
                    //         />

                    //         <div className="flex gap-2.5 pt-2">
                    //           <button
                    //             type="submit"
                    //             className="flex-1 py-2 bg-brand-primary hover:bg-brand-primary/95 text-white text-[11px] font-bold rounded-lg cursor-pointer text-center"
                    //           >
                    //             Submit Deliverables
                    //           </button>
                    //           <button
                    //             type="button"
                    //             onClick={() => {
                    //               setSubmittingMilestoneId(null);
                    //               setMilestoneNotes("");
                    //               setMilestoneFile("");
                    //             }}
                    //             className="px-3.5 py-2 bg-gray-50 border border-gray-150 text-[11px] text-gray-500 font-semibold rounded-lg"
                    //           >
                    //             Cancel
                    //           </button>
                    //         </div>
                    //       </form>
                    //     ) : (
                    //       <button
                    //         onClick={() =>
                    //           setSubmittingMilestoneId(m.id)
                    //         }
                    //         className="w-full py-2 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-xl transition duration-150 shadow-xs cursor-pointer text-center block"
                    //       >
                    //         📤 Submit Deliverables (Phase {i + 1})
                    //       </button>
                    //     ))}

                    //   {m.isSubmitted && (
                    //     <div className="space-y-3.5">
                    //       {/* Elegant watchdog visual stopwatch for the Freelancer */}
                    //       <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-left space-y-2.5 animate-fade-in">
                    //         <div className="flex items-center justify-between">
                    //           <div className="flex items-center gap-2">
                    //             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                    //               Automatic Watchdog Timer
                    //             </span>
                    //             <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100 uppercase tracking-wider animate-pulse">
                    //               Running
                    //             </span>
                    //           </div>
                    //           <span className="text-[10px] text-slate-500 font-mono font-semibold">
                    //             T+48 Hrs Max
                    //           </span>
                    //         </div>

                    //         <div className="flex items-start gap-3">
                    //           <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 text-base">
                    //             ⏱️
                    //           </div>
                    //           <div className="space-y-0.5">
                    //             <div className="text-base font-bold text-slate-800 font-mono tracking-tight leading-none">
                    //               <MilestoneCountdown
                    //                 submittedAt={m.submittedAt}
                    //               />
                    //             </div>
                    //             <p className="text-[10px] text-gray-450 leading-relaxed font-medium">
                    //               Countdown is active! If the client
                    //               does not dispute or release this
                    //               phase within 48 hours, these escrow
                    //               funds will automatically transfer
                    //               into your available balance wallet.
                    //             </p>
                    //           </div>
                    //         </div>
                    //       </div>

                    //       <div className="p-3 bg-brand-primary/[0.02] border border-brand-primary/10 rounded-xl flex items-center justify-between gap-3 text-xs leading-none">
                    //         <div className="flex items-center gap-2">
                    //           <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
                    //           <span className="text-[10px] font-bold text-brand-primary uppercase font-sans tracking-wide">
                    //             Waiting for Client Review & Release
                    //           </span>
                    //         </div>
                    //         <span className="text-[10px] text-gray-405 font-medium">
                    //           WhatsApp moderator standby
                    //         </span>
                    //       </div>
                    //     </div>
                    //   )}

                    //   {m.isDisputed && (
                    //     <div className="text-[10.5px] p-2.5 bg-gray-150/40 border border-gray-200 rounded-xl leading-relaxed font-semibold block">
                    //       🛡️ Escrow funds are locked since the client
                    //       raised a dispute. Mimotar mediator support
                    //       team will review is ongoing.
                    //     </div>
                    //   )}
                    // </div>
                    <></>
                    // Client actions
                    // <div className="space-y-3.5">
                    //   {!m.isSubmitted && !m.isDisputed && (
                    //     <div className="text-[10.5px] text-gray-455 italic font-semibold">
                    //       ⌛ Freelancer is currently working on this
                    //       milestone.
                    //     </div>
                    //   )}

                    //   {m.isSubmitted && (
                    //     <div className="space-y-3.5">
                    //       {/* Watchdog Countdown Timer visible to Client */}
                    //       <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-left space-y-2.5 animate-fade-in">
                    //         <div className="flex items-center justify-between">
                    //           <div className="flex items-center gap-2">
                    //             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                    //               Automatic Watchdog Timer
                    //             </span>
                    //             <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100 uppercase tracking-wider animate-pulse">
                    //               Running
                    //             </span>
                    //           </div>
                    //           <span className="text-[10px] text-slate-500 font-mono font-semibold">
                    //             T+48 Hrs Max
                    //           </span>
                    //         </div>

                    //         <div className="flex items-start gap-3">
                    //           <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 text-base">
                    //             ⏱️
                    //           </div>
                    //           <div className="space-y-0.5">
                    //             <div className="text-base font-bold text-slate-800 font-mono tracking-tight leading-none">
                    //               <MilestoneCountdown
                    //                 submittedAt={m.submittedAt}
                    //               />
                    //             </div>
                    //             <p className="text-[10px] text-gray-450 leading-relaxed font-semibold">
                    //               Please review and approve or raise a
                    //               dispute on this milestone phase
                    //               before the countdown expires.
                    //               Unresolved phases automatically
                    //               release funds.
                    //             </p>
                    //           </div>
                    //         </div>
                    //       </div>

                    //       {disputingMilestoneId === m.id ? (
                    //         <form
                    //           onSubmit={(e) => {
                    //             e.preventDefault();
                    //             if (!milestoneDisputeReason) {
                    //               showAlert(
                    //                 "Please state a valid reason for this dispute.",
                    //                 "error",
                    //               );
                    //               return;
                    //             }
                    //             if (
                    //               milestoneDisputeEvidenceFiles.length ===
                    //               0
                    //             ) {
                    //               showAlert(
                    //                 "You must upload at least one evidence file (screenshot, log, or document) to initiate a milestone dispute.",
                    //                 "error",
                    //               );
                    //               return;
                    //             }
                    //             if (!currentUser.phoneVerified) {
                    //               setPendingDisputeAction({
                    //                 type: "milestone",
                    //                 milestoneId: m.id,
                    //                 reason: milestoneDisputeReason,
                    //                 evidenceFiles:
                    //                   milestoneDisputeEvidenceFiles,
                    //               });
                    //               setDisputeOtpPhone(
                    //                 currentUser.phone || "",
                    //               );
                    //               setDisputeOtpSent(false);
                    //               setDisputeOtpCode("");
                    //               setDisputeOtpError("");
                    //               setDisputingMilestoneId(null);
                    //               setMilestoneDisputeReason("");
                    //               return;
                    //             }
                    //             raiseMilestoneDispute(
                    //               project.id,
                    //               m.id,
                    //               milestoneDisputeReason,
                    //               milestoneDisputeEvidenceFiles.join(
                    //                 ", ",
                    //               ),
                    //             );
                    //             setMilestoneDisputeEvidenceFiles([]);
                    //             setDisputingMilestoneId(null);
                    //             setMilestoneDisputeReason("");
                    //           }}
                    //           className="bg-white border border-red-200 p-3.5 rounded-xl space-y-3 shadow-xs animate-fade-in"
                    //         >
                    //           <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider">
                    //             Raise Dispute on Phase {i + 1}
                    //           </span>
                    //           <div className="space-y-2">
                    //             <label className="block text-[10px] font-bold text-gray-500 uppercase">
                    //               Reason for dispute
                    //             </label>
                    //             <textarea
                    //               value={milestoneDisputeReason}
                    //               onChange={(e) =>
                    //                 setMilestoneDisputeReason(
                    //                   e.target.value,
                    //                 )
                    //               }
                    //               placeholder="Explain key missing parts, bugs, or differences against milestone guidelines..."
                    //               className="w-full text-xs p-2 bg-gray-50 border border-red-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 animate-pulse"
                    //               rows={2.5}
                    //               required
                    //             />
                    //           </div>
                    //           <div className="space-y-2">
                    //             <InteractiveMultiUploader
                    //               id={`milestone-dispute-uploader-${m.id}`}
                    //               files={
                    //                 milestoneDisputeEvidenceFiles
                    //               }
                    //               onChange={
                    //                 setMilestoneDisputeEvidenceFiles
                    //               }
                    //               label="Upload Milestone Dispute Evidence"
                    //               placeholder="Drag & drop screenshots, logs, or chat proofs here"
                    //               theme="danger"
                    //             />
                    //           </div>

                    //           <div className="flex gap-2 pt-1.5">
                    //             <button
                    //               type="submit"
                    //               className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded-lg cursor-pointer text-center shadow-xs"
                    //             >
                    //               Freeze Escrow & Dispute
                    //             </button>
                    //             <button
                    //               type="button"
                    //               onClick={() => {
                    //                 setDisputingMilestoneId(null);
                    //                 setMilestoneDisputeReason("");
                    //                 setMilestoneDisputeEvidenceFiles(
                    //                   [],
                    //                 );
                    //               }}
                    //               className="px-3 py-2 bg-gray-50 border border-gray-150 text-[11px] text-gray-500 font-semibold rounded-lg"
                    //             >
                    //               Cancel
                    //             </button>
                    //           </div>
                    //         </form>
                    //       ) : (
                    //         <div className="space-y-3">
                    //           <div className="flex flex-col sm:flex-row gap-2.5">
                    //             <button
                    //               onClick={() => {
                    //                 releaseMilestoneFunds(
                    //                   project.id,
                    //                   m.id,
                    //                 );
                    //               }}
                    //               className="flex-1 py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-xl transition duration-150 shadow-xs cursor-pointer text-center block"
                    //             >
                    //               ✅ Approve & Release Funds
                    //             </button>
                    //             <button
                    //               onClick={() =>
                    //                 setDisputingMilestoneId(m.id)
                    //               }
                    //               className="py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 text-xs font-semibold rounded-xl transition cursor-pointer text-center block animate-fade-in"
                    //             >
                    //               🚨 Dispute
                    //             </button>
                    //           </div>

                    //           {/* Client simulation bypass button triggers 48h automatic release */}
                    //           <div className="border-t border-gray-100 pt-3 flex items-center justify-between gap-2">
                    //             <span className="text-[10px] text-gray-400 font-semibold italic">
                    //               Demo Simulator
                    //             </span>
                    //             <button
                    //               onClick={() =>
                    //                 simulateMilestone48hPassage(
                    //                   project.id,
                    //                   m.id,
                    //                 )
                    //               }
                    //               className="py-1.5 px-3 bg-brand-primary/10 hover:bg-brand-primary/15 text-brand-primary text-[10px] font-bold rounded-lg cursor-pointer transition shrink-0 flex items-center gap-1.5"
                    //               title="Simulated 48 hours passage to test system watchdog release trigger"
                    //             >
                    //               ⏩ Fast-Forward 48H (Auto-Release
                    //               Simulation)
                    //             </button>
                    //           </div>
                    //         </div>
                    //       )}
                    //     </div>
                    //   )}

                    //   {m.isDisputed && (
                    //     <div className="bg-red-50/20 p-2.5 rounded-xl border border-red-100 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
                    //       <span className="text-[10px] text-red-700 font-bold">
                    //         Dispute Resolution Platform
                    //       </span>
                    //       <button
                    //         onClick={() => {
                    //           resolveMilestoneDispute(
                    //             project.id,
                    //             m.id,
                    //           );
                    //         }}
                    //         className="py-1.5 px-3 bg-red-650 hover:bg-red-700 text-white text-[10.5px] font-bold rounded-lg transition shadow-xs cursor-pointer shrink-0 block"
                    //       >
                    //         🤝 Resolve & Release Milestone
                    //       </button>
                    //     </div>
                    //   )}
                    // </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
