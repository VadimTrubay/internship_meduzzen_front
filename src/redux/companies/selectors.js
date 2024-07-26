export const selectCompanies = (state) => state.companies.items;

export const selectCompanyById = (state) => state.companies.companyById;

export const selectTotalCount = (state) => state.companies.totalCount;

export const selectLoading = (state) => state.companies.loading;

export const selectError = (state) => state.companies.error;
