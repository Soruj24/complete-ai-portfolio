export interface ContactMessage {
  _id?: string;
  userId?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: string;
  read?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SendContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}
