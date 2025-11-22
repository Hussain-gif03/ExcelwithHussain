/*
# Add Charts and Advanced Level Content

## Plain English Explanation
Adds comprehensive content for:
- Module 6: Charts and Graphs (Intermediate)
- Module 7: Pivot Tables (Advanced)
- Module 8: Macros and VBA (Advanced)
- Module 9: Advanced Data Visualization (Advanced)

Complete Excel curriculum from beginner to expert level.
*/

-- Module 6: Charts and Graphs (3 lessons + quiz)
INSERT INTO lessons (module_id, title, content, order_index)
SELECT id, 'Creating and Formatting Charts',
'# Creating and Formatting Charts

Transform data into visual insights with Excel charts.

## Why Use Charts?
- Visualize trends and patterns
- Compare data easily
- Present information professionally
- Make data-driven decisions

## Creating a Chart

### Quick Method
1. Select data range (including headers)
2. Press Alt+F1 for default chart
3. Or press F11 for chart on new sheet

### Recommended Charts
1. Select data
2. Insert tab → Recommended Charts
3. Excel suggests best chart types
4. Preview and choose

### Manual Selection
1. Select data
2. Insert tab → Charts group
3. Choose chart type
4. Select specific chart style

## Common Chart Types

### Column Chart
**Best for**: Comparing values across categories
**Example**: Monthly sales by region
**Variations**: Clustered, Stacked, 100% Stacked

### Bar Chart
**Best for**: Comparing values with long category names
**Example**: Sales by product name
**Variations**: Clustered, Stacked, 100% Stacked

### Line Chart
**Best for**: Showing trends over time
**Example**: Stock prices, temperature changes
**Variations**: Line, Line with Markers, Stacked Line

### Pie Chart
**Best for**: Showing parts of a whole
**Example**: Market share, budget allocation
**Limitations**: Use only for 5-7 categories max

### Scatter Chart
**Best for**: Showing relationship between two variables
**Example**: Height vs Weight, Price vs Demand
**Use**: Correlation analysis

### Area Chart
**Best for**: Showing cumulative totals over time
**Example**: Total sales accumulation
**Variations**: Area, Stacked Area, 100% Stacked

## Chart Elements

### Chart Title
- Click to edit
- Link to cell: =Sheet1!A1
- Format: Font, size, color

### Axis Titles
- Add: Chart Design → Add Chart Element → Axis Titles
- Horizontal (X-axis): Category labels
- Vertical (Y-axis): Value labels

### Legend
- Shows data series names
- Position: Right, Top, Bottom, Left
- Can be moved or removed

### Data Labels
- Display values on chart
- Options: Value, Category, Series, Percentage
- Position: Center, Inside End, Outside End

### Gridlines
- Help read values
- Major gridlines: Main intervals
- Minor gridlines: Sub-intervals

## Formatting Charts

### Chart Styles
Quick formatting presets:
- Chart Design tab → Chart Styles
- Choose color scheme and style

### Change Colors
- Chart Design → Change Colors
- Select color palette

### Format Chart Area
- Right-click chart → Format Chart Area
- Adjust: Fill, Border, Shadow, 3-D Format

### Format Data Series
- Right-click data series → Format Data Series
- Options: Fill, Border, Effects, Series Options

## Chart Design Tips
1. **Keep it simple**: Don''t clutter with too many elements
2. **Use appropriate type**: Match chart to data
3. **Label clearly**: Add descriptive titles and labels
4. **Choose colors wisely**: Use contrasting colors
5. **Remove unnecessary elements**: Gridlines, borders if not needed

## Modifying Charts

### Change Chart Type
- Select chart
- Chart Design → Change Chart Type
- Choose new type

### Switch Row/Column
- Swap axes
- Chart Design → Switch Row/Column
- Useful when data is organized differently

### Select Data
- Chart Design → Select Data
- Add/Remove/Edit data series
- Change category labels

