import { Connection } from 'mongoose'
import { PostSchema } from '../schemas/post.schema'

export const PostProviders = [
  {
    provide: 'POST_MODEL',
    useFactory: (connection: Connection): any => {
      if (!connection) return
      return connection.model('post', PostSchema, 'post')
    },
    inject: ['MONGODB_PROVIDER']
  }
]
