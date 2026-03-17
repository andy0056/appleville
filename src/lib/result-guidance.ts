type QuizAnswersLike = Partial<Record<string, string>>;
type TownLike = {
  slug: string;
};

export function getRelatedGuideSlugsForResultSet(
  answers: QuizAnswersLike,
  towns: TownLike[],
) {
  const slugs: string[] = [];
  const topTownSlugs = towns.slice(0, 3).map((town) => town.slug);

  if (answers.persona === "family" || answers.priority === "family") {
    slugs.push("best-himachal-towns-for-families");
  }

  if (answers.priority === "remote" || answers.internet === "non-negotiable") {
    slugs.push("best-himachal-towns-for-remote-workers");
  }

  if (
    topTownSlugs.includes("bir") &&
    topTownSlugs.includes("dharamshala") &&
    topTownSlugs.includes("palampur")
  ) {
    slugs.push("bir-vs-dharamshala-vs-palampur");
  }

  if (
    answers.pace === "quiet" ||
    answers.tourismTolerance === "low" ||
    answers.optimizeFor === "deep-work"
  ) {
    slugs.push("quiet-vs-social-towns-in-himachal");
  }

  if (
    answers.stayLength === "extended" ||
    answers.stayLength === "long" ||
    answers.optimizeFor === "home-base"
  ) {
    slugs.push("vacation-town-vs-real-life-base");
    slugs.push("how-to-test-a-move-before-committing");
  }

  return Array.from(new Set(slugs)).slice(0, 2);
}
