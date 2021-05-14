import IStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private store: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.store.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.store.findIndex(findFile => findFile === file);

    this.store.splice(findIndex, 1);
  }
}
