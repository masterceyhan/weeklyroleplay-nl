type TebexJsConfig = {
  ident: string
  theme?: "dark" | "light"
  colors?: {
    name?: string
    color?: string
  }[]
}

type TebexJs = {
  events: {
    OPEN: string
    CLOSE: string
    PAYMENT_COMPLETE: string
    PAYMENT_ERROR: string
  }
  checkout: {
    init: (config: TebexJsConfig) => void
    on: (event: string, callback: (event) => void) => void
    launch: () => void
  }
}

interface Window {
  Tebex: TebexJs
}
