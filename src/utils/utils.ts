import { Category } from "./categories";

export interface Dictionary<T> {
    [key: string] : T;
}

export function addEntry(dict: Dictionary<string>, key: string, value: string): void {
    dict[key] = value;
}

export interface PaperObject {
    title: string,
    date: string,
    subject: string,
    abstract: string,
    authors: Dictionary<string>,
    pdfLink: string,
}

//Query Builder
export type Query = string;

export const and = (...queries: Query[]): Query => {
    return "(" + queries.join(' AND ') + ")";
}

export const or = (...queries: Query[]): Query => {
    return "(" + queries.join(' OR ') + ")";
}

export const not = (query: Query): Query => {
    return ` ANDNOT ${query}`;
};

export const title = (term: string): Query => {
    return `ti:"${encodeURIComponent(term)}"`
}

export const author = (name: string): Query => {
    return `au:"${encodeURIComponent(name)}"`
}

export const abstract = (term: string): Query => {
    return `abs:"${encodeURIComponent(term)}"`
}

export const comment = (comment: string): Query => {
    return `co:"${encodeURIComponent(comment)}"`
}

export const journalReference = (journal: string): Query => {
    return `jr:"${encodeURIComponent(journal)}"`
}

export const category = (category: Category): Query => {
    return `cat:"${encodeURIComponent(category)}"`
}

export const reportNumber = (report: string): Query => {
    return `rn: "${encodeURIComponent(report)}"`
}

export const all = (term: string): Query => {
    return `all:"${encodeURIComponent(term)}"`
}