### Move Chart
- Chart Design → Move Chart
- New sheet or existing sheet
- Specify location

## Practice Exercise
Create a sales dashboard:
1. Create sample data: Months (Jan-Dec), Sales, Expenses
2. Create column chart for Sales by Month
3. Add chart title: "2024 Sales Performance"
4. Add axis titles: "Month" and "Sales ($)"
5. Format with professional style
6. Create line chart showing Sales and Expenses trend
7. Create pie chart showing Q1-Q4 distribution
8. Experiment with different chart types', 1
FROM modules WHERE title = 'Charts and Graphs';

INSERT INTO lessons (module_id, title, content, order_index)
SELECT id, 'Advanced Chart Techniques',
'# Advanced Chart Techniques

Master advanced charting features for professional data visualization.

## Combination Charts
Display multiple chart types in one chart.

**Example**: Sales (Column) + Profit Margin (Line)
1. Create column chart with Sales data
2. Right-click Profit Margin series
3. Change Series Chart Type → Line
4. Add secondary axis if scales differ

### Secondary Axis
Use when data series have different scales:
- Right-click series → Format Data Series
- Check "Secondary Axis"
- Adds second Y-axis on right side

## Dynamic Charts with Tables
Create charts that update automatically:
1. Convert data to Table (Ctrl+T)
2. Create chart from table
3. Add new rows → Chart updates automatically

## Chart Templates
Save custom chart formatting:
1. Format chart as desired
2. Right-click chart → Save as Template
3. Name and save
4. Apply to new charts: Insert → Templates

## Sparklines
Mini charts in single cells:

### Types
- **Line**: Trends over time
- **Column**: Compare values
- **Win/Loss**: Positive/negative indicators

### Creating Sparklines
1. Insert tab → Sparklines group
2. Choose type
3. Select data range
4. Choose location cells

### Formatting Sparklines
- Sparkline tab appears when selected
- Change type, style, colors
- Highlight: High Point, Low Point, First, Last, Negative

## Trendlines
Show data trends and forecasts:

### Adding Trendline
1. Click data series
2. Chart Design → Add Chart Element → Trendline
3. Choose type

### Trendline Types
- **Linear**: Straight line, constant rate
- **Exponential**: Accelerating growth/decline
- **Logarithmic**: Rapid then slow change
- **Polynomial**: Data with fluctuations
- **Moving Average**: Smooth out fluctuations

### Forecast
- Extend trendline into future
- Format Trendline → Forecast
- Enter periods forward/backward

## Error Bars
Show variability or uncertainty:
- Standard Error
- Standard Deviation
- Percentage
- Custom values

## Data Tables
Display chart data below chart:
- Chart Design → Add Chart Element → Data Table
- Options: With or without legend keys

## Chart Animation
Add visual interest (PowerPoint):
- Animate chart elements
- Entrance, emphasis, exit effects
- Animate by series or category

## Interactive Charts with Form Controls
Create dynamic charts:
1. Developer tab → Insert → Form Controls
2. Add scroll bar or combo box
3. Link to cell
4. Use cell value in chart formula

## Best Practices
1. **Use combination charts wisely**: Don''t mix too many types
2. **Secondary axis**: Only when necessary
3. **Trendlines**: Choose appropriate type for data
4. **Sparklines**: Great for dashboards
5. **Keep it professional**: Avoid 3D effects unless necessary

## Practice Exercise
Create an advanced sales dashboard:
1. Sales data by month and region
2. Combination chart: Sales (columns) + Growth % (line)
3. Add trendline with 3-month forecast
4. Create sparklines for each region
5. Add data table below chart
6. Save as template
7. Create interactive chart with dropdown to select region', 2
FROM modules WHERE title = 'Charts and Graphs';

