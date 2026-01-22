export interface TermBlock {
    type: "title" | "subtitle" | "paragraph" | "list" | "ordered-list" | "grid" | "dash-list";
    content?: string;
    items?: string[] | GridItem[];
    link?: {
        label: string;
        href: string;
    };
}

export interface GridItem {
    ciudad: string;
    departamento: string;
}
