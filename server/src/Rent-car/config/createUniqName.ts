import * as path from 'path';
const { v4: uuidv4 } = require('uuid');

export const createUniqName = (file) => {
    const uniqID = uuidv4();
    const fileExtName = path.extname(file.originalname);
    return `${uniqID}${fileExtName}`;
}