-- Add quiz for Module 6
INSERT INTO quizzes (module_id, title, passing_score)
SELECT id, 'Charts and Graphs Quiz', 70
FROM modules WHERE title = 'Charts and Graphs';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Which chart type is best for showing trends over time?',
'["Pie Chart", "Line Chart", "Bar Chart", "Scatter Chart"]'::jsonb,
1, 1
FROM quizzes WHERE title = 'Charts and Graphs Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What is the maximum recommended number of categories for a pie chart?',
'["3-4", "5-7", "10-12", "Unlimited"]'::jsonb,
1, 2
FROM quizzes WHERE title = 'Charts and Graphs Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What keyboard shortcut creates a default chart?',
'["Ctrl+C", "Alt+F1", "F11", "Ctrl+K"]'::jsonb,
1, 3
FROM quizzes WHERE title = 'Charts and Graphs Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'When should you use a secondary axis in a chart?',
'["Always", "When data series have different scales", "Never", "Only for pie charts"]'::jsonb,
1, 4
FROM quizzes WHERE title = 'Charts and Graphs Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What are Sparklines?',
'["Large charts", "Mini charts in single cells", "Chart templates", "3D charts"]'::jsonb,
1, 5
FROM quizzes WHERE title = 'Charts and Graphs Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Which trendline type shows a straight line with constant rate?',
'["Exponential", "Linear", "Polynomial", "Logarithmic"]'::jsonb,
1, 6
FROM quizzes WHERE title = 'Charts and Graphs Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What happens when you create a chart from an Excel Table?',
'["Nothing special", "Chart updates automatically when data changes", "Chart is static", "Chart cannot be edited"]'::jsonb,
1, 7
FROM quizzes WHERE title = 'Charts and Graphs Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Which chart type is best for showing the relationship between two variables?',
'["Pie Chart", "Column Chart", "Scatter Chart", "Area Chart"]'::jsonb,
2, 8
FROM quizzes WHERE title = 'Charts and Graphs Quiz';

-- Module 7: Pivot Tables (Advanced Level)
INSERT INTO lessons (module_id, title, content, order_index)
SELECT id, 'Introduction to Pivot Tables',
'# Introduction to Pivot Tables

Master Excel''s most powerful data analysis tool.

## What is a Pivot Table?
A Pivot Table is an interactive tool that summarizes, analyzes, and presents large amounts of data quickly.

## Why Use Pivot Tables?
- Summarize thousands of rows instantly
- Group and categorize data dynamically
- Calculate subtotals and totals automatically
- Analyze data from multiple perspectives
- Create reports without formulas

## Creating Your First Pivot Table

### Method 1: Recommended Pivot Tables
1. Select any cell in data range
2. Insert tab → Recommended PivotTables
3. Choose suggested layout
4. Click OK

### Method 2: Manual Creation
1. Select data range
2. Insert tab → PivotTable
3. Choose location (New Worksheet recommended)
4. Click OK

## Pivot Table Field List
Four areas to drag fields:

### Filters
- Filter entire pivot table
- Example: Filter by Year or Region

### Columns
- Create column headers
- Example: Months across top

### Rows
- Create row headers
- Example: Products down left side

### Values
- Calculations to display
- Example: Sum of Sales

## Basic Pivot Table Example
**Data**: Sales transactions with Date, Product, Region, Sales Amount

**Pivot Table**:
- Rows: Product
- Values: Sum of Sales Amount
- Result: Total sales by product

## Value Field Settings
Customize calculations:
1. Click dropdown on value field
2. Value Field Settings
3. Choose function:
   - Sum (default for numbers)
   - Count
   - Average
   - Max/Min
   - Product
   - StdDev
   - Var

### Show Values As
Display values differently:
- % of Grand Total
- % of Column Total
- % of Row Total
- Difference From
- % Difference From
- Running Total

## Grouping Data

### Group Dates
Automatically group by:
- Years, Quarters, Months, Days
- Right-click date → Group
- Select grouping levels

### Group Numbers
Create ranges:
- Right-click number → Group
- Set starting point, ending point, interval
- Example: Age groups (0-20, 21-40, 41-60, 61+)

