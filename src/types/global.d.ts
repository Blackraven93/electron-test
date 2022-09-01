declare global {
  interface Window {
    versions: Sandbox
  }
}
export interface Sandbox {
  node(): string
  chrome(): string
  electron(): string
  ping(): Promise<string>
}