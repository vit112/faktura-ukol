import gql from "graphql-tag";

export const CREATE_CLIENT = gql`
  mutation CreateClient(
    $name: String!
    $company_number: String!
    $street: String!
    $city: String!
    $postcode: String!
    $country_code: String!
    $tax_number: String!
    $vat_number: String!
    $email: String!
    $phone: String!
    $web: String!
    $invoices_count: Int!
  ) {
    createClient(
      name: $name
      company_number: $company_number
      street: $street
      city: $city
      postcode: $postcode
      country_code: $country_code
      tax_number: $tax_number
      vat_number: $vat_number
      email: $email
      phone: $phone
      web: $web
      invoices_count: $invoices_count
    ) {
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

export const UPDATE_CLIENT_MUTATION = gql`
  mutation UpdateClient(
    $id: ID!
    $name: String
    $company_number: String
    $street: String
    $city: String
    $postcode: String
    $country_code: String
    $tax_number: String
    $vat_number: String
    $email: String
    $phone: String
    $web: String
    $invoices_count: Int
  ) {
    updateClient(
      id: $id
      name: $name
      company_number: $company_number
      street: $street
      city: $city
      postcode: $postcode
      country_code: $country_code
      tax_number: $tax_number
      vat_number: $vat_number
      email: $email
      phone: $phone
      web: $web
      invoices_count: $invoices_count
    ) {
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
