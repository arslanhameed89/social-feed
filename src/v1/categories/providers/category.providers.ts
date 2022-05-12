import { Connection } from 'mongoose'
import { CategorySchema } from '../schemas/category.schema'

export const CategoryProviders = [
  {
    provide: 'CATEGORY_MODEL',
    useFactory: (connection: Connection) : any => {
      if(!connection) return
      return connection.model('categories', CategorySchema, 'categories')
    },
    inject: ['MONGODB_PROVIDER'],
  },
];
