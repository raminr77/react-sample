import { apiRequestObject } from 'utils/api';
import { REQUEST_TYPE } from 'constants/RequestType';
import { removeUndefinedFromObject } from 'utils/object';

const url = '/photos/';

export const transformer = ({
  data
}: {
  data: {
    url: string;
    title: string;
    albumId: number;
  }[];
}) => {
  // change or convert response
  return data?.slice(0, 5)?.map((item) =>
    removeUndefinedFromObject({
      // just 5 item
      title: item.title || '',
      url: item.url || '',
      album: item.albumId === 1 ? 'A' : 'B'
    })
  );
};

export const getIndexPageData = apiRequestObject({
  url,
  type: REQUEST_TYPE.GET,
  inputTransformer: ({ albumId }: { albumId: number }) => ({
    // change or convert your data
    albumId
  }),
  transformer // change or convert response
});
