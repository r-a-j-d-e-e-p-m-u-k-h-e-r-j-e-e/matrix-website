const BRAND_TONE = {
  matrix: "[SYS]",
  american_club: "Certainly.",
  always_well: "Noted."
};

export const getConciergeResponse = async (userQuery, brandId, products) => {
  const trimmed = userQuery.trim();
  const terms = trimmed.toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = products.filter((product) => product.brand === brandId);
  const scored = filtered
    .map((product) => {
      const haystack = [
        product.name,
        product.category,
        product.collection,
        ...(product.tags || [])
      ]
        .join(" ")
        .toLowerCase();
      const score = terms.reduce((acc, term) => {
        return acc + (haystack.includes(term) ? 1 : 0);
      }, 0);
      return { product, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);

  const suggestions = scored
    .slice(0, 2)
    .map((product) => product.name)
    .join(" / ");

  const prefix = BRAND_TONE[brandId] || "";
  const suggestionText = suggestions ? ` Consider: ${suggestions}.` : "";

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `${prefix} Based on "${trimmed}", I can tailor a selection.${suggestionText}`.trim()
      );
    }, 900);
  });
};
