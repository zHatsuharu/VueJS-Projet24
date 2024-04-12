import { Legalities } from "./legalities"
import { SetImages } from "./setImages"

export interface SetType {
	id: string
	name: string
	series: string
	printedTotal: number
	total: number
	legalities: Legalities
	ptcgoCode: string
	releaseDate: string
	updatedAt: string
	images: SetImages
  }