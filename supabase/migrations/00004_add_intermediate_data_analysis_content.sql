/*
# Add Data Analysis Tools Content (Module 5)

## Plain English Explanation
Adds comprehensive lessons for Module 5: Data Analysis Tools
- Sorting and filtering data
- Data validation
- Conditional formatting
- Tables and structured references
*/

-- Add lessons for Module 5: Data Analysis Tools
INSERT INTO lessons (module_id, title, content, order_index)
SELECT id, 'Sorting and Filtering Data',
'# Sorting and Filtering Data

Master data organization techniques to analyze and present information effectively.

## Sorting Data

### Simple Sort
Sort data by one column:
1. Select any cell in the data range
2. Go to Data tab → Sort A to Z (ascending) or Sort Z to A (descending)
3. Excel automatically selects the entire data range

**Keyboard Shortcuts**:
- Alt+A, S, A (Sort A to Z)
- Alt+A, S, D (Sort Z to A)

### Custom Sort
Sort by multiple columns with custom order:
1. Select data range
2. Data tab → Sort button
3. Add levels for multiple sort criteria
4. Choose sort order for each level

**Example**: Sort by Department (A-Z), then by Salary (largest to smallest)

### Sort Options
- **Sort by**: Values, Cell Color, Font Color, Cell Icon
- **Order**: A to Z, Z to A, Custom List
- **My data has headers**: Check if first row contains headers

## Filtering Data

### AutoFilter
Display only rows that meet specific criteria:
1. Select any cell in data range
2. Data tab → Filter button (or Ctrl+Shift+L)
3. Click dropdown arrow in column header
4. Select filter criteria

### Filter Types

#### Text Filters
- Equals, Does Not Equal
- Begins With, Ends With
- Contains, Does Not Contain
- Custom Filter (combine conditions)

#### Number Filters
- Equals, Does Not Equal
- Greater Than, Less Than
- Between
- Top 10, Above Average, Below Average

#### Date Filters
- Today, Yesterday, Tomorrow
- This Week, Last Week, Next Week
- This Month, Last Month, Next Month
- Custom date ranges

### Multiple Filters
Apply filters to multiple columns simultaneously:
- Each column filter is combined with AND logic
- Only rows meeting ALL criteria are displayed

### Clear Filters
- Clear filter from one column: Click dropdown → Clear Filter
- Clear all filters: Data tab → Clear button
- Remove AutoFilter: Data tab → Filter button (toggle off)

## Advanced Filter
Create complex criteria with formulas:
1. Set up criteria range above or beside data
2. Data tab → Advanced button
3. Choose filter in place or copy to another location
4. Specify criteria range

**Example Criteria**:
| Department | Salary  |
|------------|---------|
| Sales      | >50000  |
| Marketing  | >60000  |

This shows Sales with salary >50000 OR Marketing with salary >60000

## Sorting Best Practices
1. **Always include headers**: Check "My data has headers"
2. **Select entire range**: Ensure all related columns are included
3. **Remove blank rows**: Blank rows break data ranges
4. **Use tables**: Convert to table for automatic range expansion

## Filtering Best Practices
1. **Clear filters before new analysis**: Avoid confusion
2. **Check filter indicators**: Funnel icon shows active filters
3. **Use status bar**: Shows filtered row count
4. **Copy filtered data**: Only visible cells are copied

## Practical Examples

### Find Top Performers
1. Filter Department = "Sales"
2. Sort by Revenue (largest to smallest)
3. View top 10 results

### Analyze Recent Data
1. Filter Date > Last Month
2. Sort by Date (newest first)
3. Analyze trends

### Multi-Criteria Search
1. Filter Status = "Active"
2. Filter Region = "West"
3. Filter Sales > 100000
4. View results meeting all criteria

## Practice Exercise
Create a sales analysis:
1. Create sample data: Name, Department, Region, Sales, Date
2. Sort by Sales (highest to lowest)
3. Filter to show only Sales department
4. Filter to show sales > $50,000
5. Sort filtered results by Date
6. Clear all filters and try different combinations', 1
FROM modules WHERE title = 'Data Analysis Tools';

