import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Types} from 'mongoose';

@Schema({_id: false})
export class Car {
  @Prop({type: String, required: true, default: null})
  plate: string;

  @Prop({type: String, required: true, default: null})
  name: string;

  @Prop({type: String, required: true, default: null})
  model: string;

  @Prop({type: Date, required: true, default: Date.now})
  createdAt: Date;

  @Prop({type: Date, required: true, default: Date.now})
  updatedAt: Date;

  @Prop({type: Date, required: false, default: null})
  deletedAt: Date;
}

export const CarSchema = SchemaFactory.createForClass(Car);
