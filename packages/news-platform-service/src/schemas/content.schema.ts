import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Content {
  @Prop({ required: true })
  content: string;
}

export const ContentSchema =  SchemaFactory.createForClass(Content)