INSERT INTO lessons (module_id, title, content, order_index)
SELECT id, 'Data Validation and Drop-down Lists',
'# Data Validation and Drop-down Lists

Control data entry to ensure accuracy and consistency in your spreadsheets.

## What is Data Validation?
Data Validation restricts the type of data that can be entered into a cell, preventing errors and maintaining data integrity.

## Creating Data Validation

### Basic Steps
1. Select cell(s) to validate
2. Data tab → Data Validation button
3. Choose validation criteria
4. Set input message and error alert
5. Click OK

## Validation Types

### Whole Number
Restrict to integers within a range.

**Example**: Age between 18 and 65
- Allow: Whole number
- Data: between
- Minimum: 18
- Maximum: 65

### Decimal
Allow decimal numbers within a range.

**Example**: GPA between 0.0 and 4.0
- Allow: Decimal
- Data: between
- Minimum: 0
- Maximum: 4

### List (Drop-down)
Create a drop-down list of valid options.

**Method 1: Type values directly**
- Allow: List
- Source: Yes,No,Maybe

**Method 2: Reference a range**
- Allow: List
- Source: =$A$1:$A$5

### Date
Restrict to dates within a range.

**Example**: Future dates only
- Allow: Date
- Data: greater than
- Start date: =TODAY()

### Time
Restrict to times within a range.

**Example**: Business hours (9 AM - 5 PM)
- Allow: Time
- Data: between
- Start: 9:00 AM
- End: 5:00 PM

### Text Length
Limit number of characters.

**Example**: State abbreviation (2 characters)
- Allow: Text length
- Data: equal to
- Length: 2

### Custom Formula
Use a formula for complex validation.

**Example**: Email must contain @
- Allow: Custom
- Formula: =ISNUMBER(FIND("@", A1))

## Input Messages
Display helpful hints when cell is selected:
1. In Data Validation dialog
2. Go to Input Message tab
3. Check "Show input message when cell is selected"
4. Enter title and message

**Example**:
- Title: "Enter Age"
- Message: "Please enter age between 18 and 65"

## Error Alerts
Control what happens when invalid data is entered:

### Stop (Default)
Prevents invalid data entry.
- Use for: Critical data that must be valid

### Warning
Warns but allows invalid data.
- Use for: Recommended but not required validation

### Information
Informs but allows invalid data.
- Use for: Suggestions only

## Creating Dynamic Drop-down Lists

### Named Range Method
1. Create list in separate area
2. Select list → Define Name (Formulas tab)
3. Name it (e.g., "Departments")
4. In Data Validation, Source: =Departments

### Table Method
1. Convert list to Table (Ctrl+T)
2. In Data Validation, Source: =Table1[Column1]
3. List automatically updates when table changes

### Dependent Drop-downs
Create cascading lists where second list depends on first selection.

**Example**: Country → City
1. Create named ranges for each country''s cities
2. First drop-down: List of countries
3. Second drop-down: =INDIRECT(A1)
   - If A1="USA", shows range named "USA"

## Removing Validation
1. Select cells with validation
2. Data tab → Data Validation
3. Click "Clear All"
4. Click OK

## Circle Invalid Data
Highlight cells with invalid data:
1. Data tab → Data Validation dropdown
2. Circle Invalid Data
3. Excel marks invalid entries with red circles

## Best Practices
1. **Always add input messages**: Guide users
2. **Use Stop for critical data**: Prevent errors
3. **Keep lists updated**: Use named ranges or tables
4. **Test validation**: Try invalid entries
5. **Document validation rules**: Add comments

## Practical Examples

### Employee Form
- Name: Text length > 2
- Department: List (Sales, Marketing, IT, HR)
- Start Date: Date >= TODAY()
- Salary: Whole number between 30000 and 150000
- Email: Custom formula checking for @

