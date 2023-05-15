import gql from "graphql-tag";

export const CLIENTS_LIST_QUERY = gql`
  query clientsList {
    allClients {
      id
      name
      company_number
      street
      city
      postcode
      country_code
      tax_number
      vat_number
      email
      phone
      web
      invoices_count
    }
  }
`;

export const ALL_COMPANY_INFOS_BY_NUMBER = gql`
  query AllCompanyInfos($companyNumber: String) {
    allCompanyInfos(filter: { company_number: $companyNumber }) {
      id
      company_number
      name
      country_code
      address_street
      address_city
      address_postcode
      vat_no
      reg_no
      phone
      email
      mobile
      bank_account
      web
    }
  }
`;

//would be better with filter by passing the input value
export const ALL_COMPANY_INFOS = gql`
  query AllCompanyInfos {
    allCompanyInfos {
      id
      company_number
      name
      country_code
      address_street
      address_city
      address_postcode
      vat_no
      reg_no
      phone
      email
      mobile
      bank_account
      web
    }
  }
`;

export const FETCH_CLIENT_BY_ID = gql`
  query FetchClientById($id: ID!) {
    Client(id: $id) {
      id
      name
      company_number
      street
      city
      postcode
      country_code
      tax_number
      vat_number
      email
      phone
      web
      invoices_count
    }
  }
`;

export const CLIENT_INVOICES_QUERY = gql`
  query ClientInvoices($clientId: ID!) {
    allInvoices(filter: { client: { id: $clientId } }) {
      id
      number
      due_on
      kind
      total_float
      state
      paid_at
    }
  }
`;

export const GET_CLIENT_INVOICES = gql`
  query GetAllInvoicesForClient($clientId: ID!) {
    allInvoices(filter: { client_id: $clientId }) {
      id
      number
      due_on
      kind
      state
      total_float
      currency
    }
  }
`;
