import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ autoCreate: true, timestamps: true })
export class Customer extends Document {

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  email: string;

  @Prop()
  emailVerified: string;

  @Prop()
  mobile: string;

  @Prop()
  mobileVerified: boolean;

  @Prop()
  coordinates: any;

  @Prop()
  ip: any;

  @Prop()
  loginType: number;

  @Prop()
  profilePic: string;

  @Prop()
  status: number;

  @Prop()
  statusMsg: string;

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