### Inventory System
- Product Code: Text length = 6
- Category: List from table
- Quantity: Whole number >= 0
- Price: Decimal > 0
- Reorder Level: Whole number < Quantity

## Practice Exercise
Create a student registration form:
1. Student ID: 6-digit number
2. Name: Text length > 2
3. Grade: List (9, 10, 11, 12)
4. Birth Date: Date < TODAY()
5. Email: Must contain @
6. GPA: Decimal between 0.0 and 4.0
7. Add input messages for each field
8. Test with valid and invalid data', 2
FROM modules WHERE title = 'Data Analysis Tools';

INSERT INTO lessons (module_id, title, content, order_index)
SELECT id, 'Conditional Formatting',
'# Conditional Formatting

Automatically format cells based on their values to highlight important data and trends.

## What is Conditional Formatting?
Conditional Formatting applies formatting (colors, icons, data bars) to cells based on rules you define.

## Accessing Conditional Formatting
Home tab → Conditional Formatting button

## Highlight Cell Rules

### Greater Than / Less Than
Highlight cells above or below a threshold.

**Example**: Highlight sales > $10,000
1. Select data range
2. Conditional Formatting → Highlight Cell Rules → Greater Than
3. Enter 10000
4. Choose formatting style

### Between
Highlight cells within a range.

**Example**: Highlight scores between 70-80
1. Select range
2. Highlight Cell Rules → Between
3. Enter 70 and 80
4. Choose format

### Equal To
Highlight cells matching a specific value.

**Example**: Highlight status = "Complete"

### Text That Contains
Highlight cells containing specific text.

**Example**: Highlight cells containing "Urgent"

### Duplicate Values
Highlight duplicate or unique values.

**Options**:
- Duplicate (highlight repeating values)
- Unique (highlight one-of-a-kind values)

### Date Occurring
Highlight dates in specific time periods.

**Options**:
- Yesterday, Today, Tomorrow
- Last 7 days, Last week, This week, Next week
- Last month, This month, Next month

## Top/Bottom Rules

### Top 10 Items
Highlight highest values.

**Customizable**: Top 5, Top 10, Top 20, etc.

### Top 10%
Highlight highest percentage of values.

### Bottom 10 Items
Highlight lowest values.

### Bottom 10%
Highlight lowest percentage of values.

### Above Average
Highlight values above the average.

### Below Average
Highlight values below the average.

## Data Bars
Display bars in cells proportional to their values.

**Types**:
- Gradient Fill
- Solid Fill

**Customization**:
- Minimum/Maximum values
- Bar direction
- Bar color
- Show bar only (hide numbers)

**Example**: Sales performance visualization
- Higher sales = longer bar
- Instant visual comparison

## Color Scales
Apply color gradients based on values.

**Types**:
- 2-Color Scale (low to high)
- 3-Color Scale (low, midpoint, high)

**Common Uses**:
- Heat maps
- Performance dashboards
- Risk assessment matrices

**Example**: Temperature data
- Blue (cold) → White (moderate) → Red (hot)

## Icon Sets
Display icons based on value ranges.

**Types**:
- Directional (arrows)
- Shapes (circles, flags)
- Indicators (traffic lights, symbols)
- Ratings (stars, bars)

**Example**: Project status
- Green checkmark: Complete
- Yellow exclamation: In Progress
- Red X: Not Started

## Custom Rules (New Rule)
Create advanced formatting with formulas.

### Formula-Based Formatting
Use formulas to determine formatting.

**Example 1**: Highlight entire row if status is "Overdue"
- Formula: =$E1="Overdue"
- Applies to: $A$1:$F$100

**Example 2**: Alternate row colors
- Formula: =MOD(ROW(),2)=0
- Formats even rows

**Example 3**: Highlight weekends
- Formula: =OR(WEEKDAY(A1)=1, WEEKDAY(A1)=7)
- Formats Saturday and Sunday

### Format Only Cells That Contain
More specific than Highlight Cell Rules.

