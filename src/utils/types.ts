export type NodeType = 'text' | 'image' | 'list' | 'page' | 'headings1' | 'headings2' | 'headings3';

export type NodeData = {
    id: string;
    type: NodeType;
    value: string;
};

export type Page = {
    id: string;
    slug: string;
    title: string;
    nodes: NodeData[];
    cover: string;
};
