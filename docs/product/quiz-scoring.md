# Quiz Questions + Scoring Logic

## Quiz goal
Recommend 3–5 Himachal towns based on user preferences.

Use weighted scoring rather than hard rules.

Each answer adds or subtracts points from towns.

## Core scoring dimensions
Each town should have internal scores from 1–5 for:
- affordability
- remoteWork
- accessibility
- socialEnergy
- quiet
- familyFit
- tourismIntensity
- weatherCold
- longStayFit
- aesthetics

## Questions

### Q1. What kind of stay are you considering?
Options:
- A short 1–4 week test
- 1–3 months
- 3–12 months
- Long-term / maybe permanent

Weighting notes:
- short stays boost Bir, McLeodganj, Manali
- longer stays boost Palampur, Solan, Shimla, Dharamshala

### Q2. What best describes you right now?
Options:
- Solo remote worker
- Freelancer / creator
- Couple
- Family with children
- Returning Himachali

Weighting notes:
- family boosts Shimla, Solan, Palampur, Dharamshala
- creator boosts Bir, Dharamshala, Naggar

### Q3. What monthly budget feels comfortable?
Options:
- Tight
- Moderate
- Comfortable
- Flexible

Weighting notes:
- tight budget boosts Palampur, Mandi, Solan
- flexible budget allows Kasauli, parts of Manali, higher-cost options

### Q4. How important is reliable internet for your life/work?
Options:
- Non-negotiable
- Important
- Nice to have
- Not a major factor

Weighting notes:
- high importance boosts Shimla, Solan, Dharamshala, parts of Bir
- lower importance can allow quieter/slower places more easily

### Q5. What pace of life do you want?
Options:
- Quiet and slow
- Balanced
- Some buzz, but not chaos
- I want energy and people around me

Weighting notes:
- quiet boosts Palampur, Naggar
- buzz boosts McLeodganj, Bir, Manali
- balanced boosts Dharamshala, Solan, Shimla

### Q6. How much tourist energy can you tolerate?
Options:
- Very little
- Some is okay
- I don’t mind
- I actually like lively places

Weighting notes:
- low tolerance boosts Palampur, Solan, Mandi
- high tolerance boosts Manali, McLeodganj, Bir

### Q7. What matters more to you right now?
Options:
- Beauty and atmosphere
- Practical day-to-day living
- A strong remote-work lifestyle
- Family comfort and access

Weighting notes:
- beauty boosts Naggar, Bir, Manali, Palampur
- practical boosts Solan, Shimla, Mandi
- remote-work boosts Bir, Dharamshala, Shimla
- family boosts Solan, Shimla, Palampur, Dharamshala

### Q8. How important is easy access to roads / transit / nearby city connections?
Options:
- Very important
- Important
- Somewhat important
- Not very important

Weighting notes:
- high importance boosts Shimla, Solan, Mandi, Dharamshala
- low importance allows Naggar and more tucked-away options

### Q9. What climate do you prefer?
Options:
- Colder mountain feel
- Moderate weather
- I’m flexible

Weighting notes:
- colder boosts Shimla, Manali, McLeodganj, Naggar
- moderate boosts Palampur, Solan, Dharamshala

### Q10. What are you optimizing for most?
Options:
- Deep work and peace
- Lifestyle and inspiration
- Convenience and practicality
- Building a longer-term home base

Weighting notes:
- deep work boosts Palampur, Naggar, Solan
- inspiration boosts Bir, Dharamshala, Manali
- convenience boosts Shimla, Solan, Mandi
- home base boosts Palampur, Dharamshala, Solan, Shimla

## Example town score profiles (illustrative)

### Bir
- affordability: 3
- remoteWork: 4
- accessibility: 3
- socialEnergy: 4
- quiet: 2
- familyFit: 2
- tourismIntensity: 4
- weatherCold: 3
- longStayFit: 3
- aesthetics: 5

### Dharamshala
- affordability: 3
- remoteWork: 4
- accessibility: 4
- socialEnergy: 4
- quiet: 3
- familyFit: 4
- tourismIntensity: 3
- weatherCold: 3
- longStayFit: 4
- aesthetics: 4

### Palampur
- affordability: 4
- remoteWork: 3
- accessibility: 3
- socialEnergy: 2
- quiet: 5
- familyFit: 4
- tourismIntensity: 1
- weatherCold: 2
- longStayFit: 5
- aesthetics: 4

### Shimla
- affordability: 2
- remoteWork: 4
- accessibility: 5
- socialEnergy: 3
- quiet: 2
- familyFit: 5
- tourismIntensity: 3
- weatherCold: 4
- longStayFit: 4
- aesthetics: 4

### Solan
- affordability: 4
- remoteWork: 4
- accessibility: 5
- socialEnergy: 2
- quiet: 3
- familyFit: 4
- tourismIntensity: 1
- weatherCold: 2
- longStayFit: 4
- aesthetics: 3

### Manali
- affordability: 2
- remoteWork: 3
- accessibility: 3
- socialEnergy: 5
- quiet: 2
- familyFit: 2
- tourismIntensity: 5
- weatherCold: 5
- longStayFit: 2
- aesthetics: 5

### Naggar
- affordability: 3
- remoteWork: 2
- accessibility: 2
- socialEnergy: 2
- quiet: 5
- familyFit: 2
- tourismIntensity: 2
- weatherCold: 4
- longStayFit: 3
- aesthetics: 5

## Result format
Return:
- top 3 best-fit towns
- one-line why for each
- one key tradeoff for each
- 2 backup options

## Logic recommendation for implementation
1. Create town records with scores for each dimension.
2. Map each answer to weighted score adjustments.
3. Sum weighted scores for each town.
4. Sort descending.
5. Generate explanation snippets from strongest matching dimensions.

## Sample explanation template
"You matched well with Palampur because you prioritized quiet, longer-term livability, and a more grounded day-to-day rhythm."

## Important note
This should feel like guided judgment, not fake certainty.
Results should say:
- best fits
- why they fit
- what tradeoffs come with them
