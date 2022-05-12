import { Connection } from 'mongoose'
import { CustomerSchema } from '../schemas/customer.schema'
import { CategorySchema } from "@/v1/categories/schemas/category.schema";


export const CustomerProviders = [
  {
    provide: 'CUSTOMER_MODEL',
    useFactory: (connection: Connection) : any => {
      if(!connection) return
      return connection.model('customer', CategorySchema, 'customer')
    },
    inject: ['MONGODB_PROVIDER'],
  }
];
