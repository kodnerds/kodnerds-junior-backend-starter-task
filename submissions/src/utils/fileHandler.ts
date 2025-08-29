import {promises as fs} from 'fs';
import path from 'path';

type Item = { id: string | number };

const dataPath = path.join(process.cwd(), "data/dataset.json");

export const readData = async() =>{
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
};

export const writeData = async(data:any) =>{
    await fs.writeFile(dataPath,JSON.stringify(data,null,2));
};

export function getId(items:Item[]){
    const ids = items.map((item) => Number(item.id))
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}