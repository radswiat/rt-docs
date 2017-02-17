import Promise from 'bluebird';
import path from 'path';

export async function loadFile(file){
  let fs = Promise.promisifyAll(require('fs'));
  let fileContent = await fs.readFileAsync( path.resolve(process.cwd(), file), 'utf-8');
  return fileContent;
}