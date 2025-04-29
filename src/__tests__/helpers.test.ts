import { getShareUrl } from '@/shared/helpers';

describe('Helpers', () => {
  it('getShareUrl: Should return the share URL of the social networks.', () => {
    const title = 'React Sample';
    const url = 'https://react-sample.ir';
    const telegramResult = `https://t.me/share/url?url=${url}&text=${title}`;
    const whatsappResult = `https://api.whatsapp.com/send?text=${title}&${url}`;

    expect(getShareUrl.whatsapp({ url, title })).toBe(whatsappResult);
    expect(getShareUrl.telegram({ url, title })).toBe(telegramResult);
  });
});
