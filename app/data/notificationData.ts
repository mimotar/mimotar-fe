export type NotificationType = {
  name: string;
  imgUrl: string;
  createdAt: Date;
  content: string;
  isRead: boolean;
};

export const notificationData: NotificationType[] = [
  {
    name: "Salisu Admed",
    imgUrl: "http://image.com/avatar1",
    createdAt: new Date(),
    content: "sent you a transaction link.",
    isRead: true,
  },
  {
    name: "Fatima Bello",
    imgUrl: "http://image.com/avatar2",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    content: "liked your recent post.",
    isRead: false,
  },
  {
    name: "John Okoro",
    imgUrl: "http://image.com/avatar3",
    createdAt: new Date(new Date().setHours(new Date().getHours() - 5)),
    content: "requested a connection.",
    isRead: true,
  },
  {
    name: "Esther Adebayo",
    imgUrl: "http://image.com/avatar4",
    createdAt: new Date(new Date().setMinutes(new Date().getMinutes() - 45)),
    content: "mentioned you in a comment.",
    isRead: false,
  },
  {
    name: "David Smith",
    imgUrl: "http://image.com/avatar5",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    content: "sent you a message.",
    isRead: true,
  },
];
