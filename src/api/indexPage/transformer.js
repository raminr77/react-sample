import { removeUndefinedFromObject } from 'utils/object';

export const indexPageTransformer = ({ data }) => {
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
