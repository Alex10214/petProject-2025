export interface IMessage {
  id: string;
  senderID: string;
  senderDisplayName: string;
  senderImageUrl: string;
  recipientID: string;
  recipientDisplayName: string;
  recipientImageUrl: string;
  content: string;
  dateRead?: string;
  messageSent: string;
}
