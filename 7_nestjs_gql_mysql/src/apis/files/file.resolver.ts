import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { FileService } from './file.service';

@Resolver()
export class FileResolver {
  constructor(
    private readonly fileService: FileService, //
  ) {}

  @Mutation(() => String)
  uploadFile(
    /**
     * `GraphQL`에서 실제로 받아온 파일과 받고난 후 파일의 타입이 다르기 때문에 타입을 강제로 변경시키는 작업이 필요합니다.
     * 받을 때는 `GraphQL` 타입인 `GraphQLUpload`을 사용하고, 받고 난 후에는 `Typescript`타입인 `FileUpload`로 받아야 합니다.
     */
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<string> {
    return this.fileService.uploadFile({ file });
  }

  @Mutation(() => [String])
  uploadFiles(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ): Promise<string[]> {
    return this.fileService.uploadFiles({ files });
  }
}
