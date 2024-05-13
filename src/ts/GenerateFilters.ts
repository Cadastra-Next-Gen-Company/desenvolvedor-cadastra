interface Filter {
  title: string
}

export interface GenerateFilters {
  title: string
  className?: string
  name?: string
  listFilter: Array<Filter>
  ref: any
}