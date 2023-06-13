/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment UserProps on User {\n  id\n  username\n}": types.UserPropsFragmentDoc,
    "mutation Login($options: UsernamePasswordInput!) {\n  login(options: $options) {\n    user {\n      ...UserProps\n    }\n    errors {\n      field\n      message\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($username: String!, $password: String!) {\n  register(options: {username: $username, password: $password}) {\n    user {\n      ...UserProps\n    }\n    errors {\n      field\n      message\n    }\n  }\n}": types.RegisterDocument,
    "query Me {\n  me {\n    ...UserProps\n  }\n}": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserProps on User {\n  id\n  username\n}"): typeof import('./graphql').UserPropsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($options: UsernamePasswordInput!) {\n  login(options: $options) {\n    user {\n      ...UserProps\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"): typeof import('./graphql').LoginDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): typeof import('./graphql').LogoutDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($username: String!, $password: String!) {\n  register(options: {username: $username, password: $password}) {\n    user {\n      ...UserProps\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"): typeof import('./graphql').RegisterDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    ...UserProps\n  }\n}"): typeof import('./graphql').MeDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
