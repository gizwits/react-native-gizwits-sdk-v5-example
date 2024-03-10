import RNFS from 'react-native-fs';

class ProductConfigManager {
  cache: any = {};
  async getConfig(pk: string) {
    if (this.cache[pk]) {
      return this.cache[pk];
    }
    const documentDirectoryPath = RNFS.DocumentDirectoryPath;
    const filePath = `${documentDirectoryPath}/productConfig/${pk}.json`;
    const content = await this.readLocalFile(filePath);
    try {
      const jsonData = JSON.parse(content || '');
      this.cache[pk] = jsonData;
      return jsonData;
    } catch (error) {
      return null;
    }
  }
  readLocalFile = async (filePath: string) => {
    try {
      const content = await RNFS.readFile(filePath, 'utf8');
      return content || '';
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

export default new ProductConfigManager();
