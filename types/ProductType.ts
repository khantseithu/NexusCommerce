export type ProductType = {
  name: string
  unit_amount: number | null
  quantity?: number | 1
  image: string
  id: string
  description: string | null
  metadata: MetadataType
  currency: string
}

type MetadataType = {
  features: string
}