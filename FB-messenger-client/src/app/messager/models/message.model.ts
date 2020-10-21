
export class MessageModel {
  _id?: string;
  text: string;
  timestamp: number;
  attachments?: [];
  mid: string;
  isAgent: boolean;
}

export class SendMessageModel {
  message: string;
  customerId: string;
}


export class GetMessagesModel {
  _id?: string;
  messages: MessageModel[];
  firstName: string;
  lastName: string;
  createdAt: Date;
}
