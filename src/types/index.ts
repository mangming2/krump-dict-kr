export interface KrumpInformation {
  id: number;
  type: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  reviewBy?: string;
  createdAt: string;
  parentId?: number | null;
  childrenId?: number[] | null;
}
