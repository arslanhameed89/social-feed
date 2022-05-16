import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import appConfig from '../../config/app.config'
import { Post, PostSchema } from '@/v1/post/schemas/post.schema'
import { PostProviders } from './providers/post.providers'
import { ProvidersModule } from '@/providers/providers.module'
import { CoreModule } from '@/core/core.module'
import { PostService } from '@/v1/post/services/post.service'
import { PostRepository } from '@/v1/post/repository/post.repository'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { CreatePostDto } from '@/v1/post/dto/create-post.dto'
import { PostController } from '@/v1/post/post.controller'
import * as fs from 'fs'
import * as mongoose from 'mongoose'
import * as streamBuffers from 'stream-buffers'

const POST_MODEL: mongoose.Model<any> = mongoose.model('post', PostSchema)

const mockingPostModel = () => {
  create: jest.fn()
}

async function FileUpload () {
  const fileToBuffer = (filename) => {
    const readStream = fs.createReadStream(filename)
    const chunks = []
    return new Promise((resolve, reject) => {
      // Handle any errors while reading
      readStream.on('error', (err) => {
        // handle error

        // File could not be read
        reject(err)
      })

      // Listen for data
      readStream.on('data', (chunk) => {
        chunks.push(chunk)
      })

      // File is done being read
      readStream.on('close', () => {
        // Create a buffer of the image from the stream
        resolve(Buffer.concat(chunks))
      })
    })
  }
  const imageBuffer = (await fileToBuffer('./uploads-tmp/test.png')) as Buffer

  const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
    frequency: 10, // in milliseconds.
    chunkSize: 2048 // in bytes.
  })
  myReadableStreamBuffer.put(imageBuffer as Buffer)
  return {
    buffer: imageBuffer,
    fieldname: 'fieldname-defined-in-@UseInterceptors-decorator',
    originalname: 'original-filename',
    encoding: '7bit',
    mimetype: 'file-mimetype',
    destination: 'destination-path',
    filename: 'file-name',
    path: 'file-path',
    size: 955578,
    stream: myReadableStreamBuffer
  }
}

describe('Post Controller', () => {
  let service: PostService
  let repository: PostRepository
  let postController: PostController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [appConfig]
        }),
        ProvidersModule,
        CoreModule
      ],
      controllers: [PostController],
      providers: [
        ...PostProviders,
        PostService,
        PostRepository,
        { provide: POST_MODEL, useFactory: mockingPostModel }
      ]
    }).compile()
    service = module.get<PostService>(PostService)
    repository = module.get<PostRepository>(PostRepository)
    postController = module.get<PostController>(PostController)
  })

  it('post controller should be defined', () => {
    expect(postController).toBeDefined()
  })

  describe('test post dto', () => {
    it('should throw when title is empty.', async () => {
      const dtoData = { title: '', author: 'arslan' }
      const ofDtoData = plainToInstance(CreatePostDto, dtoData)
      const errors = await validate(ofDtoData, { skipMissingProperties: true })
      expect(errors.length).not.toBe(0)
      expect(JSON.stringify(errors)).toContain('title should not be empty')
    })

    it('should pass the dto validation.', async () => {
      const dtoData = { title: 'arslan', author: 'arslan' }
      const ofDtoData = plainToInstance(CreatePostDto, dtoData)
      const errors = await validate(ofDtoData, { skipMissingProperties: true })
      expect(errors.length).toBe(0)
      expect(JSON.stringify(errors)).toEqual('[]')
    })
  })

  describe('Create Post ', () => {
    const dto = new CreatePostDto()
    it('should return an object of post entity when created', async () => {
      const expectedResult = {
        author: 'arslan',
        title: 'title',
        content: 'content',
        image:
          'uploads-tmp/8f0957c9-fac9-4249-8948-7d86ba73652b - Screenshot from 2022-04-20 22-07-47.png',
        category: '627f6e99ab31f92c6579ac20',
        likes: [],
        tags: ['tag1', 'tag2'],
        likesCount: 6
      } as Post
      jest
        .spyOn(service, 'create')
        .mockImplementation(async (): Promise<Post> => {
          return expectedResult
        })
      const imageFile = await FileUpload()

      expect(await postController.create(dto, imageFile)).toBe(expectedResult)
    })
  })
})
