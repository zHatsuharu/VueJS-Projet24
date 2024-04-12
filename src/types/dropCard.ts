import { BoosterCard } from "./boosterCard"
import { Card } from "./card"

export type DropCard = {
	id: string
	boosterCard: BoosterCard
	card: Card
}