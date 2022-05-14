import { apiRequestObject } from 'utils/api';
import { REQUEST_TYPE } from 'constants/RequestType';
import { INDEX_PAGE_EP } from 'api/indexPage/endpoints';
import { indexPageTransformer } from 'api/indexPage/transformer';

export const getIndexPageData = apiRequestObject({
  url: INDEX_PAGE_EP,
  type: REQUEST_TYPE.GET,
  inputTransformer: ({ albumId }) => ({
    // change or convert your data
    albumId
  }),
  transformer: indexPageTransformer // change or convert response
});
