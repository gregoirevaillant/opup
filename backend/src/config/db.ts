import { Pool } from "pg";

const pool = new Pool({
	user: process.env.POSTGRES_USER as string,
	password: process.env.POSTGRES_PASSWORD as string,
	host: process.env.POSTGRES_HOST as string,
	port: process.env.POSTGRES_PORT as unknown as number,
	database: process.env.POSTGRES_DB as string
});

export default pool;
