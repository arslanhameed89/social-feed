import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ autoCreate: true, timestamps: true })
export class Post extends Document {

  @Prop()
  author: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  image: string;

  @Prop()
  category: string;

  @Prop()
  likes: [];

  @Prop()
  likesCount: number;

  @Prop()
  viewsCount: number;

  @Prop()
  tags: [];

  @Prop()
  status: number;

  @Prop()
  statusMsg: string;

}

export const PostSchema = SchemaFactory.createForClass(Post);
