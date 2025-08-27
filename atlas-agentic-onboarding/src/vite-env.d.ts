/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ANOTHER_KEY?: string
  // add more variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
