// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Project, Milestone, ActivityLog, Wallet, Notification, User, UserRole } from './types';
// import { PRESET_PROJECTS, INITIAL_WALLET, INITIAL_NOTIFICATIONS } from './initialData';

// interface AppStateContextType {
//   projects: Project[];
//   wallet: Wallet;
//   notifications: Notification[];
//   currentUser: User;
//   demoRole: UserRole; // Current active simulator role ('client' | 'freelancer' | 'admin')
//   activePage: string; // 'home' | 'dashboard' | 'start-project' | 'project-workspace' | 'wallet' | 'about' | 'how-it-works' | 'contact' | 'tos' | 'privacy'
//   selectedProjectId: string | null;
//   alertMessage: { text: string; type: 'success' | 'info' | 'warning' | 'error' } | null;
//   withdrawCurrencyPreference: 'NGN' | 'USD';
//   setWithdrawCurrencyPreference: (currency: 'NGN' | 'USD') => void;

//   // Simulated Actions
//   setDemoRole: (role: UserRole) => void;
//   setActivePage: (page: string) => void;
//   setSelectedProjectId: (id: string | null) => void;
//   showAlert: (text: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
//   clearAlert: () => void;

//   // Project flows
//   addNewProject: (project: Omit<Project, 'id' | 'createdAt' | 'isDelivered' | 'isReleased'>) => string;
//   acceptProjectAgreement: (projectId: string) => void;
//   rejectProjectAgreement: (projectId: string) => void;
//   fundProjectEscrow: (projectId: string) => void;
//   submitProjectDelivery: (projectId: string, notes: string, fileName?: string, fileLink?: string) => void;
//   releaseEscrowFunds: (projectId: string) => void;
//   raiseProjectDispute: (projectId: string, reason: string, evidenceFileName?: string) => void;
//   resolveProjectDispute: (projectId: string) => void;
//   extendProjectDeadline: (projectId: string, newTotalDeadline: string, updatedMilestones: { id: string; deadline: string }[]) => void;

//   // Per-Milestone operations
//   submitMilestoneDelivery: (projectId: string, milestoneId: string, notes: string, fileName?: string, fileNames?: string[]) => void;
//   releaseMilestoneFunds: (projectId: string, milestoneId: string) => void;
//   raiseMilestoneDispute: (projectId: string, milestoneId: string, reason: string, evidenceFileName?: string) => void;
//   resolveMilestoneDispute: (projectId: string, milestoneId: string) => void;
//   simulateMilestone48hPassage: (projectId: string, milestoneId: string) => void;

//   // Wallet Payout simulation
//   withdrawFunds: (amount: number, bankName: string, accountNumber: string, code: string, currency?: 'NGN' | 'USD') => Promise<boolean>;

//   // Auth Flows
//   loginUser: (email: string, role: UserRole) => void;
//   logoutUser: () => void;
//   verifyUserOtp: () => boolean;
//   updatePhoneNumber: (phone: string, verified?: boolean) => void;

//   // Notification controls
//   markNotificationAsRead: (id: string) => void;
//   markAllNotificationsAsRead: () => void;
//   clearAllNotifications: () => void;

//   // Reset demo
//   resetDemoData: () => void;
// }

// const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [projects, setProjects] = useState<Project[]>(() => {
//     const saved = localStorage.getItem('mimotar_projects');
//     return saved ? JSON.parse(saved) : PRESET_PROJECTS;
//   });

//   const [wallet, setWallet] = useState<Wallet>(() => {
//     const saved = localStorage.getItem('mimotar_wallet');
//     return saved ? JSON.parse(saved) : INITIAL_WALLET;
//   });

//   const [notifications, setNotifications] = useState<Notification[]>(() => {
//     const saved = localStorage.getItem('mimotar_notifications');
//     return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
//   });

//   const [currentUser, setCurrentUser] = useState<User>(() => {
//     const saved = localStorage.getItem('mimotar_user');
//     const defaults = {
//       name: 'Oluwaseun Adebayo',
//       email: 'kcblack22@gmail.com',
//       role: 'client' as UserRole,
//       isLoggedIn: true,
//       otpVerified: true,
//       emailVerified: true,
//       phoneVerified: false,
//     };
//     if (saved) {
//       try {
//         const parsed = JSON.parse(saved);
//         return {
//           ...defaults,
//           ...parsed,
//           emailVerified: parsed.emailVerified ?? true,
//           phoneVerified: parsed.phoneVerified ?? (parsed.phone ? true : false)
//         };
//       } catch (err) {
//         return defaults;
//       }
//     }
//     return defaults;
//   });

//   const [demoRole, setDemoRoleState] = useState<UserRole>('client');
//   const [activePage, setActivePage] = useState<string>(() => {
//     try {
//       const saved = localStorage.getItem('mimotar_user');
//       if (saved) {
//         const usr = JSON.parse(saved);
//         if (usr.isLoggedIn && usr.otpVerified) {
//           return 'dashboard';
//         }
//       }
//     } catch (err) {
//       // fallback
//     }
//     return 'home';
//   });
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
//   const [alertMessage, setAlertMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' | 'error' } | null>(null);
//   const [withdrawCurrencyPreference, setWithdrawCurrencyPreference] = useState<'NGN' | 'USD'>('NGN');

