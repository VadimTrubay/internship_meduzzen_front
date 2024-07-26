export interface initialCompaniesType {
  items: CompanyType[];
  companyById: null;
  totalCount: number;
  loading: boolean;
  error: null;
}

export interface CompanyType {
  id: string;
  name: string;
  description: string;
  visible: boolean,
  owner_id: string,
}

export interface FetchCompaniesParams {
  skip: number | null;
  limit: number | null;
}

export interface CompanyUpdateType {
  id: string;
  name?: string;
  description?: string;
  visible: boolean,
}

export interface CompanyAddType {
  name: string,
  description: string,
  visible: boolean,
}

export interface CompaniesListProps {
  companies: CompanyType[];
}
