import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
export type DeepPartial<T> = {
 [P in keyof T]?: T[P] extends Array<infer U>
 ? Array<DeepPartial<U>>
 : T[P] extends ReadonlyArray<infer U>
 ? ReadonlyArray<DeepPartial<U>>
 : DeepPartial<T[P]>
 };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum Breed {
  Labrador = 'LABRADOR',
  Poodle = 'POODLE'
}

export type Dog = {
  __typename?: 'Dog';
  breed: Breed;
  id: Scalars['ID'];
  name: Scalars['String'];
  owner: Person;
  ownerId: Scalars['ID'];
};

export type Person = {
  __typename?: 'Person';
  dog?: Maybe<Dog>;
  dogId?: Maybe<Scalars['ID']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  dog?: Maybe<Dog>;
  dogs: Array<Dog>;
  people: Array<Person>;
  person?: Maybe<Person>;
};


export type QueryDogArgs = {
  id: Scalars['ID'];
};


export type QueryPersonArgs = {
  id: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars['Boolean']>>;
  Breed: ResolverTypeWrapper<DeepPartial<Breed>>;
  Dog: ResolverTypeWrapper<DeepPartial<Dog>>;
  ID: ResolverTypeWrapper<DeepPartial<Scalars['ID']>>;
  Person: ResolverTypeWrapper<DeepPartial<Person>>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<DeepPartial<Scalars['String']>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: DeepPartial<Scalars['Boolean']>;
  Dog: DeepPartial<Dog>;
  ID: DeepPartial<Scalars['ID']>;
  Person: DeepPartial<Person>;
  Query: {};
  String: DeepPartial<Scalars['String']>;
};

export type DogResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dog'] = ResolversParentTypes['Dog']> = {
  breed?: Resolver<ResolversTypes['Breed'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Person'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  dog?: Resolver<Maybe<ResolversTypes['Dog']>, ParentType, ContextType>;
  dogId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  dog?: Resolver<Maybe<ResolversTypes['Dog']>, ParentType, ContextType, RequireFields<QueryDogArgs, 'id'>>;
  dogs?: Resolver<Array<ResolversTypes['Dog']>, ParentType, ContextType>;
  people?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType>;
  person?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryPersonArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  Dog?: DogResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

