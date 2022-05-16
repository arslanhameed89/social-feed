import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ autoCreate: true, timestamps: true })
export class Category extends Document {
  @Prop()
    name: string

  @Prop()
    description: string

  @Prop()
    imageUrl: string

  @Prop()
    status: number

  @Prop()
    statusMsg: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)