//   // Sync state to local storage when it shifts
//   useEffect(() => {
//     localStorage.setItem('mimotar_projects', JSON.stringify(projects));
//   }, [projects]);

//   useEffect(() => {
//     localStorage.setItem('mimotar_wallet', JSON.stringify(wallet));
//   }, [wallet]);

//   useEffect(() => {
//     localStorage.setItem('mimotar_notifications', JSON.stringify(notifications));
//   }, [notifications]);

//   useEffect(() => {
//     localStorage.setItem('mimotar_user', JSON.stringify(currentUser));
//   }, [currentUser]);

//   // Keep demoRole synchronized with user role when user login state shifts
//   const setDemoRole = (role: UserRole) => {
//     setDemoRoleState(role);
//     setCurrentUser(prev => ({ ...prev, role }));
//     showAlert(`Switched active perspective to: ${role.toUpperCase()}`, 'info');
//   };

//   const showAlert = (text: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
//     setAlertMessage({ text, type });
//     setTimeout(() => {
//       setAlertMessage(null);
//     }, 4500);
//   };

//   const clearAlert = () => setAlertMessage(null);

//   const addNotification = (
//     title: string,
//     message: string,
//     type: 'info' | 'success' | 'warning' | 'error' = 'info',
//     category: 'action' | 'update' | 'informational' = 'informational',
//     ctaText?: string,
//     actionPage?: string,
//     projectId?: string
//   ) => {
//     const newNotif: Notification = {
//       id: `n-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
//       title,
//       message,
//       timestamp: 'Just now',
//       isRead: false,
//       type,
//       category,
//       ctaText,
//       actionPage,
//       projectId
//     };
//     setNotifications(prev => [newNotif, ...prev]);
//   };

//   // ACTIONS
//   const addNewProject = (newProj: Omit<Project, 'id' | 'createdAt' | 'isDelivered' | 'isReleased'>) => {
//     const projId = `proj-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
//     const nowISO = new Date().toISOString();
//     const cleanProj: Project = {
//       ...newProj,
//       id: projId,
//       createdAt: nowISO,
//       isDelivered: false,
//       isReleased: false,
//       activityLogs: [
//         {
//           id: `log-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
//           title: 'Project agreement created',
//           description: `${newProj.creatorRole === 'client' ? 'Client Oluwaseun' : 'Freelancer Amara'} initiated details for "${newProj.title}" and issued invitation.`,
//           timestamp: nowISO,
//           actor: newProj.creatorRole,
//           type: 'project_created'
//         }
//       ]
//     };

//     setProjects(prev => [cleanProj, ...prev]);
//     addNotification(
//       'Agreement Invite Generated',
//       `Invite link shared to ${cleanProj.otherPartyEmail}. Waiting for terms review.`,
//       'info',
//       'informational',
//       'View Workspace',
//       'project-workspace',
//       projId
//     );
//     showAlert('Agreement draft created & pending invite link!', 'success');
//     return projId;
//   };

//   const acceptProjectAgreement = (projectId: string) => {
//     setProjects(prev => prev.map(p => {
//       if (p.id === projectId) {
//         const nowISO = new Date().toISOString();
//         const acceptLog = {
//           id: `log-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
//           title: 'Agreement accepted',
//           description: `Terms and milestone schedule accepted by counterparty. Escrow is now ready for funding.`,
//           timestamp: nowISO,
//           actor: p.otherPartyRole,
//           type: 'agreement_accepted' as const
//         };
//         addNotification(
//           'Escrow Action Required: Fund Escrow',
//           `"${p.title}" terms approved. Client needs to fund project to start escrow secure coverage.`,
//           'info',
//           'action',
//           'Fund Escrow',
//           'project-workspace',
//           p.id
//         );
//         return {
//           ...p,
//           agreementStatus: 'accepted',
//           escrowStatus: 'unfunded',
//           activityLogs: [...(p.activityLogs || []), acceptLog]
//         };
//       }
//       return p;
//     }));
//     showAlert('Agreement accepted! Funds are now ready to be secured.', 'success');
//   };

//   const rejectProjectAgreement = (projectId: string) => {
//     setProjects(prev => prev.map(p => {
//       if (p.id === projectId) {
//         const nowISO = new Date().toISOString();
//         const rejectLog = {
//           id: `log-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
//           title: 'Agreement rejected',
//           description: `Terms rejected by the invited counterparty. Contract returned to draft format.`,
//           timestamp: nowISO,
//           actor: p.otherPartyRole,
//           type: 'agreement_rejected' as const
//         };
//         addNotification(
//           'Agreement Rejected',
//           `The counterparty declined the specifications for "${p.title}". Please edit details.`,
//           'warning',
//           'update',
//           'Edit Agreement',
//           'project-workspace',
//           p.id
//         );
//         return {
//           ...p,
//           agreementStatus: 'rejected',
//           activityLogs: [...(p.activityLogs || []), rejectLog]
//         };
//       }
//       return p;
//     }));
//     showAlert('Agreement declined request sent back to the creator.', 'error');
//   };

