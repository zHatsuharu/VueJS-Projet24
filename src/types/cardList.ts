import { Card } from "./card";

export interface CardList {
	data: Card[],
	page: number,
	pageSize: number,
	count: number,
	totalCount: number
}