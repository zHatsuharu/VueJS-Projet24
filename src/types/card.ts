import { Ability } from "./ability"
import { Attack } from "./attack"
import { CardImages } from "./cardImages"
import { Cardmarket } from "./cardmarket"
import { Legalities } from "./legalities"
import { Set } from "./set"
import { Tcgplayer } from "./tcgplayer"
import { Weakness } from "./weakness"

export interface Card {
	id: string
	name: string
	supertype: string
	subtypes: string[]
	hp: string
	types: string[]
	evolvesFrom: string
	abilities: Ability[]
	attacks: Attack[]
	weaknesses: Weakness[]
	retreatCost: string[]
	convertedRetreatCost: number
	set: Set
	number: string
	artist: string
	rarity: string
	flavorText: string
	nationalPokedexNumbers: number[]
	legalities: Legalities
	images: CardImages
	tcgplayer: Tcgplayer
	cardmarket: Cardmarket
  }
  