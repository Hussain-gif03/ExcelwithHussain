/*
# Excel Learning Platform Database Schema

## 1. Plain English Explanation
This migration creates the complete database structure for the Excel with Hussain learning platform.
It includes tables for user profiles, courses, modules, lessons, quizzes, progress tracking, and certificates.
The first registered user automatically becomes an admin.

## 2. New Tables

### profiles
- `id` (uuid, primary key, references auth.users)
- `username` (text, unique, not null)
- `email` (text, unique)
- `role` (user_role enum: 'student', 'admin', default: 'student')
- `created_at` (timestamptz, default: now())

### courses
- `id` (uuid, primary key)
- `title` (text, not null) - e.g., "Beginner Level", "Intermediate Level", "Advanced Level"
- `description` (text)
- `level` (integer, not null) - 1 for Beginner, 2 for Intermediate, 3 for Advanced
- `order_index` (integer, not null)
- `created_at` (timestamptz, default: now())

### modules
- `id` (uuid, primary key)
- `course_id` (uuid, references courses)
- `title` (text, not null)
- `description` (text)
- `order_index` (integer, not null)
- `created_at` (timestamptz, default: now())

### lessons
- `id` (uuid, primary key)
- `module_id` (uuid, references modules)
- `title` (text, not null)
- `content` (text, not null) - lesson content in markdown or HTML
- `video_url` (text) - optional video link
- `order_index` (integer, not null)
- `created_at` (timestamptz, default: now())

### quizzes
- `id` (uuid, primary key)
- `module_id` (uuid, references modules, unique)
- `title` (text, not null)
- `passing_score` (integer, not null, default: 70) - percentage required to pass
- `created_at` (timestamptz, default: now())

### quiz_questions
- `id` (uuid, primary key)
- `quiz_id` (uuid, references quizzes)
- `question` (text, not null)
- `options` (jsonb, not null) - array of answer options
- `correct_answer` (integer, not null) - index of correct option
- `order_index` (integer, not null)
- `created_at` (timestamptz, default: now())

### user_progress
- `id` (uuid, primary key)
- `user_id` (uuid, references profiles)
- `lesson_id` (uuid, references lessons)
- `completed` (boolean, default: false)
- `completed_at` (timestamptz)
- `created_at` (timestamptz, default: now())
- Unique constraint on (user_id, lesson_id)

### quiz_attempts
- `id` (uuid, primary key)
- `user_id` (uuid, references profiles)
- `quiz_id` (uuid, references quizzes)
- `score` (integer, not null) - percentage score
- `passed` (boolean, not null)
- `answers` (jsonb) - user's answers
- `created_at` (timestamptz, default: now())

### certificates
- `id` (uuid, primary key)
- `user_id` (uuid, references profiles, unique)
- `certificate_number` (text, unique, not null)
- `issued_at` (timestamptz, default: now())

## 3. Security
- Enable RLS on all tables
- Public read access for courses, modules, lessons, quizzes, quiz_questions
- Students can read their own progress, quiz attempts, and certificates
- Students can insert/update their own progress and quiz attempts
- Admins have full access to all tables
- Helper function `is_admin` to check admin role

## 4. Initial Data
- 3 courses (Beginner, Intermediate, Advanced) with sample modules
- Sample lessons and quizzes for demonstration

## 5. Notes
- First registered user becomes admin via trigger
- Certificate number format: EXCEL-{year}-{random}
- Quiz passing score default is 70%
*/

-- Create user role enum
CREATE TYPE user_role AS ENUM ('student', 'admin');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  email text UNIQUE,
  role user_role DEFAULT 'student'::user_role NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  level integer NOT NULL,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  video_url text,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES modules(id) ON DELETE CASCADE UNIQUE,
  title text NOT NULL,
  passing_score integer NOT NULL DEFAULT 70,
  created_at timestamptz DEFAULT now()
);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer integer NOT NULL,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  score integer NOT NULL,
  passed boolean NOT NULL,
  answers jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  certificate_number text UNIQUE NOT NULL,
  issued_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- Profiles policies
CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (role IS NOT DISTINCT FROM old.role);

-- Courses policies (public read, admin write)
CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage courses" ON courses
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Modules policies (public read, admin write)
CREATE POLICY "Anyone can view modules" ON modules
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage modules" ON modules
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Lessons policies (public read, admin write)
CREATE POLICY "Anyone can view lessons" ON lessons
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage lessons" ON lessons
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Quizzes policies (public read, admin write)
CREATE POLICY "Anyone can view quizzes" ON quizzes
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage quizzes" ON quizzes
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Quiz questions policies (public read, admin write)
CREATE POLICY "Anyone can view quiz questions" ON quiz_questions
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage quiz questions" ON quiz_questions
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- User progress policies
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all progress" ON user_progress
  FOR SELECT TO authenticated USING (is_admin(auth.uid()));

-- Quiz attempts policies
CREATE POLICY "Users can view own quiz attempts" ON quiz_attempts
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz attempts" ON quiz_attempts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all quiz attempts" ON quiz_attempts
  FOR SELECT TO authenticated USING (is_admin(auth.uid()));

-- Certificates policies
CREATE POLICY "Users can view own certificate" ON certificates
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage certificates" ON certificates
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Trigger to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
  new_username text;
BEGIN
  IF OLD IS DISTINCT FROM NULL AND OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL THEN
    SELECT COUNT(*) INTO user_count FROM profiles;
    
    -- Extract username from email (remove @miaoda.com)
    new_username := REPLACE(NEW.email, '@miaoda.com', '');
    
    INSERT INTO profiles (id, username, email, role)
    VALUES (
      NEW.id,
      new_username,
      NEW.email,
      CASE WHEN user_count = 0 THEN 'admin'::user_role ELSE 'student'::user_role END
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Insert initial course data
INSERT INTO courses (title, description, level, order_index) VALUES
('Beginner Level', 'Master the fundamentals of Microsoft Excel. Learn basic navigation, data entry, simple formulas, and essential formatting techniques.', 1, 1),
('Intermediate Level', 'Advance your Excel skills with complex formulas, data analysis tools, conditional formatting, and chart creation.', 2, 2),
('Advanced Level', 'Become an Excel expert with macros, pivot tables, advanced data visualization, and automation techniques.', 3, 3);

-- Insert sample modules for Beginner Level
INSERT INTO modules (course_id, title, description, order_index)
SELECT id, 'Getting Started with Excel', 'Introduction to Excel interface, workbooks, and worksheets', 1
FROM courses WHERE level = 1;

INSERT INTO modules (course_id, title, description, order_index)
SELECT id, 'Basic Formulas and Functions', 'Learn SUM, AVERAGE, COUNT, and basic arithmetic operations', 2
FROM courses WHERE level = 1;

INSERT INTO modules (course_id, title, description, order_index)
SELECT id, 'Cell Formatting and Styles', 'Format cells, apply styles, and create professional-looking spreadsheets', 3
FROM courses WHERE level = 1;

-- Insert sample modules for Intermediate Level
INSERT INTO modules (course_id, title, description, order_index)
SELECT id, 'Advanced Formulas', 'Master VLOOKUP, HLOOKUP, IF statements, and nested functions', 1
FROM courses WHERE level = 2;

INSERT INTO modules (course_id, title, description, order_index)
SELECT id, 'Data Analysis Tools', 'Use sorting, filtering, and data validation techniques', 2
FROM courses WHERE level = 2;

INSERT INTO modules (course_id, title, description, order_index)
SELECT id, 'Charts and Graphs', 'Create compelling visualizations with various chart types', 3
FROM courses WHERE level = 2;

-- Insert sample modules for Advanced Level
INSERT INTO modules (course_id, title, description, order_index)
SELECT id, 'Pivot Tables and Pivot Charts', 'Analyze large datasets with pivot tables and create dynamic reports', 1
FROM courses WHERE level = 3;

INSERT INTO modules (course_id, title, description, order_index)
SELECT id, 'Macros and VBA Basics', 'Automate repetitive tasks with macros and Visual Basic for Applications', 2
FROM courses WHERE level = 3;

INSERT INTO modules (course_id, title, description, order_index)
SELECT id, 'Advanced Data Visualization', 'Create dashboards, sparklines, and advanced chart techniques', 3
FROM courses WHERE level = 3;

-- Insert sample lessons for "Getting Started with Excel" module
INSERT INTO lessons (module_id, title, content, order_index)
SELECT id, 'Understanding the Excel Interface', 
'# Understanding the Excel Interface

Welcome to your first lesson! In this lesson, you will learn about the Excel interface and its key components.

## The Ribbon
The Ribbon is located at the top of the Excel window and contains tabs like Home, Insert, Page Layout, Formulas, Data, Review, and View. Each tab contains groups of related commands.

## The Quick Access Toolbar
Located above the Ribbon, this toolbar provides quick access to commonly used commands like Save, Undo, and Redo.

## The Formula Bar
The Formula Bar displays the contents of the active cell and allows you to enter or edit data and formulas.

## The Worksheet Area
This is where you enter and work with your data. It consists of rows (numbered) and columns (lettered).

## Practice Exercise
1. Open Excel and identify each component mentioned above
2. Click through different Ribbon tabs to see available commands
3. Try typing some text in a cell and observe it in the Formula Bar', 1
FROM modules WHERE title = 'Getting Started with Excel';

INSERT INTO lessons (module_id, title, content, order_index)
SELECT id, 'Working with Workbooks and Worksheets',
'# Working with Workbooks and Worksheets

Learn how to create, save, and manage Excel workbooks and worksheets.

## What is a Workbook?
A workbook is an Excel file that can contain multiple worksheets. Think of it as a binder that holds multiple pages.

## What is a Worksheet?
A worksheet is a single spreadsheet within a workbook. By default, Excel creates a new workbook with one worksheet.

## Creating a New Workbook
- Click File > New > Blank Workbook
- Or press Ctrl + N

## Adding Worksheets
- Click the + icon next to existing worksheet tabs
- Or right-click a worksheet tab and select Insert

## Renaming Worksheets
- Double-click the worksheet tab
- Type the new name and press Enter

## Practice Exercise
1. Create a new workbook
2. Add three worksheets
3. Rename them as "Budget", "Expenses", and "Summary"
4. Save the workbook with a meaningful name', 2
FROM modules WHERE title = 'Getting Started with Excel';

-- Insert a sample quiz for "Getting Started with Excel"
INSERT INTO quizzes (module_id, title, passing_score)
SELECT id, 'Getting Started Quiz', 70
FROM modules WHERE title = 'Getting Started with Excel';

-- Insert quiz questions
INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id, 
'What is the Ribbon in Excel?',
'["A toolbar at the bottom of the screen", "A set of tabs containing commands at the top of the window", "A type of chart", "A formula function"]'::jsonb,
1, 1
FROM quizzes WHERE title = 'Getting Started Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What is the default keyboard shortcut to create a new workbook?',
'["Ctrl + S", "Ctrl + N", "Ctrl + O", "Ctrl + W"]'::jsonb,
1, 2
FROM quizzes WHERE title = 'Getting Started Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Where can you see the contents of the active cell?',
'["The Status Bar", "The Quick Access Toolbar", "The Formula Bar", "The Ribbon"]'::jsonb,
2, 3
FROM quizzes WHERE title = 'Getting Started Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What is a workbook in Excel?',
'["A single spreadsheet", "An Excel file that can contain multiple worksheets", "A type of formula", "A chart template"]'::jsonb,
1, 4
FROM quizzes WHERE title = 'Getting Started Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'How do you rename a worksheet?',
'["Right-click and select Rename", "Double-click the worksheet tab", "Both A and B", "Press F2"]'::jsonb,
2, 5
FROM quizzes WHERE title = 'Getting Started Quiz';