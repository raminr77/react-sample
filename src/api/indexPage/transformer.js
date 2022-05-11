export const indexPageTransformer = ({ data }) => {
  // change or convert response
  return data.map((item) => ({
    title: item.title || '',
    description: item.body || null
  }));
};
