# Initial Database Data

## Overview
The database has been pre-populated with sample course content to demonstrate the platform's functionality. This data is for demonstration purposes and can be modified or expanded through the admin dashboard.

## Pre-populated Data

### Courses (3)
1. **Beginner Level** - Master the fundamentals of Microsoft Excel
2. **Intermediate Level** - Advance your Excel skills with complex formulas and data analysis
3. **Advanced Level** - Become an Excel expert with macros, pivot tables, and automation

### Modules (9 total - 3 per course)

#### Beginner Level Modules:
1. Getting Started with Excel
2. Basic Formulas and Functions
3. Cell Formatting and Styles

#### Intermediate Level Modules:
1. Advanced Formulas
2. Data Analysis Tools
3. Charts and Graphs

#### Advanced Level Modules:
1. Pivot Tables and Pivot Charts
2. Macros and VBA Basics
3. Advanced Data Visualization

### Sample Lessons (2)
The "Getting Started with Excel" module includes two complete lessons:
1. Understanding the Excel Interface
2. Working with Workbooks and Worksheets

### Sample Quiz (1)
The "Getting Started with Excel" module includes a quiz with 5 questions to test understanding of the lesson content.

## Managing Initial Data

### For Administrators
As an administrator, you can:
- View all courses, modules, and lessons through the admin dashboard
- Manage user roles and permissions
- Add, edit, or delete content as needed

### Expanding Content
To add more content to the platform:
1. Log in as an administrator
2. Navigate to the Admin Dashboard
3. Use the management interface to add new lessons, quizzes, and modules

### Deleting Sample Data
If you wish to remove the sample data:
1. Access the Supabase dashboard
2. Navigate to the Table Editor
3. Manually delete records from the respective tables
4. Note: Deleting courses will cascade delete all related modules, lessons, and quizzes

## User Accounts

### First User
- The first user to register will automatically be assigned the **admin** role
- All subsequent users will be assigned the **student** role by default
- Admins can change user roles through the admin dashboard

### No Pre-configured Accounts
For security reasons, no default accounts have been created. You must register the first account to become the administrator.

## Important Notes

1. **Sample Content**: The pre-populated lessons are basic examples. You should expand them with comprehensive content for a production environment.

2. **Quiz Questions**: Only one module has quiz questions. You'll need to add quizzes for other modules through the admin interface or database.

3. **Progress Tracking**: Student progress tracking begins once they start completing lessons and taking quizzes.

4. **Certificates**: Certificates are only generated when a student completes ALL lessons and passes ALL quizzes across all three levels.

5. **Data Persistence**: All data is stored in Supabase and persists across sessions.
