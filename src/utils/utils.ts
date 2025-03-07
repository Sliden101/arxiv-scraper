export interface Dictionary<T> {
    [key: string] : T;
}

export function addEntry(dict: Dictionary<string>, key: string, value: string): void {
    dict[key] = value;
}

export interface Details {
    title: string,
    date: string,
    subject: string,
    abstract: string,
    authors: Dictionary<string>,
    pdfLink: string,
}
