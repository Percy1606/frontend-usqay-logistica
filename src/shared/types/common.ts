export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface Option<T = string> {
  label: string
  value: T
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