//   const fundProjectEscrow = (projectId: string) => {
//     setProjects(prev => prev.map(p => {
//       if (p.id === projectId) {
//         const txId = `TX-${Math.floor(100000 + Math.random() * 90000) || 128492}-F1`;
//         const symbol = p.currency === 'NGN' ? '₦' : '$';

//         // Update pending values if roles match
//         const amount = p.amount;
//         if (p.currency === 'NGN') {
//           setWallet(w => ({ ...w, pendingNgn: w.pendingNgn + amount }));
//         } else {
//           setWallet(w => ({ ...w, pendingUsd: w.pendingUsd + amount }));
//         }

//         const nowISO = new Date().toISOString();
//         const fundLog = {
//           id: `log-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
//           title: 'Escrow funded',
//           description: `${symbol}${p.amount.toLocaleString()} secured successfully via secure payment processor. Transaction hash: ${txId}.`,
//           timestamp: nowISO,
//           actor: 'client' as const,
//           type: 'escrow_funded' as const
//         };

//         addNotification(
//           'Escrow Covered — Start Work',
//           `Client funded ${symbol}${p.amount.toLocaleString()} — you can start work on "${p.title}" safely now.`,
//           'success',
//           'action',
//           'Submit Deliverables',
//           'project-workspace',
//           p.id
//         );

//         return {
//           ...p,
//           escrowStatus: 'funded',
//           transactionId: txId,
//           fundedAt: nowISO,
//           activityLogs: [...(p.activityLogs || []), fundLog]
//         };
//       }
//       return p;
//     }));
//   };

//   const submitProjectDelivery = (projectId: string, notes: string, fileName?: string, fileLink?: string) => {
//     setProjects(prev => prev.map(p => {
//       if (p.id === projectId) {
//         const nowISO = new Date().toISOString();
//         const deliveryLog = {
//           id: `log-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
//           title: 'Work deliverables submitted',
//           description: `Freelancer submitted files inside escrow box. Filename: "${fileName || 'deliverables_archive_v1.zip'}". Notes: "${notes}"`,
//           timestamp: nowISO,
//           actor: 'freelancer' as const,
//           type: 'work_submitted' as const
//         };

//         addNotification(
//           'Deliverables Submitted',
//           `Submit your work to receive payment. Awaiting client review for project "${p.title}".`,
//           'info',
//           'action',
//           'Review Work',
//           'project-workspace',
//           p.id
//         );

//         return {
//           ...p,
//           isDelivered: true,
//           deliveredAt: nowISO,
//           deliveryNotes: notes,
//           deliveryFileName: fileName || 'deliverables_archive_v1.zip',
//           deliveryFileLink: fileLink || 'https://assets.mimotar.com/p/892',
//           activityLogs: [...(p.activityLogs || []), deliveryLog]
//         };
//       }
//       return p;
//     }));
//     showAlert('Delivered! Countdown timer has successfully started.', 'success');
//   };

//   const releaseEscrowFunds = (projectId: string) => {
//     setProjects(prev => prev.map(p => {
//       if (p.id === projectId) {
//         const amount = p.amount;

//         // Move funds from pending to available in simulated wallet
//         setWallet(w => {
//           if (p.currency === 'NGN') {
//             const netPending = Math.max(0, w.pendingNgn - amount);
//             const fee = amount * 0.03; // flat 3% Mimotar platform fee
//             const netAvailable = amount - (p.feePayer === 'freelancer' ? fee : p.feePayer === 'split' ? fee * 0.5 : 0);
//             return {
//               ...w,
//               pendingNgn: netPending,
//               availableNgn: w.availableNgn + netAvailable
//             };
//           } else {
//             const netPending = Math.max(0, w.pendingUsd - amount);
//             const fee = amount * 0.03;
//             const netAvailable = amount - (p.feePayer === 'freelancer' ? fee : p.feePayer === 'split' ? fee * 0.5 : 0);
//             return {
//               ...w,
//               pendingUsd: netPending,
//               availableUsd: w.availableUsd + netAvailable
//             };
//           }
//         });

//         const symbol = p.currency === 'NGN' ? '₦' : '$';
//         const feePercent = p.feePayer === 'freelancer' ? 3 : p.feePayer === 'split' ? 1.5 : 0;
//         const feeAmt = p.amount * (feePercent / 100);
//         const netAmt = p.amount - feeAmt;

//         addNotification(
//           'Payment Released & Fee Deducted',
//           `Your payment of ${symbol}${p.amount.toLocaleString()} on "${p.title}" has been released. An escrow platform fee of ${feePercent}% (${symbol}${feeAmt.toLocaleString()}) was deducted automatically. Net of ${symbol}${netAmt.toLocaleString()} is now added to your available balance.`,
//           'success',
//           'update',
//           'Check Wallet',
//           'wallet',
//           p.id
//         );

