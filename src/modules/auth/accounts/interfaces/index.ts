export interface PlatformsSchema {
  name: string;
  password: string;
}
export interface IAccounts {
  platforms: PlatformsSchema[];
  email: string;
}
