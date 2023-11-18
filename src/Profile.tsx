import React from 'react';
import styled from 'styled-components';
import { Button } from 'monday-ui-react-core';

export const Profile: React.FC<any> = ({ artist, large }) => {
  return (
    <UserDetails>
      <Avatar src={artist.image_url} size={large ? 'l' : 's'}/>
      <Description>
        <ArtistName>{artist.name}</ArtistName>
        <ArtistHandle>@{artist.id}</ArtistHandle>
        {
          !large &&
          <ArtistTweets>{artist.tweets.length} tweets</ArtistTweets>
        }
        {
          large &&
          <Button kind={Button.kinds.PRIMARY}
                  size={Button.sizes.SMALL}
                  onClick={() => window.open(`https://twitter.com/${artist.id}`, '_blank')}>
            View twitter page
          </Button>
        }
      </Description>
    </UserDetails>
  );
}

const UserDetails = styled.div`
          display: flex;
          flex-direction: row;
  margin-bottom:16px;
  `,
  Description = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  Avatar = styled.img<{ size: 's' | 'm' | 'l' }>`
    border-radius: 50%;
    margin-right: 16px;
    width: ${({ size }) => size === 's' ? '100px' : '180px'};
    height: ${({ size }) => size === 's' ? '100px' : '180px'};
  `,
  ArtistName = styled.div`
    font-size: 1.5em;
    font-weight: 700;
    margin-bottom: 4px;
  `,
  ArtistHandle = styled.div`
    font-size: 1em;
    font-weight: 300;
    margin-bottom: 8px;
  `,
  ArtistTweets = styled.div`
    font-size: 1em;
    font-weight: 700;
    margin-bottom: 8px;
  `;