//         const nowISO = new Date().toISOString();
//         const releaseLog = {
//           id: `log-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
//           title: 'Work approved & escrow released',
//           description: `Deliverables finalized. Platform fee of ${feePercent}% (${symbol}${feeAmt.toLocaleString()}) deducted. Net funds of ${symbol}${netAmt.toLocaleString()} approved and paid out instantly.`,
//           timestamp: nowISO,
//           actor: 'client' as const,
//           type: 'payment_released' as const
//         };

//         return {
//           ...p,
//           escrowStatus: 'completed',
//           isReleased: true,
//           releasedAt: nowISO,
//           activityLogs: [...(p.activityLogs || []), releaseLog]
//         };
//       }
//       return p;
//     }));
//   };

//   const raiseProjectDispute = (projectId: string, reason: string, evidenceFileName?: string) => {
//     setProjects(prev => prev.map(p => {
//       if (p.id === projectId) {
//         const nowISO = new Date().toISOString();
//         const actorType: NonNullable<Project['disputedBy']> = demoRole === 'client' ? 'client' : 'freelancer';
//         const disputeLog: ActivityLog = {
//           id: `log-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
//           title: 'Conflict raised / Dispute opened',
//           description: `Dispute requested by project ${actorType}. Reason provided: "${reason}". Escrow ledger set to "disputed" state.`,
//           timestamp: nowISO,
//           actor: actorType,
//           type: 'dispute_raised' as const
//         };

//         addNotification(
//           'Dispute Filed — Action Required',
//           `Respond to dispute on "${p.title}". Support mediator group notified for custom WhatsApp resolution.`,
//           'warning',
//           'action',
//           'View Dispute',
//           'project-workspace',
//           p.id
//         );

//         return {
//           ...p,
//           escrowStatus: 'disputed',
//           disputeReason: reason,
//           disputeEvidenceFile: evidenceFileName || 'dispute_proof_screenshot.png',
//           disputedAt: nowISO,
//           disputedBy: actorType,
//           disputeStatus: 'pending',
//           activityLogs: [...(p.activityLogs || []), disputeLog]
//         };
//       }
//       return p;
//     }));
//     showAlert('Incident reported! A Mimotar mediator is reviewing your files.', 'warning');
//   };

//   const resolveProjectDispute = (projectId: string) => {
//     setProjects(prev => prev.map(p => {
//       if (p.id === projectId && p.escrowStatus === 'disputed') {
//         const amount = p.amount;

//         // Complete the escrow & credit available balance
//         setWallet(w => {
//           if (p.currency === 'NGN') {
//             const netPending = Math.max(0, w.pendingNgn - amount);
//             const fee = amount * 0.03;
//             const netAvailable = amount - (p.feePayer === 'freelancer' ? fee : p.feePayer === 'split' ? fee * 0.5 : 0);
//             return {
//               ...w,
//               pendingNgn: netPending,
//               availableNgn: w.availableNgn + netAvailable
//             };
//           } else {
//             const netPending = Math.max(0, w.pendingUsd - amount);
//             const fee = amount * 0.03;
//             const netAvailable = amount - (p.feePayer === 'freelancer' ? fee : p.feePayer === 'split' ? fee * 0.5 : 0);
//             return {
//               ...w,
//               pendingUsd: netPending,
//               availableUsd: w.availableUsd + netAvailable
//             };
//           }
//         });

//         const symbol = p.currency === 'NGN' ? '₦' : '$';
//         const feePercent = p.feePayer === 'freelancer' ? 3 : p.feePayer === 'split' ? 1.5 : 0;
//         const feeAmt = p.amount * (feePercent / 100);
//         const netAmt = p.amount - feeAmt;

//         addNotification(
//           'Dispute Resolved & Payment Released',
//           `Mediator approved and triggered escrow release in favor of Freelancer for "${p.title}". Net of ${symbol}${netAmt.toLocaleString()} paid out successfully.`,
//           'success',
//           'update',
//           'View Wallet',
//           'wallet',
//           p.id
//         );

//         const nowISO = new Date().toISOString();
//         const resolveLog = {
//           id: `log-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
//           title: 'Dispute resolved by Mimotar expert',
//           description: `Mediator concluded reviews. Escrow released in favor of freelancer. Net payout of ${symbol}${netAmt.toLocaleString()} transferred to available ledger balances.`,
//           timestamp: nowISO,
//           actor: 'system' as const,
//           type: 'dispute_resolved' as const
//         };

//         return {
//           ...p,
//           escrowStatus: 'completed',
//           isReleased: true,
//           releasedAt: nowISO,
//           disputeStatus: 'resolved',
//           activityLogs: [...(p.activityLogs || []), resolveLog]
//         };
//       }
//       return p;
//     }));
//     showAlert('Dispute resolved. Payment successfully released to Freelancer!', 'success');
//   };

