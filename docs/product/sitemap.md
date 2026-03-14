# App Structure / Sitemap

## Public pages

### 1. Homepage
Route: `/`
Purpose:
- explain product quickly
- drive quiz starts
- allow town exploration

### 2. Quiz
Route: `/quiz`
Purpose:
- collect preferences
- move user through guided matching flow

### 3. Results
Route: `/results`
Purpose:
- show best-fit towns
- explain why they fit
- show tradeoffs
- link to compare and town pages

### 4. Town directory
Route: `/towns`
Purpose:
- browse all towns
- filter or scan available options

### 5. Town detail page
Route: `/towns/[slug]`
Purpose:
- show practical profile for one town
- give enough context for decision-making

### 6. Compare towns
Route: `/compare`
Purpose:
- compare 2–4 towns side by side

### 7. Guides index
Route: `/guides`
Purpose:
- list editorial / practical guides

### 8. Guide detail page
Route: `/guides/[slug]`
Purpose:
- practical long-form guidance

### 9. About / vision
Route: `/about`
Purpose:
- explain project thesis and tone

## Future pages
Not for V1 launch, but likely later:
- `/saved`
- `/newsletter`
- `/relocation`
- `/services`
- `/opportunities`

## Core navigation
Header:
- Home
- Quiz
- Towns
- Compare
- Guides
- About

Primary CTA in header:
- Find your match

## Key flows

### Flow A: direct fit-finding
Home → Quiz → Results → Town page → Compare

### Flow B: exploration-first
Home → Towns → Town page → Quiz → Results

### Flow C: research-first
Home → Guides → Town page → Quiz

## Component structure suggestion

### Homepage
- hero
- trust strip
- problem section
- how it works
- featured towns
- who it’s for
- closing CTA

### Quiz
- progress bar
- one question at a time
- back/next
- submit

### Results
- top match cards
- why this matched
- tradeoff note
- backup options
- compare CTA

### Town page
- hero summary
- snapshot metrics
- who it suits
- pros / cons
- remote work lens
- practical reality
- related towns

### Compare page
- selected town cards
- row-by-row dimensions
- recommendation notes
