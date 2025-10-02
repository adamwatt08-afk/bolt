/*
  # Create Scan Jobs and File Shares Tables

  ## Summary
  Creates tables to manage file share scanning jobs, including job configuration,
  scheduling, monitoring statistics, and detected issues like mirrored shares
  and access denied locations.

  1. New Tables
    - `scan_jobs`
      - `id` (uuid, primary key)
      - `job_name` (text, required) - User-defined name for the scan job
      - `status` (text) - Job status: pending, running, completed, failed, scheduled
      - `file_shares` (text[]) - Array of file share paths to scan
      - `scan_speed` (numeric) - Files per second scan speed
      - `total_files` (integer) - Total number of files discovered
      - `scanned_files` (integer) - Number of files scanned so far
      - `total_size` (bigint) - Total size in bytes
      - `scanned_size` (bigint) - Size scanned so far in bytes
      - `mirrored_shares` (jsonb) - Detected mirrored share information
      - `access_denied_shares` (text[]) - Shares with access issues
      - `error_message` (text) - Error details if job failed
      - `started_at` (timestamptz) - When scan started
      - `completed_at` (timestamptz) - When scan completed
      - `created_by` (uuid, required) - User who created the job
      - `created_at` (timestamptz) - When job was created

    - `scan_schedules`
      - `id` (uuid, primary key)
      - `job_name` (text, required) - Name for scheduled scan
      - `file_shares` (text[]) - File shares to scan
      - `schedule_type` (text) - Frequency: daily, weekly, monthly, custom
      - `schedule_config` (jsonb) - Cron expression or schedule details
      - `enabled` (boolean) - Whether schedule is active
      - `last_run` (timestamptz) - Last execution time
      - `next_run` (timestamptz) - Next scheduled execution
      - `created_by` (uuid, required)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Users can only view and manage their own jobs and schedules
    - Policies enforce authenticated access and ownership checks

  3. Important Notes
    - Jobs track real-time scanning progress and statistics
    - Mirrored shares stored as JSONB for flexible detection data
    - Access denied shares tracked separately for reporting
    - Schedules support flexible timing configurations
    - All timestamps use timestamptz for timezone awareness
*/

CREATE TABLE IF NOT EXISTS scan_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_name text NOT NULL,
  status text DEFAULT 'pending',
  file_shares text[] DEFAULT '{}',
  scan_speed numeric DEFAULT 0,
  total_files integer DEFAULT 0,
  scanned_files integer DEFAULT 0,
  total_size bigint DEFAULT 0,
  scanned_size bigint DEFAULT 0,
  mirrored_shares jsonb DEFAULT '[]'::jsonb,
  access_denied_shares text[] DEFAULT '{}',
  error_message text,
  started_at timestamptz,
  completed_at timestamptz,
  created_by uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS scan_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_name text NOT NULL,
  file_shares text[] DEFAULT '{}',
  schedule_type text DEFAULT 'weekly',
  schedule_config jsonb DEFAULT '{}'::jsonb,
  enabled boolean DEFAULT true,
  last_run timestamptz,
  next_run timestamptz,
  created_by uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE scan_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scan jobs"
  ON scan_jobs FOR SELECT
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create scan jobs"
  ON scan_jobs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own scan jobs"
  ON scan_jobs FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete own scan jobs"
  ON scan_jobs FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Users can view own scan schedules"
  ON scan_schedules FOR SELECT
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create scan schedules"
  ON scan_schedules FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own scan schedules"
  ON scan_schedules FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete own scan schedules"
  ON scan_schedules FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);
