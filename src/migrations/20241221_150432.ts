import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "app"."enum_products_vehicles_type" AS ENUM('car', 'boat', 'airplane');
  CREATE TABLE IF NOT EXISTS "app"."products_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" numeric NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"count" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "app"."products_vehicles" (
  	"_order" integer NOT NULL,
  	"_parent_id" numeric NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"model" varchar NOT NULL,
  	"type" "app"."enum_products_vehicles_type" NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "app"."settings_featured_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" numeric NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "app"."settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"donatie_goal" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "app"."products_items" ADD CONSTRAINT "products_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "app"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "app"."products_vehicles" ADD CONSTRAINT "products_vehicles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "app"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "app"."settings_featured_products" ADD CONSTRAINT "settings_featured_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "app"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "app"."settings_featured_products" ADD CONSTRAINT "settings_featured_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "app"."settings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "products_items_order_idx" ON "app"."products_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_items_parent_id_idx" ON "app"."products_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_vehicles_order_idx" ON "app"."products_vehicles" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_vehicles_parent_id_idx" ON "app"."products_vehicles" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "settings_featured_products_order_idx" ON "app"."settings_featured_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "settings_featured_products_parent_id_idx" ON "app"."settings_featured_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "settings_featured_products_product_idx" ON "app"."settings_featured_products" USING btree ("product_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "app"."products_items" CASCADE;
  DROP TABLE "app"."products_vehicles" CASCADE;
  DROP TABLE "app"."settings_featured_products" CASCADE;
  DROP TABLE "app"."settings" CASCADE;
  DROP TYPE "app"."enum_products_vehicles_type";`)
}
