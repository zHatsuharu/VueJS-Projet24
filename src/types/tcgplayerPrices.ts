import { TCGPriceProperties } from "./tcgplayerPriceProterties"

export interface TcgplayerPrices {
	normal: TCGPriceProperties
	holofoil: TCGPriceProperties
	reverseHolofoil?: TCGPriceProperties
	'1stEditionNormal'?: TCGPriceProperties
	'1stEditionHolofoil'?: TCGPriceProperties
}