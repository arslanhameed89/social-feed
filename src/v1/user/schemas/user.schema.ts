import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export class coordinates {
  @ApiProperty()
    longitude: number

  @ApiProperty()
    latitude: number
}

@Schema({ autoCreate: true, timestamps: true })
export class User extends Document {
  @Prop()
    name: string

  @Prop()
    password: string

  @Prop()
    dateOfBirth: string

  @Prop()
    email: string

  @Prop()
    emailVerified: string

  @Prop()
    mobile: number

  @Prop()
    mobileVerified: boolean

  @Prop({ type: coordinates })
    coordinates: coordinates

  @Prop()
    ip: string

  @Prop()
    loginType: number

  @Prop()
    profilePic: string

  @Prop()
    status: number

  @Prop()
    statusMsg: string
}

export const UserSchema = SchemaFactory.createForClass(User)
