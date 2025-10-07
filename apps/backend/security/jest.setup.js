import dotenv from 'dotenv-flow';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), 'apps/backend'),
  node_env: 'test',
});