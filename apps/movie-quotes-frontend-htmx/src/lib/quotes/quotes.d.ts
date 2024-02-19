import { type FastifyReply, type FastifyPluginAsync } from 'fastify'

type QuotesPlugin = FastifyPluginAsync<NonNullable<Quotes.QuotesOptions>>

declare module 'fastify' {
  interface GraphQLQueryOptions {
    query: string;
    headers: Record<string, string>;
    variables: Record<string, unknown>;
  }
  interface GraphQLClient {
    graphql<T>(GraphQLQuery): PromiseLike<T>;
  }
  interface ConfigureQuotes {
    async getHeaders(req: FastifyRequest, reply: FastifyReply): Promise<Record<string,string>>;
  }
  interface FastifyInstance {
    'quotes'
    : GraphQLClient;

    configureQuotes(opts: ConfigureQuotes): unknown
  }

  interface FastifyRequest {
    'quotes'
    : GraphQLClient;

  }
}

declare namespace quotes {
  export interface QuotesOptions {
    url: string
  }
  export interface Quote {
    'id'?: string;

    'quote'?: string;

    'saidBy'?: string;

    'createdAt'?: string;

    'likes'?: number;

    'movie'?: Movie;

  }
  export interface Movie {
    'id'?: string;

    'name'?: string;

    'quotes'?: Array<Quote>;

  }
  export interface QuotesCount {
    'total'?: number;

  }
  export interface MoviesCount {
    'total'?: number;

  }
  export interface QuoteDeleted {
    'id'?: string;

  }
  export interface MovieDeleted {
    'id'?: string;

  }
  export const quotes: QuotesPlugin;
  export { quotes as default };
}

declare function quotes(...params: Parameters<QuotesPlugin>): ReturnType<QuotesPlugin>;
export = quotes;
