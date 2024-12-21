// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres"
import { payloadCloudPlugin } from "@payloadcms/payload-cloud"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { s3Storage } from "@payloadcms/storage-s3"
import path from "path"
import { buildConfig } from "payload"
import { fileURLToPath } from "url"
import sharp from "sharp"

import { Users } from "@/collections/Users"
import { Media } from "@/collections/Media"
import { Products } from "./collections/Products"
import { Settings } from "./collections/Settings"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products],
  globals: [Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    schemaName: "app",
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: true,
      },
      bucket: "weeklyroleplay",
      config: {
        region: "auto",
        endpoint:
          "https://cd19cfe093bf44dc33f185ea89124d46.r2.cloudflarestorage.com/weeklyroleplay",
        credentials: {
          accessKeyId: "b292e3204efcaccd2d8e90dcc0f77e51",
          secretAccessKey: "8d15aecf3671038a8d9fe98ea102d2e3c926d869ba90d4a54ad1d78135f37afb",
        },
      },
    }),
    // storage-adapter-placeholder
  ],
})
