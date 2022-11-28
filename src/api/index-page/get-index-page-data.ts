import { apiRequestObject } from 'utils/api';
import { REQUEST_TYPES } from 'constants/request-types';
import { removeUndefinedFromObject } from 'utils/object';

const API_URL = '/photos/';

export const transformer = ({ data }: any) => {
  // change or convert response
  return data?.slice(0, 5)?.map(({ title, url, albumId }: any) =>
    removeUndefinedFromObject({
      // just 5 item
      url,
      title,
      album: albumId === 1 ? 'A' : 'B'
    })
  );
};

export const getIndexPageData = apiRequestObject({
  url: API_URL,
  type: REQUEST_TYPES.GET,
  inputTransformer: ({ albumId }: { albumId: number }) => ({
    // change or convert your data
    albumId
  }),
  transformer // change or convert response
});
