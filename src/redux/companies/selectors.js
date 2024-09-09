export const selectCompanies = (state) => state.companies.items.companies;

export const selectCompanyById = (state) => state.companies.companyById;

export const selectTotalCount = (state) => state.companies.items.total_count;

export const selectLoading = (state) => state.companies.loading;

export const selectError = (state) => state.companies.error;
