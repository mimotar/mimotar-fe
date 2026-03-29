import type { DisputePageViewModel } from "../types/dispute";

const baseDisputeMockData: DisputePageViewModel = {
  id: "123456",
  status: "In Negotiation",
  countdown: {
    days: 2,
    hours: 14,
    minutes: 55,
  },
  transactionSummary: {
    transactionId: "#123456",
    transactionDate: "29 Aug, 2024",
    sellerName: "Jane Smith",
    buyerName: "John Doe",
    paymentMethod: "Bank transfer",
    totalAmount: "$176.00",
  },
  disputeSummary: {
    reasonForDispute: "Product or service not delivered",
    proposal: "Refund only",
    submissionDate: "02 Sept, 2024",
    evidence: [
      {
        id: "evidence-receipt",
        fileName: "Receipt.pdf",
        submittedAt: "02 Sept, 2024  9:12 AM",
        fileType: "pdf",
      },
      {
        id: "evidence-picture",
        fileName: "picture.jpg",
        submittedAt: "02 Sept, 2024  9:12 AM",
        fileType: "image",
      },
    ],
  },
  progressEvents: [
    {
      id: "event-negotiation",
      dateLabel: "03 Sept, 2024",
      timeLabel: "08:22 AM",
      title: "In negotiation",
      color: "accent",
    },
    {
      id: "event-opened",
      dateLabel: "02 Sept, 2024",
      timeLabel: "12:16 PM",
      title: "Dispute opened",
      color: "neutral",
    },
  ],
};

export function getDisputeMockData(disputeId: string): DisputePageViewModel {
  return {
    ...baseDisputeMockData,
    id: disputeId,
  };
}
