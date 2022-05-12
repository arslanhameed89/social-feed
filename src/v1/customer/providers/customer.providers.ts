import { Connection } from 'mongoose'
import { CustomerSchema } from '../schemas/customer.schema'

export const CustomerProviders = [
  {
    provide: 'CUSTOMER_MODEL',
    useFactory: (connection: Connection) : any => {
      if(!connection) return
      return connection.model('customer', CustomerSchema, 'customer')
    },
    inject: ['MONGODB_PROVIDER'],
  }
];
