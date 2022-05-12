import { Connection } from 'mongoose'
import { CustomerSchema } from '../schemas/customer.schema'


export const CustomerProviders = [
  {
    provide: 'CUSTOMER_MODEL',
    useFactory: (connection: Connection) : any => connection.model('customer', CustomerSchema, 'customers'),
    inject: ['MONGODB_PROVIDER'],
  }
];