### Manual Grouping
Group selected items:
- Select items (Ctrl+Click)
- Right-click → Group Selection
- Name the group

## Sorting and Filtering

### Sort
- Click dropdown on Row/Column labels
- Sort A to Z or Z to A
- More Sort Options for custom sorting

### Filter
- Click dropdown on Row/Column labels
- Check/uncheck items
- Label Filters: Begins With, Contains, etc.
- Value Filters: Top 10, Above Average, etc.

## Refreshing Data
Update pivot table when source data changes:
- Right-click pivot table → Refresh
- Or: PivotTable Analyze → Refresh
- Keyboard: Alt+F5

## Best Practices
1. **Clean data first**: Remove blanks, fix inconsistencies
2. **Use tables**: Convert data to Table before creating pivot
3. **Descriptive headers**: Clear column names
4. **One pivot per sheet**: Easier to manage
5. **Refresh regularly**: Keep data current

## Practice Exercise
Create a sales analysis:
1. Sample data: Date, Salesperson, Product, Region, Amount
2. Create pivot table
3. Rows: Salesperson
4. Values: Sum of Amount
5. Add Product to Columns
6. Add Region to Filters
7. Group dates by Month
8. Sort by total sales (descending)
9. Show values as % of Grand Total', 1
FROM modules WHERE title = 'Pivot Tables and Pivot Charts';

-- Add quiz for Module 7
INSERT INTO quizzes (module_id, title, passing_score)
SELECT id, 'Pivot Tables Quiz', 70
FROM modules WHERE title = 'Pivot Tables and Pivot Charts';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What is the main purpose of a Pivot Table?',
'["Create charts", "Summarize and analyze large datasets", "Format cells", "Create formulas"]'::jsonb,
1, 1
FROM quizzes WHERE title = 'Pivot Tables Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Which Pivot Table area is used for calculations?',
'["Filters", "Columns", "Rows", "Values"]'::jsonb,
3, 2
FROM quizzes WHERE title = 'Pivot Tables Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'How do you update a Pivot Table after source data changes?',
'["Recreate it", "Refresh it", "Delete and start over", "It updates automatically"]'::jsonb,
1, 3
FROM quizzes WHERE title = 'Pivot Tables Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What keyboard shortcut refreshes a Pivot Table?',
'["F5", "Alt+F5", "Ctrl+R", "Ctrl+F5"]'::jsonb,
1, 4
FROM quizzes WHERE title = 'Pivot Tables Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Can you group dates in a Pivot Table?',
'["No", "Yes, by years, quarters, months, days", "Only by years", "Only manually"]'::jsonb,
1, 5
FROM quizzes WHERE title = 'Pivot Tables Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What is the default calculation for numeric fields in Values area?',
'["Average", "Sum", "Count", "Max"]'::jsonb,
1, 6
FROM quizzes WHERE title = 'Pivot Tables Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Where should you place a field to filter the entire Pivot Table?',
'["Rows", "Columns", "Values", "Filters"]'::jsonb,
3, 7
FROM quizzes WHERE title = 'Pivot Tables Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What is recommended before creating a Pivot Table?',
'["Delete all data", "Convert data to Table", "Sort data", "Add formulas"]'::jsonb,
1, 8
FROM quizzes WHERE title = 'Pivot Tables Quiz';

-- Module 8: Macros (Advanced) - 2 lessons + quiz
INSERT INTO lessons (module_id, title, content, order_index)
SELECT id, 'Recording and Running Macros',
'# Recording and Running Macros

Automate repetitive tasks with Excel macros.

## What is a Macro?
A macro is a recorded sequence of actions that can be played back to automate repetitive tasks.

## Enabling Developer Tab
1. File → Options → Customize Ribbon
2. Check "Developer" in right column
3. Click OK

## Recording a Macro

