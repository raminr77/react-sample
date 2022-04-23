export const facebook = ({ url }) => `https://www.facebook.com/sharer.php?u=${url}`;
export const reddit = ({ url, title = 'DigiKala' }) =>
  `https://reddit.com/submit?url=${url}&title=${title}`;
export const twitter = ({ url, title, hashtags = 'digikala' }) =>
  `https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=${hashtags}`;
export const linkedin = ({ url }) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
export const whatsapp = ({ title, url }) => `https://api.whatsapp.com/send?text=${title}&${url}`;
export const pinterest = ({ url }) => `http://pinterest.com/pin/create/button/?url=${url}`;
export const pocket = ({ url }) => `https://getpocket.com/edit?url=${url}`;
export const skype = ({ url, title }) => `https://web.skype.com/share?url=${url}&text=${title}`;
export const telegram = ({ url, title }) => `https://t.me/share/url?url=${url}&text=${title}`;
export const email = ({ title, url }) => `mailto?subject=${title}&body=${url}`;
export const emailWithRecipient = ({ recipient, title, url }) =>
  `mailto:${recipient}?subject=${title}&body=${url}`;
export const sms = ({ phoneNumber, text }) =>
  phoneNumber ? `sms:${phoneNumber}&body=${text}` : `sms:body=${text}`;
