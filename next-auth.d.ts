import { User } from "next-auth";

type UserId = string;
type UserEmail = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      email: UserEmail;
    };
  }
}
