-- AddColumn formData to SentEmail
ALTER TABLE "SentEmail" ADD COLUMN IF NOT EXISTS "formData" JSONB;
