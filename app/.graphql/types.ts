export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends Record<string, unknown>, K extends keyof T> = Partial<Record<K, never>>;
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Dimension: { input: any; output: any; }
  HexColor: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Quality: { input: any; output: any; }
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Maybe<Asset>[];
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AssetFilter = {
  AND?: InputMaybe<InputMaybe<AssetFilter>[]>;
  OR?: InputMaybe<InputMaybe<AssetFilter>[]>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentType_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentType_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  contentType_not?: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileName_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fileName_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  fileName_not?: InputMaybe<Scalars['String']['input']>;
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  height?: InputMaybe<Scalars['Int']['input']>;
  height_exists?: InputMaybe<Scalars['Boolean']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<InputMaybe<Scalars['Int']['input']>[]>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<InputMaybe<Scalars['Int']['input']>[]>;
  size?: InputMaybe<Scalars['Int']['input']>;
  size_exists?: InputMaybe<Scalars['Boolean']['input']>;
  size_gt?: InputMaybe<Scalars['Int']['input']>;
  size_gte?: InputMaybe<Scalars['Int']['input']>;
  size_in?: InputMaybe<InputMaybe<Scalars['Int']['input']>[]>;
  size_lt?: InputMaybe<Scalars['Int']['input']>;
  size_lte?: InputMaybe<Scalars['Int']['input']>;
  size_not?: InputMaybe<Scalars['Int']['input']>;
  size_not_in?: InputMaybe<InputMaybe<Scalars['Int']['input']>[]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  width?: InputMaybe<Scalars['Int']['input']>;
  width_exists?: InputMaybe<Scalars['Boolean']['input']>;
  width_gt?: InputMaybe<Scalars['Int']['input']>;
  width_gte?: InputMaybe<Scalars['Int']['input']>;
  width_in?: InputMaybe<InputMaybe<Scalars['Int']['input']>[]>;
  width_lt?: InputMaybe<Scalars['Int']['input']>;
  width_lte?: InputMaybe<Scalars['Int']['input']>;
  width_not?: InputMaybe<Scalars['Int']['input']>;
  width_not_in?: InputMaybe<InputMaybe<Scalars['Int']['input']>[]>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  bookCollection?: Maybe<BookCollection>;
  entryCollection?: Maybe<EntryCollection>;
  metaCollection?: Maybe<MetaCollection>;
  postCollection?: Maybe<PostCollection>;
  profileCollection?: Maybe<ProfileCollection>;
};


export type AssetLinkingCollectionsBookCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<AssetLinkingCollectionsBookCollectionOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsMetaCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<AssetLinkingCollectionsMetaCollectionOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<AssetLinkingCollectionsPostCollectionOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsProfileCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<AssetLinkingCollectionsProfileCollectionOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum AssetLinkingCollectionsBookCollectionOrder {
  ColorAsc = 'color_ASC',
  ColorDesc = 'color_DESC',
  PromotionalColorAsc = 'promotionalColor_ASC',
  PromotionalColorDesc = 'promotionalColor_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TaglineAsc = 'tagline_ASC',
  TaglineDesc = 'tagline_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum AssetLinkingCollectionsMetaCollectionOrder {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  KeywordsAsc = 'keywords_ASC',
  KeywordsDesc = 'keywords_DESC',
  PathAsc = 'path_ASC',
  PathDesc = 'path_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum AssetLinkingCollectionsPostCollectionOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum AssetLinkingCollectionsProfileCollectionOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** Novelas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/book) */
export type Book = Entry & {
  __typename?: 'Book';
  checkoutCollection?: Maybe<BookCheckoutCollection>;
  color?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  cover?: Maybe<Asset>;
  linkedFrom?: Maybe<BookLinkingCollections>;
  promotional?: Maybe<Asset>;
  promotionalColor?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  series?: Maybe<Series>;
  slug?: Maybe<Scalars['String']['output']>;
  synopsis?: Maybe<BookSynopsis>;
  sys: Sys;
  tagline?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Novelas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/book) */
export type BookCheckoutCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<BookCheckoutCollectionOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LinkFilter>;
};