### Steps
1. Developer tab → Record Macro
2. Enter macro name (no spaces, start with letter)
3. Optional: Assign shortcut key (Ctrl+letter)
4. Choose where to store:
   - This Workbook (default)
   - New Workbook
   - Personal Macro Workbook (available in all workbooks)
5. Add description
6. Click OK
7. Perform actions to record
8. Developer tab → Stop Recording

### Recording Tips
- Plan actions before recording
- Use keyboard shortcuts (more reliable than mouse)
- Avoid selecting unnecessary cells
- Use relative references when needed
- Test in a copy first

## Running a Macro

### Method 1: Shortcut Key
Press assigned key combination (e.g., Ctrl+Shift+M)

### Method 2: Macros Dialog
1. Developer tab → Macros (or Alt+F8)
2. Select macro name
3. Click Run

### Method 3: Button
1. Developer tab → Insert → Button
2. Draw button on worksheet
3. Assign macro
4. Click button to run

### Method 4: Quick Access Toolbar
1. File → Options → Quick Access Toolbar
2. Choose "Macros" from dropdown
3. Add macro to toolbar

## Relative vs Absolute Recording

### Absolute (Default)
- Records exact cell addresses
- Always affects same cells
- Example: Always formats cell A1

### Relative
- Records movements relative to active cell
- Works from any starting position
- Click "Use Relative References" before recording
- Example: Formats cell 2 rows down from current

## Editing Macros
View and modify macro code:
1. Developer tab → Macros
2. Select macro
3. Click Edit
4. Opens Visual Basic Editor (VBE)

## Deleting Macros
1. Developer tab → Macros
2. Select macro
3. Click Delete
4. Confirm

## Macro Security
Protect against malicious code:

### Security Levels
- **Disable all macros**: Maximum security
- **Disable with notification**: Recommended
- **Enable all macros**: Not recommended

### Setting Security
1. Developer tab → Macro Security
2. Choose security level
3. Click OK

### Trusted Locations
Add folders where macros always run:
1. File → Options → Trust Center
2. Trust Center Settings
3. Trusted Locations
4. Add new location

## Common Macro Examples

### Format Report
1. Apply bold to headers
2. AutoFit columns
3. Add borders
4. Apply number formatting

### Data Cleanup
1. Remove duplicates
2. Trim spaces
3. Convert text to proper case
4. Fill blank cells

### Monthly Report
1. Copy data from source
2. Create pivot table
3. Generate charts
4. Format for printing

## Best Practices
1. **Name descriptively**: "FormatSalesReport" not "Macro1"
2. **Add descriptions**: Document what macro does
3. **Test thoroughly**: Try different scenarios
4. **Keep it simple**: Break complex tasks into multiple macros
5. **Back up first**: Save before running new macros
6. **Use comments**: Add notes in VBA code

## Troubleshooting
- **Macro doesn''t work**: Check if correct workbook is active
- **Error message**: Review recorded steps
- **Slow performance**: Optimize code (turn off screen updating)
- **Can''t find macro**: Check if stored in correct workbook

## Practice Exercise
Create automation macros:
1. Record macro to format a table (bold headers, borders, autofit)
2. Assign shortcut Ctrl+Shift+F
3. Record macro to insert current date and time
4. Create button to run date macro
5. Record relative macro to copy formula down 10 rows
6. Test all macros on different data
7. Edit macro to add your name in description', 1
FROM modules WHERE title = 'Macros and VBA Basics';

