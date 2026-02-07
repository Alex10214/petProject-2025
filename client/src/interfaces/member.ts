export interface IMember {
  id: string
  birthDate: string
  imageUrl?: string
  displayName: string
  country: string
  city: string
  created: string
  lastActive: string
  description?: string
}

export interface IEditMember {
  birthDate: string
  imageUrl?: string
  displayName: string
  country: string
  city: string
  description?: string
}
