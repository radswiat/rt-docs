import Promise from 'bluebird';
import path from 'path';

export async function loadFile(file){
  let fs = Promise.promisifyAll(require('fs'));
  let fileContent = await fs.readFileAsync( path.resolve(process.cwd(), file), 'utf-8');
  return fileContent;
}

export async function log(content){
    var fs = require('fs');
    fs.writeFileSync('./log/log.json', JSON.stringify(content));
}

export function camelToDash(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}