-- Add quiz for Module 8
INSERT INTO quizzes (module_id, title, passing_score)
SELECT id, 'Macros and VBA Quiz', 70
FROM modules WHERE title = 'Macros and VBA Basics';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What is a macro in Excel?',
'["A formula", "A recorded sequence of actions", "A chart type", "A data validation rule"]'::jsonb,
1, 1
FROM quizzes WHERE title = 'Macros and VBA Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Which tab must be enabled to record macros?',
'["Home", "Insert", "Developer", "Data"]'::jsonb,
2, 2
FROM quizzes WHERE title = 'Macros and VBA Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What keyboard shortcut opens the Macros dialog?',
'["Alt+F8", "Ctrl+M", "F5", "Ctrl+Alt+M"]'::jsonb,
0, 3
FROM quizzes WHERE title = 'Macros and VBA Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What is the difference between absolute and relative recording?',
'["No difference", "Absolute uses exact cells, relative uses movements", "Relative is faster", "Absolute is more secure"]'::jsonb,
1, 4
FROM quizzes WHERE title = 'Macros and VBA Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Where can you store a macro to make it available in all workbooks?',
'["This Workbook", "Personal Macro Workbook", "New Workbook", "Cannot be done"]'::jsonb,
1, 5
FROM quizzes WHERE title = 'Macros and VBA Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What is the recommended macro security level?',
'["Enable all macros", "Disable all macros", "Disable with notification", "No security needed"]'::jsonb,
2, 6
FROM quizzes WHERE title = 'Macros and VBA Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Can macro names contain spaces?',
'["Yes, always", "No, never", "Only at the end", "Only at the beginning"]'::jsonb,
1, 7
FROM quizzes WHERE title = 'Macros and VBA Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What should you do before running a new macro on important data?',
'["Nothing", "Back up the file", "Delete old macros", "Restart Excel"]'::jsonb,
1, 8
FROM quizzes WHERE title = 'Macros and VBA Quiz';

-- Module 9: Advanced Data Visualization (2 lessons + quiz)
INSERT INTO lessons (module_id, title, content, order_index)
SELECT id, 'Creating Interactive Dashboards',
'# Creating Interactive Dashboards

Build professional, interactive dashboards to visualize key metrics.

## What is a Dashboard?
A dashboard is a visual display of key metrics and data points, designed for quick analysis and decision-making.

## Dashboard Design Principles

### 1. Know Your Audience
- Executives: High-level KPIs
- Managers: Detailed metrics
- Analysts: Drill-down capabilities

### 2. Keep It Simple
- Focus on essential metrics
- Avoid clutter
- Use white space effectively

### 3. Visual Hierarchy
- Most important metrics prominent
- Group related information
- Consistent layout

### 4. Choose Right Visuals
- Numbers for exact values
- Charts for trends and comparisons
- Gauges for progress toward goals
- Maps for geographic data

## Dashboard Components

### KPI Cards
Display key metrics prominently:
- Large numbers
- Comparison to target
- Trend indicators (↑↓)
- Color coding (green/red)

### Charts
- Line charts: Trends over time
- Column charts: Comparisons
- Pie charts: Composition
- Sparklines: Compact trends

### Tables
- Summary data
- Top/bottom performers
- Detailed breakdowns

### Filters and Slicers
- Interactive controls
- Filter multiple visuals
- User-driven analysis

## Creating Interactive Elements

### Slicers
Visual filters for pivot tables and tables:
1. Select pivot table or table
2. Insert tab → Slicer
3. Choose fields
4. Format and position

**Benefits**:
- Easy to use
- Visual feedback
- Multi-select capability
- Connect to multiple pivot tables

### Timelines
Date-specific slicers:
1. Select pivot table
2. Insert tab → Timeline
3. Choose date field
4. Select time period

### Form Controls
Add interactive elements:
- Combo Box: Dropdown selection
- List Box: Multiple selections
- Scroll Bar: Adjust values
- Spin Button: Increment/decrement
- Check Box: Toggle options
- Option Button: Choose one option

### Creating Dynamic Charts
Use form controls to change chart data:
1. Add combo box
2. Link to cell
3. Use CHOOSE or INDEX function
4. Reference in chart

## Dashboard Layout

### Grid System
- Align elements to grid
- Consistent spacing
- Professional appearance

### Color Scheme
- 2-3 primary colors
- Consistent throughout
- Consider color blindness
- Use color meaningfully

