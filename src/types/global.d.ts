declare global {
  interface Window {
    versions: IVersion;
    darkMode: IDarkMode;
  }
}

export interface IVersion {
  node(): string;
  chrome(): string;
  electron(): string;
  ping(): Promise<string>;
}

interface IDarkMode {
  toggle(): Promise<string>;
  system(): Promise<string>;
}
