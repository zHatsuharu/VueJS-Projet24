import { TcgplayerPrices } from "./tcgplayerPrices"

export interface Tcgplayer {
	url: string
	updatedAt: string
	prices: TcgplayerPrices
  }