//   const extendProjectDeadline = (projectId: string, newTotalDeadline: string, updatedMilestones: { id: string; deadline: string }[]) => {
//     setProjects(prev => prev.map(p => {
//       if (p.id === projectId) {
//         const mappedMilestones = p.milestones.map(m => {
//           const match = updatedMilestones.find(u => u.id === m.id);
//           if (match) {
//             return { ...m, deadline: match.deadline };
//           }
//           return m;
//         });

//         addNotification(
//           'Project Deadline Extended',
//           `The client has extended the deadline of your project "${p.title}" to ${newTotalDeadline}.`,
//           'info',
//           'informational',
//           'View Workspace',
//           'project-workspace',
//           p.id
//         );

//         const nowISO = new Date().toISOString();
//         const extendLog = {
//           id: `log-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
//           title: 'Project deadline adjusted',
//           description: `Contract total deadline extended to "${newTotalDeadline}". Milestones timelines adjusted to synchronize with new framework guidelines.`,
//           timestamp: nowISO,
//           actor: 'client' as const,
//           type: 'deadline_extended' as const
//         };

//         return {
//           ...p,
//           deadline: newTotalDeadline,
//           milestones: mappedMilestones,
//           activityLogs: [...(p.activityLogs || []), extendLog]
//         };
//       }
//       return p;
//     }));
//     showAlert('Success: Project and milestones deadlines updated!', 'success');
//   };

//   const submitMilestoneDelivery = (projectId: string, milestoneId: string, notes: string, fileName?: string, fileNames?: string[]) => {
//     setProjects(prev => prev.map(p => {
//       if (p.id === projectId) {
//         const nowISO = new Date().toISOString();
//         const updatedMilestones = p.milestones.map(m => {
//           if (m.id === milestoneId) {
//             return {
//               ...m,
//               isSubmitted: true,
//               submittedAt: nowISO,
//               deliveryNotes: notes,
//               deliveryFile: fileName || (fileNames && fileNames.length > 0 ? fileNames[0] : 'milestone_deliverables.zip'),
//               deliveryFiles: fileNames || (fileName ? [fileName] : []),
//               completedAt: nowISO
//             };
//           }
//           return m;
//         });

//         const targetMilestone = p.milestones.find(m => m.id === milestoneId);
//         const logId = `log-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
//         const deliveryLog = {
//           id: logId,
//           title: `Milestone Delivered - ${targetMilestone?.title}`,
//           description: `Freelancer submitted deliverables for milestone "${targetMilestone?.title}". Notes: "${notes}". Countdown clock initiated.`,
//           timestamp: nowISO,
//           actor: 'freelancer' as const,
//           type: 'work_submitted' as const
//         };

//         addNotification(
//           'Milestone Deliverables Submitted',
//           `Milestone "${targetMilestone?.title}" files uploaded. Awaiting client review for project "${p.title}".`,
//           'info',
//           'action',
//           'Review Milestone',
//           'project-workspace',
//           p.id
//         );

//         return {
//           ...p,
//           milestones: updatedMilestones,
//           activityLogs: [...(p.activityLogs || []), deliveryLog]
//         };
//       }
//       return p;
//     }));
//     showAlert('Milestone delivered! 48 hours approval countdown timer started.', 'success');
//   };

//   const releaseMilestoneFunds = (projectId: string, milestoneId: string) => {
//     setProjects(prev => prev.map(p => {
//       if (p.id === projectId) {
//         const targetMilestone = p.milestones.find(m => m.id === milestoneId);
//         if (!targetMilestone) return p;

//         const amount = targetMilestone.amount;
//         const isFirstRelease = !p.milestones.filter(m => m.id !== milestoneId).some(m => m.isApproved);

//         let feeAmt = 0;
//         let feePercent = 0;
//         if (isFirstRelease && (p.feePayer === 'freelancer' || p.feePayer === 'split')) {
//           feePercent = p.feePayer === 'freelancer' ? 3 : 1.5;
//           feeAmt = p.amount * (feePercent / 100);
//         }

//         const netPayout = amount - feeAmt;

//         setWallet(w => {
//           if (p.currency === 'NGN') {
//             const netPending = Math.max(0, w.pendingNgn - amount);
//             return {
//               ...w,
//               pendingNgn: netPending,
//               availableNgn: w.availableNgn + netPayout
//             };
//           } else {
//             const netPending = Math.max(0, w.pendingUsd - amount);
//             return {
//               ...w,
//               pendingUsd: netPending,
//               availableUsd: w.availableUsd + netPayout
//             };
//           }
//         });

//         const symbol = p.currency === 'NGN' ? '₦' : '$';
//         let detailMsg = `Payment of ${symbol}${amount.toLocaleString()} for milestone "${targetMilestone.title}" released.`;
//         if (feeAmt > 0) {
//           detailMsg += ` Platform escrow fee of ${feePercent}% (${symbol}${feeAmt.toLocaleString()}) was deducted from this first milestone payout.`;
//         }
//         detailMsg += ` Net of ${symbol}${netPayout.toLocaleString()} added to your available balance.`;

//         addNotification(
//           'Milestone Payment Released',
//           detailMsg,
//           'success',
//           'update',
//           'Check Wallet',
//           'wallet',
//           p.id
//         );

