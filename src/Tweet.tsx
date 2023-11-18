import { memo, useEffect } from 'react';
import { Badge, Chips } from 'monday-ui-react-core';

const relatedWords = [
  'israel',
  'jewish',
  'hamas',
  'palastine',
  'genocide',
  'zionist',
  'allah',
  'ceasefire',
  'gaza',
  'الله',
  'فلسطين',
  'إسرائيل',
  'حماس',
]
const TweetComponent: React.FC<any> = ({ tweet }) => {

  const hasHarmfulContent = relatedWords.filter(word => tweet.text.includes(word) || tweet.ref_text?.includes(word)).length > 0;
  const statusId = tweet?.id;
  useEffect(() => {
    // @ts-ignore
    if (!window.twttr || !window.twttr.widgets || !statusId) {
      return;
    }
    // @ts-ignore
    window.twttr.widgets
      .createTweet(statusId, document.getElementById(`tweet-${statusId}`))
      .catch(console.log);
  }, [statusId]);

  return (
    <div id={`tweet-${statusId}`}>
      {
        hasHarmfulContent &&
        <Chips label="Harmful content" color={Chips.colors.NEGATIVE} readOnly/>
      }
    </div>
  )
}

export const Tweet = memo(TweetComponent);
