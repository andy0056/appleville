export type GuideSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  useCase: "shortlist" | "remote-work" | "family" | "trial-move" | "fit-basics";
  bestWhen: string;
  intro: string;
  sections: GuideSection[];
  takeaways?: string[];
  relatedTownSlugs?: string[];
};

export const guides: Guide[] = [
  {
    slug: "vacation-town-vs-real-life-base",
    title: "Vacation town vs real-life base in Himachal",
    summary:
      "How to tell whether a beautiful Himachal stop can actually support your weekday life.",
    category: "Decision-making",
    useCase: "fit-basics",
    bestWhen: "You are trying to separate mountain fantasy from everyday fit.",
    intro:
      "Many Himachal towns are easy to love for a week. The harder question is whether the same place still works once you add calls, errands, weather shifts, sleep, and the fifth ordinary Tuesday.",
    takeaways: [
      "Scenery and fit are not the same thing.",
      "Routine usually matters more after week two than it does on day two.",
      "Choose the kind of friction you can live with, not the place that photographs best.",
    ],
    sections: [
      {
        title: "What changes after the first week",
        paragraphs: [
          "The first few days reward novelty. You notice the views, the air, the walk to a cafe, and the relief of being out of your old routine.",
          "By week two, the questions get plainer. Can you take calls without strain? Is the home setup good enough for real work? Does the town still feel right once grocery runs, transport, and noise patterns become part of the day?",
        ],
        bullets: [
          "Noise at night and in the early morning",
          "Time spent on groceries, taxis, and basic errands",
          "Whether the home setup can carry a full workday",
          "How the town feels on an ordinary weekday instead of a lively weekend",
        ],
      },
      {
        title: "What a real-life base needs",
        paragraphs: [
          "A workable base usually needs more than a nice market or a strong first impression. It needs enough structure that your days do not keep slipping off balance.",
          "If you rely on remote income or you are moving with family, backup plans matter almost as much as the main plan. A place feels very different once you need reliability more than inspiration.",
        ],
        bullets: [
          "A home setup you trust for long work blocks",
          "Road access that does not feel punishing every week",
          "Enough daily services to reduce avoidable friction",
          "A pace you still like after the novelty wears off",
        ],
      },
      {
        title: "How the current towns separate",
        paragraphs: [
          "Bir, McLeodganj, and Manali often win on first-impression energy. They feel alive quickly, but they can also bring more distraction, crowding, and season-driven swing.",
          "Palampur, Solan, and often Dharamshala or Shimla reveal their value later. They are less cinematic on day one and often more supportive by month two, especially if work or family routine matters.",
          "Naggar is beautiful and quiet, but it asks for a more intentional setup than many first-time movers expect.",
        ],
      },
      {
        title: "A better shortlist question",
        paragraphs: [
          "Instead of asking which town is best, ask which kind of friction you can absorb without resenting the place.",
        ],
        bullets: [
          "Do I need social energy, or protection from it?",
          "Do I want a usable base first, or a memorable atmosphere first?",
          "Am I optimizing for deep work, family routine, or a shorter reset?",
          "Would I still choose this town if the weather, road, or housing setup were only decent instead of magical?",
        ],
      },
    ],
    relatedTownSlugs: ["bir", "dharamshala", "palampur", "manali", "solan"],
  },
  {
    slug: "bir-vs-dharamshala-vs-palampur",
    title: "Bir vs Dharamshala vs Palampur",
    summary:
      "Three Kangra-area options, three different answers to pace, access, and long-stay fit.",
    category: "Town comparisons",
    useCase: "shortlist",
    bestWhen: "These three towns are already on your shortlist and you need clearer separation.",
    intro:
      "These towns often land on the same shortlist because they sit in the same broader region. In practice, they solve different problems, and the wrong choice usually comes from reading them as slight variations of one another.",
    takeaways: [
      "Bir is lighter, more social, and better for a shorter or more fluid chapter.",
      "Dharamshala is the safest all-rounder if you need balance and access.",
      "Palampur tends to make the most sense once steadiness matters more than scene.",
    ],
    sections: [
      {
        title: "Fast read",
        paragraphs: [
          "If you only need the short version: Bir is the most buoyant, Dharamshala is the most balanced, and Palampur is the most grounded.",
        ],
        bullets: [
          "Bir: easier social overlap, more visual pull, less rooted calm",
          "Dharamshala: better mix of services, movement, and longer-stay usability",
          "Palampur: quieter, greener, and often easier to trust for slower living",
        ],
      },
      {
        title: "Bir: when the lighter chapter is the point",
        paragraphs: [
          "Bir works for people who want inspiration, casual overlap, and a more mobile-feeling phase of mountain life. It can be especially attractive if social energy helps you feel settled rather than distracted.",
          "What it does not really give you is deep stillness. If your ideal month looks quiet, rooted, and steady, Bir can start to feel more like a scene than a base.",
        ],
      },
      {
        title: "Dharamshala: when balance matters most",
        paragraphs: [
          "Dharamshala is often the safer answer because it can hold more than one need at once. It has more services, more everyday structure, and more neighborhood variation than smaller towns in the same orbit.",
          "It is not the quietest or the simplest option, but that is often exactly why it works. If you want a town that stays usable after the romance fades, Dharamshala usually deserves a serious look.",
        ],
      },
      {
        title: "Palampur: when steadiness beats scene",
        paragraphs: [
          "Palampur often fits people who realize they want routine, green space, and lower tourist pressure more than they want a strong social layer around them. It feels less performed and more lived-in.",
          "That same grounded quality can feel too quiet if you are hoping the town itself will provide momentum. Palampur tends to work best when you are ready to bring your own rhythm.",
        ],
      },
      {
        title: "How to choose between them",
        paragraphs: [
          "The real question is not which town is better. It is which tradeoff profile fits the next phase of your life.",
        ],
        bullets: [
          "Pick Bir if lighter energy and overlap matter more than rooted calm.",
          "Pick Dharamshala if you need balance, access, and a safer all-round bet.",
          "Pick Palampur if everyday livability matters more than buzz.",
          "Be careful with Bir if you already know you need silence.",
          "Be careful with Palampur if you want the town to generate social life for you.",
          "Be careful with Dharamshala if you romanticize either deep quiet or village-scale simplicity.",
        ],
      },
    ],
    relatedTownSlugs: ["bir", "dharamshala", "palampur"],
  },
  {
    slug: "what-people-underestimate-about-moving-to-himachal",
    title: "What people underestimate about moving to Himachal",
    summary:
      "A grounded look at access, routine friction, seasonality, and expectations.",
    category: "Relocation reality",
    useCase: "fit-basics",
    bestWhen: "You are getting serious about a move and want the hidden friction surfaced early.",
    intro:
      "The biggest mistake is usually not choosing the wrong pretty town. It is assuming daily life in the hills will be simpler than it is, or that beauty will cancel out every other inconvenience.",
    takeaways: [
      "Friction compounds quietly when you live with it every week.",
      "Access matters differently when plans change or someone needs support.",
      "Seasonality can change both mood and practicality more than expected.",
    ],
    sections: [
      {
        title: "Friction compounds quietly",
        paragraphs: [
          "A single inconvenience rarely ruins a move. Repeated inconvenience does. The extra transport step, the inconsistent work setup, the longer errand loop, and the noisier-than-expected stretch all feel small until they become your baseline.",
          "This is why people can enjoy a town deeply and still realize it is not right for a longer chapter.",
        ],
      },
      {
        title: "Access changes meaning once you live there",
        paragraphs: [
          "Access is not only about how exciting the drive looks or whether you can tolerate it once. It becomes more important when work shifts suddenly, family visits increase, or health and logistics stop being abstract questions.",
          "That is one reason places like Dharamshala, Shimla, and Solan can feel more useful over time, even if they are not the most romantic first choice.",
        ],
      },
      {
        title: "Seasons change the town you think you picked",
        paragraphs: [
          "A place that feels open and energizing in one month can feel slow, cold, crowded, or inconvenient in another. That does not make the town bad. It just means the experience is more seasonal than many newcomers assume.",
          "This is especially important if you work remotely, travel often, or are deciding based on a short first visit.",
        ],
      },
      {
        title: "Test before you commit",
        paragraphs: [
          "A short, structured trial stay usually teaches more than a romantic long weekend.",
        ],
        bullets: [
          "Test weekday routine, not only cafes and viewpoints",
          "Try the town in the part of the year you actually expect to live there",
          "Check where work, groceries, transport, and rest become easy or hard",
          "Keep your first commitment light enough that you can change course",
        ],
      },
    ],
    relatedTownSlugs: ["dharamshala", "palampur", "shimla", "solan", "manali"],
  },
  {
    slug: "best-himachal-towns-for-remote-workers",
    title: "Best Himachal towns for remote workers",
    summary:
      "There is no single best remote-work town in Himachal. The better question is what kind of workday you need the town to support.",
    category: "Remote work",
    useCase: "remote-work",
    bestWhen: "Remote-work reliability or workday shape is driving the shortlist.",
    intro:
      "Remote workers often start with scenery and then get corrected by daily rhythm. The right town depends on whether you need low friction, social overlap, quiet concentration, or easier access to the rest of India.",
    takeaways: [
      "Dharamshala is the safest all-round remote-work bet in the current set.",
      "Shimla and Solan make sense when access and practicality outrank romance.",
      "Bir, Palampur, and Naggar fit more specific work styles rather than everyone.",
    ],
    sections: [
      {
        title: "Start with your workday, not the postcard",
        paragraphs: [
          "A strong remote-work town is not only about internet or scenery. It is about whether the town helps you repeat a good day often enough.",
          "If your work depends on calls, meetings, client responsiveness, or frequent travel, you will usually want a different setup than someone doing long solo work blocks.",
        ],
      },
      {
        title: "Lower-friction remote-work options",
        paragraphs: [
          "Dharamshala is often the best all-round answer because it gives you more daily structure without feeling purely utilitarian. It is easier to build a routine there than in more tourism-shaped or more tucked-away places.",
          "Solan and Shimla also deserve serious attention. Solan is especially good if practical access and a no-drama daily base matter most. Shimla works for people who can tolerate a busier hill-city rhythm in exchange for stronger systems and services.",
        ],
      },
      {
        title: "Social or creative remote-work options",
        paragraphs: [
          "Bir can be excellent if energy from other people helps you work. It is easier to drop into a social rhythm there than in quieter towns, and that matters for solo workers who do not want to feel cut off.",
          "McLeodganj and Manali are more situational. They can work for shorter bursts, flexible routines, or people who do not need low-stimulation focus every day. They are less convincing as default answers for deep, steady work.",
        ],
      },
      {
        title: "Quieter deep-work options",
        paragraphs: [
          "Palampur suits remote workers who want home rhythm more than cafe rhythm. It is often stronger for people who like working from a stable base and do not need a visible scene around them.",
          "Naggar can suit reflective or creative work if your setup is already dependable. The tradeoff is that beauty and quiet come with a thinner support layer and less everyday flexibility.",
        ],
      },
      {
        title: "A shortlist that matches your work style",
        paragraphs: [
          "Once you know what kind of workday you protect best, the shortlist gets much easier.",
        ],
        bullets: [
          "Calls, clients, and access: start with Dharamshala, Solan, or Shimla.",
          "Creative overlap and lighter social energy: start with Bir.",
          "Deep work and calmer long stays: start with Palampur, then consider Naggar.",
          "Shorter scenic burst with flexible routine: consider Manali or McLeodganj carefully.",
        ],
      },
    ],
    relatedTownSlugs: ["dharamshala", "solan", "shimla", "bir", "palampur", "naggar"],
  },
  {
    slug: "best-himachal-towns-for-families",
    title: "Best Himachal towns for families",
    summary:
      "Family fit in Himachal is less about the prettiest town and more about access, routine, and whether everyday life feels manageable.",
    category: "Family fit",
    useCase: "family",
    bestWhen: "Family routine, access, and day-to-day manageability matter more than scene.",
    intro:
      "Families usually need a steadier answer than solo travelers or short-stay remote workers. The right town often comes down to services, travel ease, school options, and whether daily life feels calm in a useful way, not just a scenic way.",
    takeaways: [
      "Shimla, Dharamshala, and Solan are the safer practical bets in the current set.",
      "Palampur can be excellent for families who want calm and can trade scene for routine.",
      "Bir, McLeodganj, Manali, and Naggar are usually better as phases than default family bases.",
    ],
    sections: [
      {
        title: "What families usually need first",
        paragraphs: [
          "Family life raises the bar on what counts as workable. A town has to carry school needs, healthcare questions, shopping, transport, and mood, not just one person's idea of a good mountain life.",
        ],
        bullets: [
          "Predictable access and errands",
          "Enough services to reduce avoidable stress",
          "A pace that feels calm without becoming isolating",
          "Housing and neighborhood options that make routine easier",
        ],
      },
      {
        title: "Safer practical fits",
        paragraphs: [
          "Shimla, Dharamshala, and Solan usually make the strongest first shortlist for families because they bring more systems with them. They are not identical, but all three tend to offer more structure than the more scene-led or slower towns.",
          "Shimla is strongest if institutional depth matters most. Dharamshala is often the more balanced option if you want usable infrastructure with a less urban feel. Solan is especially good for families who value easier connectivity and a more pragmatic base.",
        ],
      },
      {
        title: "Slower but strong for the right family",
        paragraphs: [
          "Palampur can be a very good family town if what you want is calmer routine, greener surroundings, and lower tourist pressure. It works best for families who do not need the town itself to generate constant activity.",
          "The main caution is that its strength is steadiness, not range. If you want more movement, institutions, or faster access, Dharamshala, Solan, or Shimla may feel safer.",
        ],
      },
      {
        title: "More situational fits",
        paragraphs: [
          "Bir, McLeodganj, Manali, and Naggar can all appeal for understandable reasons, but they are usually more conditional family choices. Bir is lighter and more scene-shaped, McLeodganj is busier and denser, Manali is more tourism-driven, and Naggar is quieter but less practical.",
          "That does not mean families never choose them. It means the fit depends more heavily on existing familiarity, a specific neighborhood, or a very intentional lifestyle choice.",
        ],
      },
      {
        title: "What to test before deciding",
        paragraphs: [
          "If family fit is the question, visit with weekday reality in mind.",
        ],
        bullets: [
          "How long routine errands actually take",
          "How the area feels at school-run hours and after dark",
          "Whether backup options exist when plans go wrong",
          "How much of the town's appeal depends on one season or one pocket",
        ],
      },
    ],
    relatedTownSlugs: ["shimla", "dharamshala", "solan", "palampur"],
  },
  {
    slug: "how-to-test-a-move-before-committing",
    title: "How to test a move before committing",
    summary:
      "Use a short, structured trial stay to test fit before you sign a longer lease or shift your routines.",
    category: "Move planning",
    useCase: "trial-move",
    bestWhen: "You want a disciplined trial stay instead of guessing from a short first visit.",
    intro:
      "A trial stay is most useful when you treat it like fieldwork instead of a preview vacation. The goal is not to fall in love quickly. It is to learn what the town asks from you when life is ordinary.",
    takeaways: [
      "Test weekdays, not just weekends or cafe mood.",
      "Compare two places or two neighborhoods if you can.",
      "Keep the first commitment light enough that changing course stays easy.",
    ],
    sections: [
      {
        title: "Treat the first stay as fieldwork",
        paragraphs: [
          "Pick a stay length long enough for routine to show up. Even two to three weeks tells you far more than a long weekend.",
          "Go in with questions. What kind of home setup do you need? How often do you need to travel? What level of quiet helps you work or parent well? Without those questions, almost any scenic town can feel like a yes for a few days.",
        ],
      },
      {
        title: "Test weekdays, not just mood",
        paragraphs: [
          "Plan the stay around real tasks. Work full days. Shop for basics. Take the calls you would normally take. Try local transport on an ordinary morning instead of a relaxed travel day.",
        ],
        bullets: [
          "Run a normal work schedule at least three times",
          "Check grocery, pharmacy, and cash access",
          "Test how the area feels early morning, mid-day, and after dark",
          "Notice whether the town calms or drains you after several regular days",
        ],
      },
      {
        title: "Compare two places or two pockets",
        paragraphs: [
          "If you can, do not test only one option. Comparing two towns, or even two neighborhoods in the same town, sharpens judgment quickly.",
          "This is especially useful in places like Dharamshala, Shimla, or Manali where the experience can shift a lot across different pockets.",
        ],
      },
      {
        title: "Delay commitments that are hard to unwind",
        paragraphs: [
          "The first pass should keep your exit easy. Avoid turning a promising first stay into a long lease, a full relocation, or a big emotional commitment too early.",
          "A good test stay should reduce fantasy and increase clarity. If it mainly increases urgency, slow down.",
        ],
      },
      {
        title: "What a good trial stay tells you",
        paragraphs: [
          "You do not need total certainty at the end. You need enough evidence to know whether the town deserves a second, deeper test or should leave the shortlist.",
        ],
        bullets: [
          "Would I repeat this weekday rhythm for two months?",
          "Did the town get easier or harder after the novelty dropped?",
          "What kind of friction showed up, and can I live with it?",
          "Do I want a second pass here, or am I forcing the match?",
        ],
      },
    ],
    relatedTownSlugs: ["dharamshala", "palampur", "solan", "bir"],
  },
  {
    slug: "quiet-vs-social-towns-in-himachal",
    title: "Quiet vs social towns in Himachal",
    summary:
      "In Himachal, quiet versus social is often the bigger choice than town size. It shapes work rhythm, mood, and how long you want to stay.",
    category: "Lifestyle fit",
    useCase: "shortlist",
    bestWhen: "Your real question is whether you need protected quiet or more visible social energy.",
    intro:
      "People often describe towns as scenic, practical, or touristy. In everyday life, the more important split is often simpler: does the place protect your attention, or keep pulling it outward?",
    takeaways: [
      "McLeodganj, Bir, and Manali carry the most visible social energy in the current set.",
      "Palampur and Naggar protect quiet better, but in different ways.",
      "Dharamshala and Shimla sit closer to the middle for different reasons.",
    ],
    sections: [
      {
        title: "Quiet versus social is really about stimulation",
        paragraphs: [
          "This is not only about crowd size. A town can be small and still feel socially intense, or larger and still feel emotionally manageable.",
          "The real question is how much the place interrupts you, feeds you, or asks something from your nervous system on a normal day.",
        ],
      },
      {
        title: "More social options",
        paragraphs: [
          "McLeodganj, Bir, and Manali usually sit on the more social end. They offer movement, visibility, and easier overlap with other travelers or remote workers, but that same energy can dilute routine.",
          "These towns work best when you either want that outward pull or know how to protect your own boundaries inside it.",
        ],
      },
      {
        title: "Middle-ground options",
        paragraphs: [
          "Dharamshala and Shimla sit closer to the middle, though they get there differently. Dharamshala is more layered and mixed. Shimla is more urban-hill and structured.",
          "Both can feel social enough to avoid isolation without demanding that you participate in a scene all the time.",
        ],
      },
      {
        title: "Quieter options",
        paragraphs: [
          "Palampur and Naggar protect quiet more naturally. Palampur does it through steadier daily life and lower tourist pressure. Naggar does it through slower pace and a thinner support layer.",
          "Solan is also quieter in a practical way, though not in a scenic-retreat way. It is better read as low-drama than poetic quiet.",
        ],
      },
      {
        title: "Pick the pace your routine can recover in",
        paragraphs: [
          "A socially alive town can feel energizing for one person and exhausting for another. A quieter town can feel restorative or flat, depending on what you need from this phase of life.",
        ],
        bullets: [
          "If you recharge around people, start with Bir or Dharamshala.",
          "If you need culture and visible community, consider McLeodganj carefully.",
          "If you want calm first, start with Palampur or Naggar.",
          "If you want low-drama practicality more than either buzz or poetry, consider Solan.",
        ],
      },
    ],
    relatedTownSlugs: ["mcleodganj", "bir", "manali", "dharamshala", "palampur", "naggar", "solan"],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
