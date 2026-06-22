import menstrualCycle from './menstrual-cycle';
import pcosConditions from './pcos-conditions';
import fertility from './fertility';
import perimenopause from './perimenopause';
import mentalWellbeing from './mental-wellbeing';
import lifeCulture from './life-culture';

export const ALL_ARTICLES = [
  ...menstrualCycle,
  ...pcosConditions,
  ...fertility,
  ...perimenopause,
  ...mentalWellbeing,
  ...lifeCulture,
];

export function getArticle(categoryId, articleId) {
  return ALL_ARTICLES.find((a) => a.categoryId === categoryId && a.id === articleId);
}
