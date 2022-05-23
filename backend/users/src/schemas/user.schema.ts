import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: Roles.USER })
  roles: [Roles];
}

export const UserSchema = SchemaFactory.createForClass(User);
