import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeBlogPostFields {
    title?: EntryFieldTypes.Symbol;
    content?: EntryFieldTypes.RichText;
}

export type TypeBlogPostSkeleton = EntrySkeletonType<TypeBlogPostFields, "blogPost">;
export type TypeBlogPost<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;
