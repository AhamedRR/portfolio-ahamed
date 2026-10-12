/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms public access key for the contact form (client-side, public by design) */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