**Options**:
- Cell Value
- Specific Text
- Dates Occurring
- Blanks/No Blanks
- Errors/No Errors

## Managing Rules

### View All Rules
Conditional Formatting → Manage Rules
- See all rules in worksheet or selection
- Edit, delete, or reorder rules
- Enable/disable rules

### Rule Priority
When multiple rules apply:
- Rules are evaluated top to bottom
- Check "Stop If True" to prevent further rules
- Drag rules to change priority

### Clear Rules
Remove conditional formatting:
- Clear from Selected Cells
- Clear from Entire Sheet
- Clear from This Table

## Best Practices
1. **Don''t overuse**: Too much formatting is distracting
2. **Use consistent colors**: Same meaning = same color
3. **Test with various data**: Ensure rules work correctly
4. **Document complex rules**: Add comments
5. **Consider color blindness**: Use patterns or icons too

## Practical Examples

### Sales Dashboard
- Data bars for revenue visualization
- Color scale for profit margins
- Icons for target achievement
- Highlight top 10 performers

### Project Tracker
- Red for overdue tasks
- Yellow for due this week
- Green for completed
- Icons for priority levels

### Financial Report
- Red for negative values
- Green for positive values
- Data bars for expense categories
- Highlight values > budget

## Practice Exercise
Create a grade tracker:
1. Student names in column A
2. Test scores in columns B-E
3. Average in column F
4. Apply data bars to test scores
5. Use color scale for averages (red-yellow-green)
6. Highlight averages > 90 in bold green
7. Highlight averages < 60 in bold red
8. Add icons to show performance (↑↔↓)
9. Highlight duplicate scores
10. Format entire row if average < 60', 3
FROM modules WHERE title = 'Data Analysis Tools';

-- Add quiz for Module 5
INSERT INTO quizzes (module_id, title, passing_score)
SELECT id, 'Data Analysis Tools Quiz', 70
FROM modules WHERE title = 'Data Analysis Tools';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What keyboard shortcut toggles AutoFilter on and off?',
'["Ctrl+F", "Ctrl+Shift+L", "Alt+F", "Ctrl+Alt+F"]'::jsonb,
1, 1
FROM quizzes WHERE title = 'Data Analysis Tools Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Which Data Validation type would you use to create a drop-down list?',
'["Whole Number", "List", "Custom", "Text Length"]'::jsonb,
1, 2
FROM quizzes WHERE title = 'Data Analysis Tools Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What does the "Stop" error alert do in Data Validation?',
'["Warns but allows entry", "Prevents invalid data entry", "Shows information only", "Deletes the cell"]'::jsonb,
1, 3
FROM quizzes WHERE title = 'Data Analysis Tools Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Which Conditional Formatting feature displays bars proportional to cell values?',
'["Color Scales", "Icon Sets", "Data Bars", "Highlight Rules"]'::jsonb,
2, 4
FROM quizzes WHERE title = 'Data Analysis Tools Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'When sorting by multiple columns, what determines which column is sorted first?',
'["Alphabetical order", "Column position", "Sort level order", "Data type"]'::jsonb,
2, 5
FROM quizzes WHERE title = 'Data Analysis Tools Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What happens when you apply multiple filters to different columns?',
'["Only last filter applies", "Filters are combined with AND logic", "Filters are combined with OR logic", "Excel shows an error"]'::jsonb,
1, 6
FROM quizzes WHERE title = 'Data Analysis Tools Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Which conditional formatting option would you use to highlight the top 10 values?',
'["Highlight Cell Rules", "Top/Bottom Rules", "Data Bars", "Color Scales"]'::jsonb,
1, 7
FROM quizzes WHERE title = 'Data Analysis Tools Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What is the benefit of using named ranges for Data Validation lists?',
'["Faster performance", "List automatically updates", "Better formatting", "Prevents errors"]'::jsonb,
1, 8
FROM quizzes WHERE title = 'Data Analysis Tools Quiz';