//         const nowISO = new Date().toISOString();
//         const releaseLog = {
//           id: `log-${Date.now()}-${Math.floor(Math.random() * 105151)}`,
//           title: `Milestone Released - ${targetMilestone.title}`,
//           description: `Authorized milestone released. ${feeAmt > 0 ? `Platform escrow fee of ${symbol}${feeAmt.toLocaleString()} (${feePercent}%) deducted from first milestone.` : ''} Net payout of ${symbol}${netPayout.toLocaleString()} credited.`,
//           timestamp: nowISO,
//           actor: 'client' as const,
//           type: 'payment_released' as const
//         };

//         const updatedMilestones = p.milestones.map(m => {
//           if (m.id === milestoneId) {
//             return {
//               ...m,
//               isApproved: true,
//               isCompleted: true,
//               isSubmitted: false,
//               isDisputed: false,
//               releasedAt: nowISO
//             };
//           }
//           return m;
//         });

//         const allApproved = updatedMilestones.every(m => m.isApproved);

//         return {
//           ...p,
//           milestones: updatedMilestones,
//           isReleased: allApproved,
//           releasedAt: allApproved ? nowISO : p.releasedAt,
//           escrowStatus: allApproved ? 'completed' : p.escrowStatus,
//           activityLogs: [...(p.activityLogs || []), releaseLog]
//         };
//       }
//       return p;
//     }));
//     showAlert('Milestone released successfully. Payout credited!', 'success');
//   };

//   const raiseMilestoneDispute = (projectId: string, milestoneId: string, reason: string, evidenceFileName?: string) => {
//     setProjects(prev => prev.map(p => {
//       if (p.id === projectId) {
//         const targetMilestone = p.milestones.find(m => m.id === milestoneId);
//         if (!targetMilestone) return p;

//         const nowISO = new Date().toISOString();
//         const actorType: NonNullable<Milestone['disputedBy']> = demoRole === 'client' ? 'client' : 'freelancer';

//         const updatedMilestones: Milestone[] = p.milestones.map(m => {
//           if (m.id === milestoneId) {
//             return {
//               ...m,
//               isDisputed: true,
//               disputedBy: actorType,
//               disputeReason: reason,
//               disputedAt: nowISO,
//               disputeStatus: 'pending' as const
//             };
//           }
//           return m;
//         });

//         const disputeLog: ActivityLog = {
//           id: `log-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
//           title: `Milestone Dispute Opened - ${targetMilestone.title}`,
//           description: `Dispute requested by client on milestone "${targetMilestone.title}". Reason: "${reason}". Milestone escrow holds are frozen.`,
//           timestamp: nowISO,
//           actor: actorType,
//           type: 'dispute_raised' as const
//         };

//         addNotification(
//           'Milestone Dispute Raised',
//           `Milestone "${targetMilestone.title}" dispute opened. WhatsApp mediator support notified.`,
//           'warning',
//           'action',
//           'Resolve Disagreements',
//           'project-workspace',
//           p.id
//         );

//         return {
//           ...p,
//           milestones: updatedMilestones,
//           activityLogs: [...(p.activityLogs || []), disputeLog]
//         };
//       }
//       return p;
//     }));
//     showAlert('Milestone dispute raised. Platform mediator will inspect elements over WhatsApp support.', 'warning');
//   };

//   const resolveMilestoneDispute = (projectId: string, milestoneId: string) => {
//     setProjects(prev => prev.map(p => {
//       if (p.id === projectId) {
//         const targetMilestone = p.milestones.find(m => m.id === milestoneId);
//         if (!targetMilestone) return p;

//         const amount = targetMilestone.amount;
//         const isFirstRelease = !p.milestones.filter(m => m.id !== milestoneId).some(m => m.isApproved);

//         let feeAmt = 0;
//         let feePercent = 0;
//         if (isFirstRelease && (p.feePayer === 'freelancer' || p.feePayer === 'split')) {
//           feePercent = p.feePayer === 'freelancer' ? 3 : 1.5;
//           feeAmt = p.amount * (feePercent / 100);
//         }

//         const netPayout = amount - feeAmt;

//         setWallet(w => {
//           if (p.currency === 'NGN') {
//             const netPending = Math.max(0, w.pendingNgn - amount);
//             return {
//               ...w,
//               pendingNgn: netPending,
//               availableNgn: w.availableNgn + netPayout
//             };
//           } else {
//             const netPending = Math.max(0, w.pendingUsd - amount);
//             return {
//               ...w,
//               pendingUsd: netPending,
//               availableUsd: w.availableUsd + netPayout
//             };
//           }
//         });

//         const symbol = p.currency === 'NGN' ? '₦' : '$';
//         addNotification(
//           'Milestone Dispute Resolved',
//           `Milestone dispute resolved in favor of Freelancer. ${symbol}${netPayout.toLocaleString()} released.`,
//           'success',
//           'update',
//           'Check Wallet',
//           'wallet',
//           p.id
//         );

