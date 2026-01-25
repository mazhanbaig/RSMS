export type ClientStatus = 'active' | 'deal-Done' | 'lost'

export type PropertyType = 'apartmentl' | 'house' | 'villa' | 'commercial' | 'land'

export interface Client {
  id: string
  ownerUid: string

  firstName: string
  lastName: string
  phone: string

  minBudget?: number
  maxBudget?: number

  preferredLocations?: string
  propertyType?: PropertyType

  source?: string
  notes?: string
  status?: ClientStatus
}
