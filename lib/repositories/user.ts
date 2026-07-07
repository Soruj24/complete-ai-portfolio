import { BaseRepository, type FilterQuery } from "./base";
import { User, IUser } from "@/models/User";

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ email: email.toLowerCase() } as FilterQuery<IUser>);
  }

  async findByVerificationToken(token: string): Promise<IUser | null> {
    return this.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    } as FilterQuery<IUser>);
  }

  async findByResetToken(token: string): Promise<IUser | null> {
    return this.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    } as FilterQuery<IUser>);
  }

  async updatePassword(id: string, password: string): Promise<IUser | null> {
    return this.update(id, {
      password,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined,
    } as Partial<IUser>);
  }

  async verifyEmail(id: string): Promise<IUser | null> {
    return this.update(id, {
      isVerified: true,
      verificationToken: undefined,
      verificationTokenExpires: undefined,
    } as Partial<IUser>);
  }

  async updateLastLogin(id: string): Promise<IUser | null> {
    return this.update(id, { lastLogin: new Date() } as unknown as Partial<IUser>);
  }
}

export const userRepository = new UserRepository();
