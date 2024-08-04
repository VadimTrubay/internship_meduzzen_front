export interface initialCompaniesType {
  items: {
    companies: CompanyType[];
    total_count: number;
  };
  companyById: CompanyType | null;
  loading: boolean;
  error: null;
}

export interface CompanyType {
  id: string;
  name: string;
  description: string;
  visible: boolean;
  owner_id: string;
}

export interface FetchCompaniesParams {
  skip: number;
  limit: number;
}

export interface CompanyUpdateType {
  id: string;
  name?: string;
  description?: string;
  visible: boolean;
}

export interface CompanyAddType {
  name: string;
  description: string;
  visible: boolean;
}

export interface CompaniesListProps {
  companies: CompanyType[];
}
