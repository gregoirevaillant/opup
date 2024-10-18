export interface Interaction {
	id: string;
	job_id: string;
	user_id: string;
	status: "nothing" | "seen" | "applied";
}
