export interface Divelog {
  username: string;
  name: string;
  year: Number;
  location?: string;
  depth?: Number;
  duration?: Number;
  comments?: string;
}

export const defaultDivelog = [
  {
    username: "",
    name: "",
    year: 2022,
  },
];