### Typography
- Clear, readable fonts
- Consistent sizes
- Hierarchy (large to small)
- Limited font families

## Data Connections

### Refresh Strategy
- Manual refresh
- Automatic on open
- Scheduled refresh (Power Query)

### Data Sources
- Excel tables
- External databases
- Web data
- Multiple workbooks

## Performance Optimization

### Best Practices
1. **Minimize calculations**: Use values instead of formulas where possible
2. **Optimize pivot tables**: Defer layout update
3. **Reduce file size**: Remove unused data
4. **Use tables**: More efficient than ranges
5. **Limit volatile functions**: NOW(), TODAY(), RAND()

## Dashboard Examples

### Sales Dashboard
- Total revenue (KPI card)
- Revenue by month (line chart)
- Top products (bar chart)
- Regional breakdown (map)
- Sales by rep (table)
- Date filter (timeline)

### Financial Dashboard
- Key metrics (KPI cards)
- Budget vs actual (column chart)
- Expense breakdown (pie chart)
- Trend analysis (line chart)
- Variance analysis (table)

### HR Dashboard
- Headcount (KPI)
- Department distribution (pie)
- Hiring trends (line)
- Turnover rate (gauge)
- Employee list (table)

## Publishing and Sharing

### Protection
- Protect sheet structure
- Hide formulas
- Lock cells
- Password protect

### Distribution
- PDF export
- OneDrive/SharePoint
- Email
- Print-friendly version

## Practice Exercise
Create a sales dashboard:
1. Import sample sales data
2. Create pivot tables for analysis
3. Design layout (sketch first)
4. Add KPI cards (total sales, growth %)
5. Create charts (trends, comparisons)
6. Add slicers (date, region, product)
7. Format professionally
8. Test interactivity
9. Optimize performance
10. Add instructions for users', 1
FROM modules WHERE title = 'Advanced Data Visualization';

-- Add quiz for Module 9
INSERT INTO quizzes (module_id, title, passing_score)
SELECT id, 'Advanced Data Visualization Quiz', 70
FROM modules WHERE title = 'Advanced Data Visualization';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What is the primary purpose of a dashboard?',
'["Store data", "Visual display of key metrics for quick analysis", "Create formulas", "Format cells"]'::jsonb,
1, 1
FROM quizzes WHERE title = 'Advanced Data Visualization Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What are Slicers used for?',
'["Creating charts", "Visual filters for data", "Formatting cells", "Writing formulas"]'::jsonb,
1, 2
FROM quizzes WHERE title = 'Advanced Data Visualization Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'How many primary colors should a professional dashboard use?',
'["1", "2-3", "5-7", "As many as possible"]'::jsonb,
1, 3
FROM quizzes WHERE title = 'Advanced Data Visualization Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What is a KPI card?',
'["A chart type", "A prominent display of key metrics", "A data table", "A formula"]'::jsonb,
1, 4
FROM quizzes WHERE title = 'Advanced Data Visualization Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Which chart type is best for showing trends over time on a dashboard?',
'["Pie chart", "Line chart", "Bar chart", "Scatter chart"]'::jsonb,
1, 5
FROM quizzes WHERE title = 'Advanced Data Visualization Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What is a Timeline in Excel?',
'["A chart type", "A date-specific slicer", "A formula", "A formatting tool"]'::jsonb,
1, 6
FROM quizzes WHERE title = 'Advanced Data Visualization Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'What should you do to improve dashboard performance?',
'["Add more charts", "Minimize calculations and use tables", "Use more colors", "Add more data"]'::jsonb,
1, 7
FROM quizzes WHERE title = 'Advanced Data Visualization Quiz';

INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, order_index)
SELECT id,
'Can Slicers filter multiple pivot tables at once?',
'["No, never", "Yes, if connected", "Only in same worksheet", "Only same data source"]'::jsonb,
1, 8
FROM quizzes WHERE title = 'Advanced Data Visualization Quiz';