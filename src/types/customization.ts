export interface CustomizationValue {
  id: string;
  name: string;
  price: number;
}

export interface CustomizationOption {
  id: string;
  name: string;
  options: CustomizationValue[];
}

// Function to get customization options based on product type and ID
export type CustomizationOptionsFunction = (productId: string) => CustomizationOption[]; 