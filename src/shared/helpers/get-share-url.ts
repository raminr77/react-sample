interface ShareUrl {
  url: string;
  title: string;
}

interface Twitter {
  url: string;
  title: string;
  hashtags?: string;
}

interface SMS {
  text: string;
  phoneNumber?: string;
}

interface Email {
  url: string;
  title: string;
  recipient?: string;
}

const facebook = ({ url, title }: ShareUrl): string =>
  `https://www.facebook.com/sharer.php?u=${url}&title=${title}`;

const reddit = ({ url, title }: ShareUrl): string =>
  `https://reddit.com/submit?url=${url}&title=${title}`;

const twitter = ({ url, title, hashtags }: Twitter): string =>
  `https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=${hashtags}`;

const linkedin = ({ url, title }: ShareUrl): string =>
  `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`;

const whatsapp = ({ title, url }: ShareUrl): string =>
  `https://api.whatsapp.com/send?text=${title}&${url}`;

const pinterest = ({ url, title }: ShareUrl): string =>
  `http://pinterest.com/pin/create/button/?url=${url}&title=${title}`;

const telegram = ({ url, title }: ShareUrl): string =>
  `https://t.me/share/url?url=${url}&text=${title}`;

const email = ({ recipient, title, url }: Email): string => {
  if (recipient) {
    return `mailto:${recipient}?subject=${title}&body=${url}`;
  }
  return `mailto?subject=${title}&body=${url}`;
};

const sms = ({ phoneNumber, text }: SMS): string => {
  return phoneNumber ? `sms:${phoneNumber}&body=${text}` : `sms:body=${text}`;
};

export const getShareUrl = {
  sms,
  email,
  reddit,
  twitter,
  linkedin,
  facebook,
  telegram,
  whatsapp,
  pinterest
};
