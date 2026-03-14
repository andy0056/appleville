# PRD — Build Your Life in Himachal (V1)

## 1. Summary

Build Your Life in Himachal is a web app that helps people decide where in Himachal Pradesh they should live and work based on lifestyle, budget, access, and remote-work needs.

V1 is a town-matching and decision-support product.

It is not a housing marketplace, jobs portal, or community network yet.

## 2. Problem

People exploring a move to Himachal usually rely on scattered inputs:
- YouTube videos
- Instagram reels
- Reddit threads
- travel blogs
- anecdotal advice from friends

That content is usually optimized for tourism, not real-life decision-making.

Users need practical answers such as:
- Which town suits my budget?
- Where can I work remotely reliably?
- Which places are too touristy or too isolated?
- What works for solo life vs family life?
- What are the tradeoffs between Bir, Dharamshala, Palampur, Shimla, Manali, Solan, etc?

## 3. Target user

### Primary user
People who want to spend meaningful time in Himachal and need help choosing a base.

### Early users
- remote workers
- freelancers
- creators
- solo builders
- urban professionals seeking a slower life
- Himachalis returning from metros
- people testing a 1–6 month move

## 4. Product promise

Find the Himachal town that fits your lifestyle, budget, and work needs.

## 5. V1 scope

### In scope
1. Town profiles
2. Town match quiz
3. Results / recommendation page
4. Compare towns page
5. Remote-work lens for each town
6. Practical guides / editorial content

### Out of scope
- housing marketplace
- jobs board
- community forum
- social network
- service marketplace
- booking engine
- real-time rental inventory
- relocation concierge
- chatbot-first experience

## 6. Core features

### 6.1 Town profiles
Each town page includes:
- summary
- vibe
- who it suits
- rough budget band
- internet suitability
- accessibility
- climate / seasonality
- family friendliness
- social energy vs quiet
- pros
- cons
- ideal stay type (short / medium / long-term)

### 6.2 Match quiz
Users answer a guided set of questions on:
- budget
- stay duration
- solo/couple/family
- internet importance
- social vs quiet preference
- cold vs moderate weather
- airport/train/road access needs
- tourist density tolerance
- family infrastructure importance
- work style

The app returns 3–5 best-fit towns with reasons and tradeoffs.

### 6.3 Compare towns
Users can compare shortlisted towns side by side.

### 6.4 Guides
Editorial pieces that help users make practical decisions.
Examples:
- vacation town vs real-life base
- living in Bir vs Dharamshala vs Palampur
- what people underestimate about moving to Himachal
- family move vs solo move

## 7. User journey

1. Land on homepage
2. Understand the promise in under 10 seconds
3. Start the quiz
4. Get matched towns
5. Explore town details
6. Compare options
7. Read practical guides
8. Save/share/come back later (later phase)

## 8. Design direction

- warm
- earthy
- local
- calm
- premium but not luxury-coded
- editorial clarity over flashy gimmicks

Keywords:
- cedar
- mud walls
- sunlit hills
- paper texture
- practical mountain intelligence

## 9. Content strategy

The product should feel like practical local wisdom, not generic travel content.

Tone:
- grounded
- thoughtful
- non-hype
- helpful
- emotionally resonant but practical

## 10. Monetization hypotheses

Not immediate V1 focus, but future paths include:
- premium move-planning guides
- relocation consultation / concierge
- housing / local service referrals
- featured local listings
- premium comparison tools
- memberships or city guides

## 11. Success criteria for V1

V1 is successful if users can:
1. understand the product quickly
2. complete the quiz easily
3. get recommendations that feel sensible
4. compare 3–5 towns intelligently
5. feel more clarity after using the product

## 12. Suggested stack

- Next.js
- Tailwind CSS
- TypeScript
- local structured data first
- Supabase later if needed
- Vercel for deployment

## 13. Risks

- becoming too broad too early
- slipping into generic content portal territory
- inaccurate town representation without good curation
- trying to monetize before utility is proven

## 14. Build sequence

### Phase 1
- homepage
- town dataset
- quiz flow
- results page
- town pages

### Phase 2
- compare page
- guides section
- richer copy and visuals

### Phase 3
- saved results
- email capture
- deeper town filters
- monetization experiments
