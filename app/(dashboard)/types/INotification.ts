type INotification = {
  id: number;
  title: string;
  sender_user_id: number | null;
  receiver_user_id: number | null;
  timestamp: string;
  content: string;
  link: string | null;
  avatar: string | null;
  read: "unread" | "read";
};

export type INotificationResponse = {
  data: INotification[];
  message: string;
  success: boolean;
};
