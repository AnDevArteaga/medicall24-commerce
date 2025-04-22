export interface TermBlock {
    type: "title" | "paragraph" | "grid";
    content?: string;
    items?: { ciudad: string; departamento: string }[];
    link?: { label: string; href: string };
}