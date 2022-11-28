interface ShareUrl {
  url: string;
  title?: string;
  hashtags?: string;
  recipient?: string;
  phoneNumber?: string;
}

interface Twitter {
  url: string;
  title?: string;
  hashtags?: string;
}

interface SMS {
  text?: string;
  phoneNumber?: string;
}

interface Email {
  url: string;
  title?: string;
  recipient?: string;
}

export const facebook = ({ url }: ShareUrl): string =>
  `https://www.facebook.com/sharer.php?u=${url}`;

export const reddit = ({ url, title }: ShareUrl): string =>
  `https://reddit.com/submit?url=${url}&title=${title}`;

export const twitter = ({ url, title, hashtags }: Twitter): string =>
  `https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=${hashtags}`;

export const linkedin = ({ url }: ShareUrl): string =>
  `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

export const whatsapp = ({ title, url }: ShareUrl): string =>
  `https://api.whatsapp.com/send?text=${title}&${url}`;

export const pinterest = ({ url }: ShareUrl): string =>
  `http://pinterest.com/pin/create/button/?url=${url}`;

export const pocket = ({ url }: ShareUrl): string =>
  `https://getpocket.com/edit?url=${url}`;

export const skype = ({ url, title }: ShareUrl): string =>
  `https://web.skype.com/share?url=${url}&text=${title}`;

export const telegram = ({ url, title }: ShareUrl): string =>
  `https://t.me/share/url?url=${url}&text=${title}`;

export const email = ({ recipient, title, url }: Email): string => {
  if (recipient) {
    return `mailto:${recipient}?subject=${title}&body=${url}`;
  }
  return `mailto?subject=${title}&body=${url}`;
};

export const sms = ({ phoneNumber, text }: SMS): string => {
  return phoneNumber ? `sms:${phoneNumber}&body=${text}` : `sms:body=${text}`;
};
