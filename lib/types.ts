//lib/types.ts
export type Tag = {
  id: number;
  name: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  link: string;
  github: string;
  sort_order: number;
  tags: Tag[];
  created_at: string;
};
