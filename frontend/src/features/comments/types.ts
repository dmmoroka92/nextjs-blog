import { User } from "../auth/types/user";

export type Comment = {
  id: string;
  body: string;
  createdAt: string;
  user: User;
};