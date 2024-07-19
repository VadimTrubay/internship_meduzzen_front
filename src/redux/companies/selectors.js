export const selectCompanies = (state) => state.companies.items.companies || [];

export const selectCompanyById = (state) => state.companies.companyById || null;

export const selectTotalCount = (state) => state.companies.totalCount || null;

export const selectLoading = (state) => state.companies.loading;

export const selectError = (state) => state.companies.error;
