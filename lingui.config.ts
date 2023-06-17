import type { LinguiConfig } from "@lingui/conf"

import {formatter} from "@lingui/format-po"
const config: LinguiConfig = {
  locales: ["en", "ru"],
  catalogs: [{
    path: "src/locales/{locale}",
    include: ["src"]
  }],
  format: formatter({ printLinguiId: true, lineNumbers: true, origins: true })
}

export default config