//         const nowISO = new Date().toISOString();
//         const resolveLog = {
//           id: `log-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
//           title: `Milestone Dispute Resolved - ${targetMilestone.title}`,
//           description: `Dispute settled. Milestone payment of ${symbol}${netPayout.toLocaleString()} released.`,
//           timestamp: nowISO,
//           actor: 'system' as const,
//           type: 'dispute_resolved' as const
//         };

//         const updatedMilestones = p.milestones.map(m => {
//           if (m.id === milestoneId) {
//             return {
//               ...m,
//               isApproved: true,
//               isCompleted: true,
//               isSubmitted: false,
//               isDisputed: false,
//               disputeStatus: 'resolved' as const,
//               releasedAt: nowISO
//             };
//           }
//           return m;
//         });

//         const allApproved = updatedMilestones.every(m => m.isApproved);

//         return {
//           ...p,
//           milestones: updatedMilestones,
//           isReleased: allApproved,
//           releasedAt: allApproved ? nowISO : p.releasedAt,
//           escrowStatus: allApproved ? 'completed' : p.escrowStatus,
//           activityLogs: [...(p.activityLogs || []), resolveLog]
//         };
//       }
//       return p;
//     }));
//     showAlert('Milestone dispute resolved. Funds released to freelancer!', 'success');
//   };

//   const simulateMilestone48hPassage = (projectId: string, milestoneId: string) => {
//     setProjects(prev => prev.map(p => {
//       if (p.id === projectId) {
//         const targetMilestone = p.milestones.find(m => m.id === milestoneId);
//         if (!targetMilestone || !targetMilestone.isSubmitted) return p;

//         const amount = targetMilestone.amount;
//         const isFirstRelease = !p.milestones.filter(m => m.id !== milestoneId).some(m => m.isApproved);

//         let feeAmt = 0;
//         let feePercent = 0;
//         if (isFirstRelease && (p.feePayer === 'freelancer' || p.feePayer === 'split')) {
//           feePercent = p.feePayer === 'freelancer' ? 3 : 1.5;
//           feeAmt = p.amount * (feePercent / 100);
//         }

//         const netPayout = amount - feeAmt;

//         setWallet(w => {
//           if (p.currency === 'NGN') {
//             const netPending = Math.max(0, w.pendingNgn - amount);
//             return {
//               ...w,
//               pendingNgn: netPending,
//               availableNgn: w.availableNgn + netPayout
//             };
//           } else {
//             const netPending = Math.max(0, w.pendingUsd - amount);
//             return {
//               ...w,
//               pendingUsd: netPending,
//               availableUsd: w.availableUsd + netPayout
//             };
//           }
//         });

//         const symbol = p.currency === 'NGN' ? '₦' : '$';
//         addNotification(
//           'Automated Milestone Release',
//           `No client response after 48 hours. Escrow milestone "${targetMilestone.title}" auto-released to available balance: ${symbol}${netPayout.toLocaleString()}`,
//           'success',
//           'update',
//           'Check Wallet',
//           'wallet',
//           p.id
//         );

//         const nowISO = new Date().toISOString();
//         const autoLog = {
//           id: `log-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
//           title: `Milestone Auto-Released (48h Inaction) - ${targetMilestone.title}`,
//           description: `No client action detected within 48 hours of secure delivery. System automated milestone payout triggered for ${symbol}${netPayout.toLocaleString()}.`,
//           timestamp: nowISO,
//           actor: 'system' as const,
//           type: 'payment_released' as const
//         };

//         const updatedMilestones = p.milestones.map(m => {
//           if (m.id === milestoneId) {
//             return {
//               ...m,
//               isApproved: true,
//               isCompleted: true,
//               isSubmitted: false,
//               isDisputed: false,
//               releasedAt: nowISO
//             };
//           }
//           return m;
//         });

//         const allApproved = updatedMilestones.every(m => m.isApproved);

//         return {
//           ...p,
//           milestones: updatedMilestones,
//           isReleased: allApproved,
//           releasedAt: allApproved ? nowISO : p.releasedAt,
//           escrowStatus: allApproved ? 'completed' : p.escrowStatus,
//           activityLogs: [...(p.activityLogs || []), autoLog]
//         };
//       }
//       return p;
//     }));
//     showAlert('System simulation: 48-hour deadline breached. Milestone payout automatically transferred to your balance!', 'success');
//   };

//   const withdrawFunds = async (amount: number, bankName: string, accountNumber: string, code: string, currency: 'NGN' | 'USD' = 'NGN'): Promise<boolean> => {
//     if (currency === 'NGN') {
//       if (wallet.availableNgn < amount) {
//         showAlert('Insufficient NGN balance in your wallet.', 'error');
//         return false;
//       }
//     } else {
//       if (wallet.availableUsd < amount) {
//         showAlert('Insufficient USD balance in your wallet.', 'error');
//         return false;
//       }
//     }