/** Novelas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/book) */
export type BookColorArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Novelas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/book) */
export type BookCoverArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Novelas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/book) */
export type BookLinkedFromArgs = {
  allowedLocales?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};


/** Novelas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/book) */
export type BookPromotionalArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Novelas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/book) */
export type BookPromotionalColorArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Novelas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/book) */
export type BookPublishedAtArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Novelas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/book) */
export type BookSeriesArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SeriesFilter>;
};


/** Novelas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/book) */
export type BookSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Novelas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/book) */
export type BookSynopsisArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Novelas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/book) */
export type BookTaglineArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Novelas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/book) */
export type BookTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type BookCheckoutCollection = {
  __typename?: 'BookCheckoutCollection';
  items: Maybe<Link>[];
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum BookCheckoutCollectionOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

export type BookCollection = {
  __typename?: 'BookCollection';
  items: Maybe<Book>[];
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type BookFilter = {
  AND?: InputMaybe<InputMaybe<BookFilter>[]>;
  OR?: InputMaybe<InputMaybe<BookFilter>[]>;
  checkout?: InputMaybe<CfLinkNestedFilter>;
  checkoutCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  color_contains?: InputMaybe<Scalars['String']['input']>;
  color_exists?: InputMaybe<Scalars['Boolean']['input']>;
  color_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  color_not?: InputMaybe<Scalars['String']['input']>;
  color_not_contains?: InputMaybe<Scalars['String']['input']>;
  color_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  cover_exists?: InputMaybe<Scalars['Boolean']['input']>;
  promotionalColor?: InputMaybe<Scalars['String']['input']>;
  promotionalColor_contains?: InputMaybe<Scalars['String']['input']>;
  promotionalColor_exists?: InputMaybe<Scalars['Boolean']['input']>;
  promotionalColor_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  promotionalColor_not?: InputMaybe<Scalars['String']['input']>;
  promotionalColor_not_contains?: InputMaybe<Scalars['String']['input']>;
  promotionalColor_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  promotional_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in?: InputMaybe<InputMaybe<Scalars['DateTime']['input']>[]>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in?: InputMaybe<InputMaybe<Scalars['DateTime']['input']>[]>;
  series?: InputMaybe<CfSeriesNestedFilter>;
  series_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  synopsis_contains?: InputMaybe<Scalars['String']['input']>;
  synopsis_exists?: InputMaybe<Scalars['Boolean']['input']>;
  synopsis_not_contains?: InputMaybe<Scalars['String']['input']>;
  sys?: InputMaybe<SysFilter>;
  tagline?: InputMaybe<Scalars['String']['input']>;
  tagline_contains?: InputMaybe<Scalars['String']['input']>;
  tagline_exists?: InputMaybe<Scalars['Boolean']['input']>;
  tagline_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  tagline_not?: InputMaybe<Scalars['String']['input']>;
  tagline_not_contains?: InputMaybe<Scalars['String']['input']>;
  tagline_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};

export type BookLinkingCollections = {
  __typename?: 'BookLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  seriesCollection?: Maybe<SeriesCollection>;
};


export type BookLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type BookLinkingCollectionsSeriesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<BookLinkingCollectionsSeriesCollectionOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum BookLinkingCollectionsSeriesCollectionOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum BookOrder {
  ColorAsc = 'color_ASC',
  ColorDesc = 'color_DESC',
  PromotionalColorAsc = 'promotionalColor_ASC',
  PromotionalColorDesc = 'promotionalColor_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TaglineAsc = 'tagline_ASC',
  TaglineDesc = 'tagline_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type BookSynopsis = {
  __typename?: 'BookSynopsis';
  json: Scalars['JSON']['output'];
  links: BookSynopsisLinks;
};

export type BookSynopsisAssets = {
  __typename?: 'BookSynopsisAssets';
  block: Maybe<Asset>[];
  hyperlink: Maybe<Asset>[];
};

export type BookSynopsisEntries = {
  __typename?: 'BookSynopsisEntries';
  block: Maybe<Entry>[];
  hyperlink: Maybe<Entry>[];
  inline: Maybe<Entry>[];
};

export type BookSynopsisLinks = {
  __typename?: 'BookSynopsisLinks';
  assets: BookSynopsisAssets;
  entries: BookSynopsisEntries;
  resources: BookSynopsisResources;
};

export type BookSynopsisResources = {
  __typename?: 'BookSynopsisResources';
  block: ResourceLink[];
};

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Maybe<ContentfulTag>[];
};

export type ContentfulMetadataFilter = {
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  id_contains_none?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  id_contains_some?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Maybe<Entry>[];
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EntryFilter = {
  AND?: InputMaybe<InputMaybe<EntryFilter>[]>;
  OR?: InputMaybe<InputMaybe<EntryFilter>[]>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageFormat {
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']['input']>;
};

/** Enlaces. Esta entidad es multi-propósito. No hace falta crear los enlaces con antelación, la mayor parte de las veces se pueden crear dentro de las otras entidades. [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/link) */
export type Link = Entry & {
  __typename?: 'Link';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<LinkLinkingCollections>;
  name?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  url?: Maybe<Scalars['String']['output']>;
};


/** Enlaces. Esta entidad es multi-propósito. No hace falta crear los enlaces con antelación, la mayor parte de las veces se pueden crear dentro de las otras entidades. [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/link) */
export type LinkLinkedFromArgs = {
  allowedLocales?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};


/** Enlaces. Esta entidad es multi-propósito. No hace falta crear los enlaces con antelación, la mayor parte de las veces se pueden crear dentro de las otras entidades. [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/link) */
export type LinkNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Enlaces. Esta entidad es multi-propósito. No hace falta crear los enlaces con antelación, la mayor parte de las veces se pueden crear dentro de las otras entidades. [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/link) */
export type LinkUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type LinkCollection = {
  __typename?: 'LinkCollection';
  items: Maybe<Link>[];
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type LinkFilter = {
  AND?: InputMaybe<InputMaybe<LinkFilter>[]>;
  OR?: InputMaybe<InputMaybe<LinkFilter>[]>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  sys?: InputMaybe<SysFilter>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};

export type LinkLinkingCollections = {
  __typename?: 'LinkLinkingCollections';
  bookCollection?: Maybe<BookCollection>;
  entryCollection?: Maybe<EntryCollection>;
  profileCollection?: Maybe<ProfileCollection>;
};


export type LinkLinkingCollectionsBookCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<LinkLinkingCollectionsBookCollectionOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type LinkLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type LinkLinkingCollectionsProfileCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<LinkLinkingCollectionsProfileCollectionOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum LinkLinkingCollectionsBookCollectionOrder {
  ColorAsc = 'color_ASC',
  ColorDesc = 'color_DESC',
  PromotionalColorAsc = 'promotionalColor_ASC',
  PromotionalColorDesc = 'promotionalColor_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TaglineAsc = 'tagline_ASC',
  TaglineDesc = 'tagline_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum LinkLinkingCollectionsProfileCollectionOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum LinkOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

/** Propiedades SEO. En caso de necesitar sobreescribir alguna URL, esta entidad permite generar nuevas propiedades SEO para una página en concreto. [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/meta) */
export type Meta = Entry & {
  __typename?: 'Meta';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Asset>;
  keywords?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<MetaLinkingCollections>;
  path?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** Propiedades SEO. En caso de necesitar sobreescribir alguna URL, esta entidad permite generar nuevas propiedades SEO para una página en concreto. [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/meta) */
export type MetaDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Propiedades SEO. En caso de necesitar sobreescribir alguna URL, esta entidad permite generar nuevas propiedades SEO para una página en concreto. [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/meta) */
export type MetaImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Propiedades SEO. En caso de necesitar sobreescribir alguna URL, esta entidad permite generar nuevas propiedades SEO para una página en concreto. [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/meta) */
export type MetaKeywordsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Propiedades SEO. En caso de necesitar sobreescribir alguna URL, esta entidad permite generar nuevas propiedades SEO para una página en concreto. [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/meta) */
export type MetaLinkedFromArgs = {
  allowedLocales?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};


/** Propiedades SEO. En caso de necesitar sobreescribir alguna URL, esta entidad permite generar nuevas propiedades SEO para una página en concreto. [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/meta) */
export type MetaPathArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Propiedades SEO. En caso de necesitar sobreescribir alguna URL, esta entidad permite generar nuevas propiedades SEO para una página en concreto. [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/meta) */
export type MetaTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type MetaCollection = {
  __typename?: 'MetaCollection';
  items: Maybe<Meta>[];
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MetaFilter = {
  AND?: InputMaybe<InputMaybe<MetaFilter>[]>;
  OR?: InputMaybe<InputMaybe<MetaFilter>[]>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  keywords_contains?: InputMaybe<Scalars['String']['input']>;
  keywords_exists?: InputMaybe<Scalars['Boolean']['input']>;
  keywords_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  keywords_not?: InputMaybe<Scalars['String']['input']>;
  keywords_not_contains?: InputMaybe<Scalars['String']['input']>;
  keywords_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_contains?: InputMaybe<Scalars['String']['input']>;
  path_exists?: InputMaybe<Scalars['Boolean']['input']>;
  path_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  path_not?: InputMaybe<Scalars['String']['input']>;
  path_not_contains?: InputMaybe<Scalars['String']['input']>;
  path_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};

export type MetaLinkingCollections = {
  __typename?: 'MetaLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type MetaLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum MetaOrder {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  KeywordsAsc = 'keywords_ASC',
  KeywordsDesc = 'keywords_DESC',
  PathAsc = 'path_ASC',
  PathDesc = 'path_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Blog [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/post) */
export type Post = Entry & {
  __typename?: 'Post';
  content?: Maybe<PostContent>;
  contentfulMetadata: ContentfulMetadata;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<PostLinkingCollections>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** Blog [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/post) */
export type PostContentArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/post) */
export type PostImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Blog [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/post) */
export type PostLinkedFromArgs = {
  allowedLocales?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};


/** Blog [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/post) */
export type PostSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/post) */
export type PostTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type PostCollection = {
  __typename?: 'PostCollection';
  items: Maybe<Post>[];
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PostContent = {
  __typename?: 'PostContent';
  json: Scalars['JSON']['output'];
  links: PostContentLinks;
};

export type PostContentAssets = {
  __typename?: 'PostContentAssets';
  block: Maybe<Asset>[];
  hyperlink: Maybe<Asset>[];
};

export type PostContentEntries = {
  __typename?: 'PostContentEntries';
  block: Maybe<Entry>[];
  hyperlink: Maybe<Entry>[];
  inline: Maybe<Entry>[];
};

export type PostContentLinks = {
  __typename?: 'PostContentLinks';
  assets: PostContentAssets;
  entries: PostContentEntries;
  resources: PostContentResources;
};

export type PostContentResources = {
  __typename?: 'PostContentResources';
  block: ResourceLink[];
};

export type PostFilter = {
  AND?: InputMaybe<InputMaybe<PostFilter>[]>;
  OR?: InputMaybe<InputMaybe<PostFilter>[]>;
  content_contains?: InputMaybe<Scalars['String']['input']>;
  content_exists?: InputMaybe<Scalars['Boolean']['input']>;
  content_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};

export type PostLinkingCollections = {
  __typename?: 'PostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type PostLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum PostOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Website [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/profile) */
export type Profile = Entry & {
  __typename?: 'Profile';
  about?: Maybe<ProfileAbout>;
  avatar?: Maybe<Asset>;
  books?: Maybe<Asset>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ProfileLinkingCollections>;
  name?: Maybe<Scalars['String']['output']>;
  socialCollection?: Maybe<ProfileSocialCollection>;
  sys: Sys;
};


/** Website [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/profile) */
export type ProfileAboutArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Website [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/profile) */
export type ProfileAvatarArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Website [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/profile) */
export type ProfileBooksArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Website [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/profile) */
export type ProfileLinkedFromArgs = {
  allowedLocales?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};


/** Website [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/profile) */
export type ProfileNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Website [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/profile) */
export type ProfileSocialCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<ProfileSocialCollectionOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LinkFilter>;
};

export type ProfileAbout = {
  __typename?: 'ProfileAbout';
  json: Scalars['JSON']['output'];
  links: ProfileAboutLinks;
};

export type ProfileAboutAssets = {
  __typename?: 'ProfileAboutAssets';
  block: Maybe<Asset>[];
  hyperlink: Maybe<Asset>[];
};

export type ProfileAboutEntries = {
  __typename?: 'ProfileAboutEntries';
  block: Maybe<Entry>[];
  hyperlink: Maybe<Entry>[];
  inline: Maybe<Entry>[];
};

export type ProfileAboutLinks = {
  __typename?: 'ProfileAboutLinks';
  assets: ProfileAboutAssets;
  entries: ProfileAboutEntries;
  resources: ProfileAboutResources;
};

export type ProfileAboutResources = {
  __typename?: 'ProfileAboutResources';
  block: ResourceLink[];
};

export type ProfileCollection = {
  __typename?: 'ProfileCollection';
  items: Maybe<Profile>[];
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ProfileFilter = {
  AND?: InputMaybe<InputMaybe<ProfileFilter>[]>;
  OR?: InputMaybe<InputMaybe<ProfileFilter>[]>;
  about_contains?: InputMaybe<Scalars['String']['input']>;
  about_exists?: InputMaybe<Scalars['Boolean']['input']>;
  about_not_contains?: InputMaybe<Scalars['String']['input']>;
  avatar_exists?: InputMaybe<Scalars['Boolean']['input']>;
  books_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  social?: InputMaybe<CfLinkNestedFilter>;
  socialCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type ProfileLinkingCollections = {
  __typename?: 'ProfileLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ProfileLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum ProfileOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ProfileSocialCollection = {
  __typename?: 'ProfileSocialCollection';
  items: Maybe<Link>[];
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum ProfileSocialCollectionOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

export type Query = {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  book?: Maybe<Book>;
  bookCollection?: Maybe<BookCollection>;
  entryCollection?: Maybe<EntryCollection>;
  link?: Maybe<Link>;
  linkCollection?: Maybe<LinkCollection>;
  meta?: Maybe<Meta>;
  metaCollection?: Maybe<MetaCollection>;
  post?: Maybe<Post>;
  postCollection?: Maybe<PostCollection>;
  profile?: Maybe<Profile>;
  profileCollection?: Maybe<ProfileCollection>;
  series?: Maybe<Series>;
  seriesCollection?: Maybe<SeriesCollection>;
};


export type QueryAssetArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<AssetOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryBookArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryBookCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<BookOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BookFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<EntryOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryLinkArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryLinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<LinkOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LinkFilter>;
};


export type QueryMetaArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryMetaCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<MetaOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MetaFilter>;
};


export type QueryPostArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<PostOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostFilter>;
};


export type QueryProfileArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProfileCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<ProfileOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProfileFilter>;
};


export type QuerySeriesArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySeriesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<SeriesOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SeriesFilter>;
};

export type ResourceLink = {
  __typename?: 'ResourceLink';
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: 'ResourceSys';
  linkType: Scalars['String']['output'];
  type: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

/** Sagas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/series) */
export type Series = Entry & {
  __typename?: 'Series';
  booksCollection?: Maybe<SeriesBooksCollection>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<SeriesLinkingCollections>;
  plot?: Maybe<SeriesPlot>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** Sagas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/series) */
export type SeriesBooksCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<SeriesBooksCollectionOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BookFilter>;
};


/** Sagas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/series) */
export type SeriesLinkedFromArgs = {
  allowedLocales?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};


/** Sagas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/series) */
export type SeriesPlotArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Sagas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/series) */
export type SeriesSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Sagas [See type definition](https://app.contentful.com/spaces/v1kazl7nd6vv/content_types/series) */
export type SeriesTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type SeriesBooksCollection = {
  __typename?: 'SeriesBooksCollection';
  items: Maybe<Book>[];
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum SeriesBooksCollectionOrder {
  ColorAsc = 'color_ASC',
  ColorDesc = 'color_DESC',
  PromotionalColorAsc = 'promotionalColor_ASC',
  PromotionalColorDesc = 'promotionalColor_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TaglineAsc = 'tagline_ASC',
  TaglineDesc = 'tagline_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type SeriesCollection = {
  __typename?: 'SeriesCollection';
  items: Maybe<Series>[];
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SeriesFilter = {
  AND?: InputMaybe<InputMaybe<SeriesFilter>[]>;
  OR?: InputMaybe<InputMaybe<SeriesFilter>[]>;
  books?: InputMaybe<CfBookNestedFilter>;
  booksCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  plot_contains?: InputMaybe<Scalars['String']['input']>;
  plot_exists?: InputMaybe<Scalars['Boolean']['input']>;
  plot_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};

export type SeriesLinkingCollections = {
  __typename?: 'SeriesLinkingCollections';
  bookCollection?: Maybe<BookCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type SeriesLinkingCollectionsBookCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<InputMaybe<SeriesLinkingCollectionsBookCollectionOrder>[]>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type SeriesLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum SeriesLinkingCollectionsBookCollectionOrder {
  ColorAsc = 'color_ASC',
  ColorDesc = 'color_DESC',
  PromotionalColorAsc = 'promotionalColor_ASC',
  PromotionalColorDesc = 'promotionalColor_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TaglineAsc = 'tagline_ASC',
  TaglineDesc = 'tagline_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum SeriesOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type SeriesPlot = {
  __typename?: 'SeriesPlot';
  json: Scalars['JSON']['output'];
  links: SeriesPlotLinks;
};

export type SeriesPlotAssets = {
  __typename?: 'SeriesPlotAssets';
  block: Maybe<Asset>[];
  hyperlink: Maybe<Asset>[];
};

export type SeriesPlotEntries = {
  __typename?: 'SeriesPlotEntries';
  block: Maybe<Entry>[];
  hyperlink: Maybe<Entry>[];
  inline: Maybe<Entry>[];
};

export type SeriesPlotLinks = {
  __typename?: 'SeriesPlotLinks';
  assets: SeriesPlotAssets;
  entries: SeriesPlotEntries;
  resources: SeriesPlotResources;
};

export type SeriesPlotResources = {
  __typename?: 'SeriesPlotResources';
  block: ResourceLink[];
};

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publishedVersion?: Maybe<Scalars['Int']['output']>;
  spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_in?: InputMaybe<InputMaybe<Scalars['DateTime']['input']>[]>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not_in?: InputMaybe<InputMaybe<Scalars['DateTime']['input']>[]>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  id_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in?: InputMaybe<InputMaybe<Scalars['DateTime']['input']>[]>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in?: InputMaybe<InputMaybe<Scalars['DateTime']['input']>[]>;
  publishedVersion?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_in?: InputMaybe<InputMaybe<Scalars['Float']['input']>[]>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not_in?: InputMaybe<InputMaybe<Scalars['Float']['input']>[]>;
};

export type CfBookNestedFilter = {
  AND?: InputMaybe<InputMaybe<CfBookNestedFilter>[]>;
  OR?: InputMaybe<InputMaybe<CfBookNestedFilter>[]>;
  checkoutCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  color_contains?: InputMaybe<Scalars['String']['input']>;
  color_exists?: InputMaybe<Scalars['Boolean']['input']>;
  color_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  color_not?: InputMaybe<Scalars['String']['input']>;
  color_not_contains?: InputMaybe<Scalars['String']['input']>;
  color_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  cover_exists?: InputMaybe<Scalars['Boolean']['input']>;
  promotionalColor?: InputMaybe<Scalars['String']['input']>;
  promotionalColor_contains?: InputMaybe<Scalars['String']['input']>;
  promotionalColor_exists?: InputMaybe<Scalars['Boolean']['input']>;
  promotionalColor_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  promotionalColor_not?: InputMaybe<Scalars['String']['input']>;
  promotionalColor_not_contains?: InputMaybe<Scalars['String']['input']>;
  promotionalColor_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  promotional_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in?: InputMaybe<InputMaybe<Scalars['DateTime']['input']>[]>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in?: InputMaybe<InputMaybe<Scalars['DateTime']['input']>[]>;
  series_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  synopsis_contains?: InputMaybe<Scalars['String']['input']>;
  synopsis_exists?: InputMaybe<Scalars['Boolean']['input']>;
  synopsis_not_contains?: InputMaybe<Scalars['String']['input']>;
  sys?: InputMaybe<SysFilter>;
  tagline?: InputMaybe<Scalars['String']['input']>;
  tagline_contains?: InputMaybe<Scalars['String']['input']>;
  tagline_exists?: InputMaybe<Scalars['Boolean']['input']>;
  tagline_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  tagline_not?: InputMaybe<Scalars['String']['input']>;
  tagline_not_contains?: InputMaybe<Scalars['String']['input']>;
  tagline_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};

export type CfLinkNestedFilter = {
  AND?: InputMaybe<InputMaybe<CfLinkNestedFilter>[]>;
  OR?: InputMaybe<InputMaybe<CfLinkNestedFilter>[]>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  sys?: InputMaybe<SysFilter>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};

export type CfSeriesNestedFilter = {
  AND?: InputMaybe<InputMaybe<CfSeriesNestedFilter>[]>;
  OR?: InputMaybe<InputMaybe<CfSeriesNestedFilter>[]>;
  booksCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  plot_contains?: InputMaybe<Scalars['String']['input']>;
  plot_exists?: InputMaybe<Scalars['Boolean']['input']>;
  plot_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<InputMaybe<Scalars['String']['input']>[]>;
};

export type AssetsQueryVariables = Exact<{
  preview?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type AssetsQuery = { __typename?: 'Query', assetCollection?: { __typename?: 'AssetCollection', items: ({ __typename?: 'Asset', title?: string | null, url?: string | null } | null)[] } | null };

export type BookFragment = { __typename?: 'Book', color?: string | null, promotionalColor?: string | null, publishedAt?: any | null, slug?: string | null, tagline?: string | null, title?: string | null, checkoutCollection?: { __typename?: 'BookCheckoutCollection', items: ({ __typename?: 'Link', name?: string | null, url?: string | null } | null)[] } | null, cover?: { __typename?: 'Asset', description?: string | null, url?: string | null } | null, promotional?: { __typename?: 'Asset', description?: string | null, url?: string | null } | null, series?: { __typename?: 'Series', title?: string | null } | null, synopsis?: { __typename?: 'BookSynopsis', json: any } | null };

export type BooksQueryVariables = Exact<{
  index?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type BooksQuery = { __typename?: 'Query', bookCollection?: { __typename?: 'BookCollection', items: ({ __typename?: 'Book', color?: string | null, promotionalColor?: string | null, publishedAt?: any | null, slug?: string | null, tagline?: string | null, title?: string | null, checkoutCollection?: { __typename?: 'BookCheckoutCollection', items: ({ __typename?: 'Link', name?: string | null, url?: string | null } | null)[] } | null, cover?: { __typename?: 'Asset', description?: string | null, url?: string | null } | null, promotional?: { __typename?: 'Asset', description?: string | null, url?: string | null } | null, series?: { __typename?: 'Series', title?: string | null } | null, synopsis?: { __typename?: 'BookSynopsis', json: any } | null } | null)[] } | null };

export type MetaQueryVariables = Exact<{
  path: Scalars['String']['input'];
  preview?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type MetaQuery = { __typename?: 'Query', metaCollection?: { __typename?: 'MetaCollection', items: ({ __typename?: 'Meta', description?: string | null, keywords?: string | null, title?: string | null, image?: { __typename?: 'Asset', url?: string | null } | null } | null)[] } | null };

export type PostContentLinksFragment = { __typename?: 'PostContentLinks', assets: { __typename?: 'PostContentAssets', block: ({ __typename?: 'Asset', contentType?: string | null, description?: string | null, height?: number | null, title?: string | null, url?: string | null, width?: number | null, sys: { __typename?: 'Sys', id: string } } | null)[] }, entries: { __typename?: 'PostContentEntries', block: ({ __typename: 'Book', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Link', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Meta', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Post', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Profile', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Series', sys: { __typename?: 'Sys', id: string } } | null)[] } };

export type PostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type PostsQuery = { __typename?: 'Query', postCollection?: { __typename?: 'PostCollection', items: ({ __typename?: 'Post', slug?: string | null, title?: string | null, sys: { __typename?: 'Sys', firstPublishedAt?: any | null, id: string, publishedAt?: any | null }, content?: { __typename?: 'PostContent', json: any, links: { __typename?: 'PostContentLinks', assets: { __typename?: 'PostContentAssets', block: ({ __typename?: 'Asset', contentType?: string | null, description?: string | null, height?: number | null, title?: string | null, url?: string | null, width?: number | null, sys: { __typename?: 'Sys', id: string } } | null)[] }, entries: { __typename?: 'PostContentEntries', block: ({ __typename: 'Book', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Link', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Meta', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Post', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Profile', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Series', sys: { __typename?: 'Sys', id: string } } | null)[] } } } | null, image?: { __typename?: 'Asset', url?: string | null } | null } | null)[] } | null };

export type AboutLinksFragment = { __typename?: 'ProfileAboutLinks', assets: { __typename?: 'ProfileAboutAssets', block: ({ __typename?: 'Asset', contentType?: string | null, description?: string | null, height?: number | null, title?: string | null, url?: string | null, width?: number | null, sys: { __typename?: 'Sys', id: string } } | null)[] }, entries: { __typename?: 'ProfileAboutEntries', block: ({ __typename: 'Book', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Link', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Meta', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Post', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Profile', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Series', sys: { __typename?: 'Sys', id: string } } | null)[] } };

export type ProfileQueryVariables = Exact<{
  preview?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ProfileQuery = { __typename?: 'Query', profileCollection?: { __typename?: 'ProfileCollection', items: ({ __typename?: 'Profile', name?: string | null, about?: { __typename?: 'ProfileAbout', json: any, links: { __typename?: 'ProfileAboutLinks', assets: { __typename?: 'ProfileAboutAssets', block: ({ __typename?: 'Asset', contentType?: string | null, description?: string | null, height?: number | null, title?: string | null, url?: string | null, width?: number | null, sys: { __typename?: 'Sys', id: string } } | null)[] }, entries: { __typename?: 'ProfileAboutEntries', block: ({ __typename: 'Book', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Link', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Meta', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Post', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Profile', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Series', sys: { __typename?: 'Sys', id: string } } | null)[] } } } | null, avatar?: { __typename?: 'Asset', url?: string | null } | null, books?: { __typename?: 'Asset', url?: string | null } | null, socialCollection?: { __typename?: 'ProfileSocialCollection', items: ({ __typename?: 'Link', name?: string | null, url?: string | null } | null)[] } | null } | null)[] } | null };
