import { Pool } from "pg";

const poolConfig = {
    max: 5, 
    min: 2,
    idleTimeoutMillies: 600000,
    connetionString: '',
}

const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;
const database = process.env.POSTGRES_DB ;

poolConfig.connetionString = `postgres://${user}:${password}@${host}:${port}/${database}`

const pool = new Pool(poolConfig);

export default pool;
