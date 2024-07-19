export interface initialCompaniesType {
  items: Array<CompanyType>;
  companyById: CompanyType;
  totalCount: number | null;
  loading: boolean;
  error: string;
}

export interface CompanyType {
  id: string;
  name: string;
  description: string;
  visible: boolean,
}

export interface FetchCompaniesParams {
  skip: number;
  limit: number;
}

export interface CompanyProps {
  company: CompanyType;
}

export interface CompanyUpdateType {
  name: string;
  description: string;
  visible: boolean,
}

export interface CompanyAddType {
  name: string,
  description: string,
  visible: boolean,
}