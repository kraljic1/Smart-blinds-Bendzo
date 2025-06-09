export interface CustomizationOption {
  id: string;
  name: string;
  textOnly?: boolean;
  info?: string;
  options: {
    id: string;
    name: string;
    image?: string;
    color?: string;
    price?: number;
  }[];
} 