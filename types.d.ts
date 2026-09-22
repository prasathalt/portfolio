declare module "*.jpg" {
  const value: any;
  export default value;
}
declare module "*.png" {
  const value: any;
  export default value;
}
declare module "*.webp" {
  const value: any;
  export default value;
}

declare module "next/link" {
  const Link: any;
  export default Link;
}

declare module "next/navigation" {
  export const usePathname: () => string;
}

declare module "next" {
  export type Metadata = any;
  export type NextConfig = any;
}
