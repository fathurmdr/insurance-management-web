export interface Link {
  url: string;
  label: string;
  active: boolean;
}

export interface PaginationData<DataTypes> {
  data: DataTypes[];
  links: Link[];
  path: string;
  current_page: number;
  from: number;
  to: number;
  total: number;
  per_page: number;
  next_page_url: string;
  prev_page_url: string;
  first_page_url: string;
  last_page_url: string;
  last_page: number;
}
