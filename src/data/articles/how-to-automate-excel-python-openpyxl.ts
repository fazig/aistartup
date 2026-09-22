import { BlogPost } from "../posts";
export const postHowToAutomateExcelPythonOpenpyxl: BlogPost = {
  slug: "how-to-automate-excel-python-openpyxl",
  title: "How to Automate Excel With Python and OpenPyXL (2026)",
  description: "Automate Excel with Python and openpyxl: read, format, and generate .xlsx reports in code. Practical 2026 tutorial with copy-paste examples for real workflows.",
  date: "September 22, 2026",
  readTime: "6 min read",
  category: "How-To Guides",
  author: "Faizan Arif",
  image: "/how-to-automate-excel-python-openpyxl_cover.webp",
  content: `![How to Automate Excel With Python and OpenPyXL (2026)](/how-to-automate-excel-python-openpyxl_cover.webp)

OpenPyXL is a Python library that reads and writes Excel workbooks directly, with no Excel installation required. This guide walks through real automation tasks: building reports, formatting cells, adding formulas and charts, and processing large files.

## Why openpyxl and not something else

Three libraries dominate Python-to-Excel work. \`xlrd\`/\`xlwt\` handle the legacy \`.xls\` format and are essentially frozen. \`xlsxwriter\` writes files beautifully but cannot read or modify existing workbooks. \`pandas\` is superb for data analysis and can read/write Excel via its \`openpyxl\` engine, but it drops charts, conditional formatting, and precise styling on round-trips.

OpenPyXL sits in the middle: full read/write access to modern \`.xlsx\` files, including formatting, formulas, charts, data validation, and filters. It runs anywhere Python runs, including Linux servers with no Office installed. That combination makes it the default choice for report automation.

## 1. Install openpyxl and create your first workbook

Install it with pip:

\`\`\`bash
pip install openpyxl
\`\`\`

A minimal script creates a workbook, names the active sheet, adds data, and saves it:

\`\`\`python
import openpyxl

wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Sales"

ws.append(["Date", "Product", "Units", "Unit Price"])
ws.append(["2026-09-01", "Widget", 10, 2.50])
ws.append(["2026-09-02", "Gadget", 3, 4.00])
ws.append(["2026-09-03", "Gizmo", 2, 9.00])

wb.save("sales.xlsx")
\`\`\`

Every workbook starts with one sheet accessible as \`wb.active\`. \`ws.append()\` writes a whole row at once, and \`ws["A1"] = "value"\` targets a single cell. Save with \`wb.save()\` — nothing is written to disk before that call.

## 2. Read and process an existing file

Opening a file is one line. Use \`iter_rows()\` to walk the data without loading cell objects you do not need:

\`\`\`python
from openpyxl import load_workbook

wb = load_workbook("sales.xlsx")
ws = wb.active

for row in ws.iter_rows(min_row=2, values_only=True):
    date, product, units, price = row
    print(product, units * price)
\`\`\`

\`min_row=2\` skips the header row, and \`values_only=True\` returns plain Python values instead of cell objects — faster and cleaner. To reach a specific sheet by name, use \`wb["Sales"]\` or \`wb["Sheet2"]\`.

A common pattern: read one workbook, transform rows in Python, and write the results to a second workbook. This is how people automate monthly reconciliation reports that currently eat half a day of manual copy-paste.

## 3. Write formulas (openpyxl does not calculate them)

Set a cell's value to a string starting with \`=\` and Excel treats it as a formula:

\`\`\`python
ws["E1"] = "Line Total"
for row in range(2, ws.max_row + 1):
    ws[f"E{row}"] = f"=C{row}*D{row}"

ws["F1"] = "Grand Total"
ws["F2"] = "=SUM(E2:E100)"
\`\`\`

Important: openpyxl only writes the formula text. It does not evaluate it. When the file is opened in Excel, LibreOffice, or Google Sheets, the application calculates the results on first load. If another Python script reads the file afterwards and you need the calculated values, pass \`data_only=True\` to \`load_workbook()\` — this reads the last cached values that Excel saved.

## 4. Format cells like a professional report

Formatting lives in \`openpyxl.styles\`. Build reusable style objects and apply them to cells:

\`\`\`python
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

header_font = Font(name="Calibri", bold=True, color="FFFFFF")
header_fill = PatternFill(start_color="1F4E78", end_color="1F4E78", fill_type="solid")
thin_border = Border(
    left=Side(style="thin"), right=Side(style="thin"),
    top=Side(style="thin"), bottom=Side(style="thin"),
)

for cell in ws[1]:
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal="center")
    cell.border = thin_border
\`\`\`

\`ws[1]\` returns every cell in row 1, so one loop styles the whole header. For numbers and dates, set \`cell.number_format\` — \`"#,##0.00"\` for currency-style values, \`"YYYY-MM-DD"\` for dates, \`"0%"\` for percentages.

Column widths need a touch too, since openpyxl does not auto-size columns. Use \`get_column_letter\` from \`openpyxl.utils\`:

\`\`\`python
from openpyxl.utils import get_column_letter

for col in ws.columns:
    letter = get_column_letter(col[0].column)
    ws.column_dimensions[letter].width = max(
        len(str(cell.value or "")) for cell in col
    ) + 2
\`\`\`

This measures the longest value in each column and sizes the column to fit — the closest thing to Excel's auto-fit available in pure Python.

## 5. Add conditional formatting and charts

Conditional formatting flags outliers without manual inspection. Highlight every line total above 25:

\`\`\`python
from openpyxl.formatting.rule import CellIsRule
from openpyxl.styles import PatternFill

red = PatternFill(start_color="FFC7CE", end_color="FFC7CE", fill_type="solid")
ws.conditional_formatting.add(
    "E2:E100",
    CellIsRule(operator="greaterThan", formula=["25"], fill=red),
)
\`\`\`

Charts are native Excel objects, not images — recipients can hover over data points and restyle them:

\`\`\`python
from openpyxl.chart import BarChart, Reference

chart = BarChart()
chart.title = "Units Sold"
chart.style = 10
data = Reference(ws, min_col=3, min_row=1, max_row=ws.max_row)
chart.add_data(data, titles_from_data=True)
ws.add_chart(chart, "G2")
\`\`\`

\`titles_from_data=True\` takes the header in row 1 as the series name. The chart anchors at cell G2 and moves with the sheet like any manually inserted chart.

## 6. Data validation and sheet protection

Restrict a column to a dropdown list so downstream users cannot break your report:

\`\`\`python
from openpyxl.worksheet.datavalidation import DataValidation

dv = DataValidation(type="list", formula1='"Approved,Pending,Rejected"', allow_blank=True)
dv.error = "Please pick a value from the list"
ws.add_data_validation(dv)
dv.add("B2:B100")
\`\`\`

Lock the sheet with a password while leaving input cells editable:

\`\`\`python
ws.protection.sheet = True
ws.protection.password = "secret"
ws["C2"].protection = openpyxl.styles.Protection(locked=False)
\`\`\`

A subtle point: \`protection\` on individual cells only matters once the sheet itself is protected. The pattern is to lock everything, then unlock the cells users are meant to fill in.

## 7. Handle huge files without freezing

The default mode holds the entire workbook in memory. For files with hundreds of thousands of rows, use streaming modes:

- \`load_workbook("big.xlsx", read_only=True)\` streams rows instead of loading everything — ideal for processing exports row by row.
- \`Workbook(write_only=True)\` streams rows straight to disk while writing — ideal for generating massive files.

\`\`\`python
from openpyxl import Workbook

wb = Workbook(write_only=True)
ws = wb.create_sheet()
for i in range(500_000):
    ws.append([i, f"row-{i}", i * 1.5])
wb.save("huge.xlsx")
\`\`\`

Streaming has trade-offs: read-only workbooks cannot be modified in place, and write-only workbooks cannot read back what was written. Use them for pipelines, not interactive editing.

## OpenPyXL limits worth knowing

No library is magic. OpenPyXL works only with the modern \`.xlsx\` format, not legacy \`.xls\` files. It cannot run VBA macros, refresh pivot tables, or recalculate formulas — those need Excel itself. If you need Excel to execute macros on Windows, \`xlwings\` drives the real application via COM and complements openpyxl rather than replacing it.

## Key takeaways

- Install openpyxl with \`pip install openpyxl\` — no Excel or Office licence needed, works on any server.
- \`load_workbook()\` reads, \`Workbook()\` creates, \`ws.append()\` writes rows, \`wb.save()\` persists everything.
- Write formulas as strings (\`"=SUM(A1:A10)"\`); Excel calculates them when the file is opened.
- Style with \`Font\`, \`PatternFill\`, \`Alignment\`, and \`number_format\`; size columns manually with \`column_dimensions\`.
- Add \`CellIsRule\` conditional formatting, native \`BarChart\` objects, data validation dropdowns, and sheet protection for professional reports.
- Use \`read_only\` and \`write_only\` modes for files too large to fit comfortably in memory.`,
};
