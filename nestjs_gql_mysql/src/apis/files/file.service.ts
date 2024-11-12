import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

const GCP_PROJECT_ID = 'manage-account-420307';
const GCP_KEY_FILENAME = 'gcp-file-storage.json';
const GCP_BUCKET_NAME = 'nestjs-storage';

// 스토리지 셋팅하기
const storage = new Storage({
  // GCP에서 사용할 프로젝트Id
  projectId: GCP_PROJECT_ID,
  // Cloud Storage를 사용하기위한 인증에 필요한 key의 파일명
  keyFilename: GCP_KEY_FILENAME,
  // GCP-Cloud Storage에서 업로드된 파일이 저장될 버킷명
}).bucket(GCP_BUCKET_NAME);

@Injectable()
export class FileService {
  async uploadFile({ file }: { file: FileUpload }): Promise<string> {
    console.log(file);

    // 스토리지에 파일 올리기
    await new Promise<string>((resolve, reject) =>
      file
        .createReadStream()
        .pipe(storage.file(file.filename).createWriteStream())
        .on('finish', () => {
          resolve('업로드 성공');
        })
        .on('error', () => {
          reject('업로드 실패');
        }),
    );

    console.log('파일전송이 완료되었습니다.');

    return '임시 작성';
  }

  async uploadFiles({ files }: { files: FileUpload[] }): Promise<string[]> {
    console.log(files);

    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles); // [File, File]

    // 1. 스토리지에 파일 올리기
    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () =>
                resolve(`/${process.env.GCP_BUCKET_NAME}/${el.filename}`),
              )
              .on('error', () => reject('업로드 실패'));
          }),
      ),
    );

    // 2. 다운로드 URL 브라우저에 돌려주기
    return results;
  }
}
