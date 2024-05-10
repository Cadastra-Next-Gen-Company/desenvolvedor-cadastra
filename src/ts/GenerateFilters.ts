interface Filter {
  title: string
}

export interface GenerateFilters {
  title: string
  listFilter: Array<Filter>
  ref: any
}