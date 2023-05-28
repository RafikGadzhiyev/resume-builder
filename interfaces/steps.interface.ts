import { Descriptions } from "../types"

export interface IDescription {
    id: string
    type: Descriptions
    title: string
    from: string
    description: string
    year: number
}