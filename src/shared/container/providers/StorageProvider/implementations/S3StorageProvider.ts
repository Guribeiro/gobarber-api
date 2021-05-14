import fs from 'fs';
import aws, { S3 } from 'aws-sdk';
import { getType } from 'mime';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

const { bucket } = uploadConfig.config.aws;

export default class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-2',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tempFolder, file);
    const ContentType = getType(originalPath);

    if (!ContentType) {
      throw new Error('no file found');
    }
    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: bucket,
        Key: file,
      })
      .promise();
  }
}