//     // Simulate 2FA bank API latency
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         setWallet(w => {
//           if (currency === 'NGN') {
//             return {
//               ...w,
//               availableNgn: w.availableNgn - amount
//             };
//           } else {
//             return {
//               ...w,
//               availableUsd: w.availableUsd - amount
//             };
//           }
//         });

//         if (currency === 'NGN') {
//           addNotification(
//             'Withdrawal Processed',
//             `₦${amount.toLocaleString()} was successfully debited and instant wired to ${bankName} account ${accountNumber}.`,
//             'success',
//             'informational',
//             'Check Balance',
//             'wallet'
//           );
//           showAlert(`₦${amount.toLocaleString()} processed instantly to bank!`, 'success');
//         } else {
//           addNotification(
//             'Withdrawal Processed',
//             `$${amount.toLocaleString()} USD was successfully debited and wired to dollar account ${accountNumber} at ${bankName}.`,
//             'success',
//             'informational',
//             'Check Balance',
//             'wallet'
//           );
//           showAlert(`$${amount.toLocaleString()} USD processed instantly to dollar account!`, 'success');
//         }
//         resolve(true);
//       }, 1500);
//     });
//   };

//   const updatePhoneNumber = (phone: string, verified: boolean = false) => {
//     setCurrentUser(prev => ({ ...prev, phone, phoneVerified: verified }));
//     if (verified) {
//       showAlert('Phone number verified successfully!', 'success');
//     } else {
//       showAlert('WhatsApp phone number saved successfully!', 'success');
//     }
//   };

//   const loginUser = (email: string, role: UserRole) => {
//     const defaultName = role === 'client' ? 'Oluwaseun Adebayo' : 'Amara Ndukwe';
//     setCurrentUser({
//       name: defaultName,
//       email,
//       role,
//       isLoggedIn: true,
//       otpVerified: false,
//       emailVerified: true,
//       phoneVerified: false
//     });
//   };

//   const logoutUser = () => {
//     setCurrentUser({
//       name: '',
//       email: '',
//       role: 'client',
//       isLoggedIn: false,
//       otpVerified: false,
//       emailVerified: false,
//       phoneVerified: false
//     });
//     setActivePage('home');
//     showAlert('Logged out successfully', 'info');
//   };

//   const verifyUserOtp = () => {
//     setCurrentUser(prev => ({ ...prev, otpVerified: true }));
//     addNotification('Access Authorized', `Successfully authorized as ${currentUser.name}. Welcome to Mimotar!`, 'success');
//     showAlert('OTP Verified Successfully!', 'success');
//     setActivePage('dashboard');
//     return true;
//   };

//   const markNotificationAsRead = (id: string) => {
//     setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
//   };

//   const markAllNotificationsAsRead = () => {
//     setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
//     showAlert('All alerts marked as read', 'info');
//   };

//   const clearAllNotifications = () => {
//     setNotifications([]);
//     showAlert('All alerts cleared', 'info');
//   };

//   const resetDemoData = () => {
//     localStorage.removeItem('mimotar_projects');
//     localStorage.removeItem('mimotar_wallet');
//     localStorage.removeItem('mimotar_notifications');
//     localStorage.removeItem('mimotar_user');

//     setProjects(PRESET_PROJECTS);
//     setWallet(INITIAL_WALLET);
//     setNotifications(INITIAL_NOTIFICATIONS);
//     setCurrentUser({
//       name: 'Oluwaseun Adebayo',
//       email: 'kcblack22@gmail.com',
//       role: 'client',
//       isLoggedIn: true,
//       otpVerified: true,
//       emailVerified: true,
//       phoneVerified: false,
//     });
//     setDemoRoleState('client');
//     setActivePage('dashboard');
//     setSelectedProjectId(null);
//     showAlert('All simulation demo data has been reset to defaults.', 'info');
//   };

//   return (
//     <AppStateContext.Provider value={{
//       projects,
//       wallet,
//       notifications,
//       currentUser,
//       demoRole,
//       activePage,
//       selectedProjectId,
//       alertMessage,
//       withdrawCurrencyPreference,
//       setWithdrawCurrencyPreference,

//       setDemoRole,
//       setActivePage,
//       setSelectedProjectId,
//       showAlert,
//       clearAlert,

//       addNewProject,
//       acceptProjectAgreement,
//       rejectProjectAgreement,
//       fundProjectEscrow,
//       submitProjectDelivery,
//       releaseEscrowFunds,
//       raiseProjectDispute,
//       resolveProjectDispute,
//       extendProjectDeadline,

//       submitMilestoneDelivery,
//       releaseMilestoneFunds,
//       raiseMilestoneDispute,
//       resolveMilestoneDispute,
//       simulateMilestone48hPassage,

//       withdrawFunds,

//       loginUser,
//       logoutUser,
//       verifyUserOtp,
//       updatePhoneNumber,

//       markNotificationAsRead,
//       markAllNotificationsAsRead,
//       clearAllNotifications,
//       resetDemoData
//     }}>
//       {children}
//     </AppStateContext.Provider>
//   );
// };

// export const useAppState = () => {
//   const context = useContext(AppStateContext);
//   if (context === undefined) {
//     throw new Error('useAppState must be used within an AppStateProvider');
//   }
//   return context;
// };
