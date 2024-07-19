export interface initialCompaniesType {
  items: Array<CompanyType> | [];
  companyById: CompanyType | null;
  totalCount: number | null;
  loading: boolean;
  error: string;
}

export interface CompanyType {
  id: string;
  name: string;
  description: string;
  is_visible: boolean,
}

export interface FetchCompaniesParams {
  skip: number;
  limit: number;
}

export interface CompanyProps {
  company: CompanyType;
}

export interface CompanyUpdateType extends CompanyType {

}

export interface CompanyDeleteType {
  id: string;
}