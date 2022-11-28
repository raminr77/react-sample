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

export const facebook = ({ url }: ShareUrl) =>
  `https://www.facebook.com/sharer.php?u=${url}`;

export const reddit = ({ url, title }: ShareUrl) =>
  `https://reddit.com/submit?url=${url}&title=${title}`;

export const twitter = ({ url, title, hashtags }: Twitter) =>
  `https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=${hashtags}`;

export const linkedin = ({ url }: ShareUrl) =>
  `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

export const whatsapp = ({ title, url }: ShareUrl) =>
  `https://api.whatsapp.com/send?text=${title}&${url}`;

export const pinterest = ({ url }: ShareUrl) =>
  `http://pinterest.com/pin/create/button/?url=${url}`;

export const pocket = ({ url }: ShareUrl) => `https://getpocket.com/edit?url=${url}`;

export const skype = ({ url, title }: ShareUrl) =>
  `https://web.skype.com/share?url=${url}&text=${title}`;

export const telegram = ({ url, title }: ShareUrl) =>
  `https://t.me/share/url?url=${url}&text=${title}`;

export const email = ({ recipient, title, url }: Email) => {
  if (recipient) {
    return `mailto:${recipient}?subject=${title}&body=${url}`;
  }
  return `mailto?subject=${title}&body=${url}`;
};

export const sms = ({ phoneNumber, text }: SMS) => {
  return phoneNumber ? `sms:${phoneNumber}&body=${text}` : `sms:body=${text}`;
};
