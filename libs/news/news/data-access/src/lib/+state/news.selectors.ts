import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NEWS_FEATURE_KEY, NewsState, newsAdapter } from './news.reducer';
import {selectRouteParams} from "@core/data-access";

// Lookup the 'News' feature state managed by NgRx
export const selectNewsState =
  createFeatureSelector<NewsState>(NEWS_FEATURE_KEY);

const { selectAll, selectEntities } = newsAdapter.getSelectors();

export const selectNewsStatus = createSelector(
  selectNewsState,
  (state: NewsState) => state.status
);

export const selectNewsError = createSelector(
  selectNewsState,
  (state: NewsState) => state.error
);

export const selectAllNews = createSelector(
  selectNewsState,
  (state: NewsState) => selectAll(state)
);

export const selectNewsEntities = createSelector(
  selectNewsState,
  (state: NewsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectNewsState,
  (state: NewsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectNewsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectCurrentPage = createSelector(
  selectNewsState,
  ({page}) => page
)

export const selectOpenedNewsItem = createSelector(
  selectRouteParams,
  selectNewsEntities,
  ({category, slug}, entities) => {
    const url = `${category}/${slug}`
    if(!entities) {
      return null
    }
    return Object.values(entities).find(entity => entity!.url === url)
  }
)
