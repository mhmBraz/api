import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

@Schema()
export class Address {
  _id?: string;

  @Prop({type: String, required: true, default: null})
  zip_code: string;

  @Prop({type: String, required: true, default: null})
  street: string;

  @Prop({type: String, required: true, default: null})
  number: string;

  @Prop({type: String, required: true, default: null})
  complement: string;

  @Prop({type: String, required: true, default: null})
  city: string;

  @Prop({type: String, required: true, default: null})
  state: string;
}

export type UserDocument = HydratedDocument<Address>;
export const AddressSchema = SchemaFactory.createForClass(Address);
