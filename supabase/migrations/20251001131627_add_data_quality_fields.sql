/*
  # Add Data Quality Tracking Fields

  1. Changes to `file_analysis` table
    - Add `is_corrupt` field to track corrupt/damaged files
    - Add `corruption_reason` field to store details about corruption
    - Add `data_age_category` field to categorize file age (recent, old, stale)
  
  2. Security
    - Existing RLS policies apply to new columns
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'file_analysis' AND column_name = 'is_corrupt'
  ) THEN
    ALTER TABLE file_analysis ADD COLUMN is_corrupt boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'file_analysis' AND column_name = 'corruption_reason'
  ) THEN
    ALTER TABLE file_analysis ADD COLUMN corruption_reason text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'file_analysis' AND column_name = 'data_age_category'
  ) THEN
    ALTER TABLE file_analysis ADD COLUMN data_age_category text;
  END IF;
END $$;