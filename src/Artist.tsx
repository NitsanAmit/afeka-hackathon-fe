import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tweet } from './Tweet';
import { FirebaseContext } from './FirebaseContext';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from 'monday-ui-react-core';
import { DropdownChevronLeft } from 'monday-ui-react-core/icons';
import { AppHeader } from './AppHeader';
import { Profile } from './Profile';
import styled from 'styled-components';

export const Artist: React.FC<any> = () => {
  const params = useParams();
  const documentId = params.id;

  const firebaseContext = useContext(FirebaseContext);
  const firestore = firebaseContext?.firestore;

  const [artist, setArtist] = React.useState<{ tweets: [], name: string, id: string }>();
  useEffect(() => {
    if (!firestore || !documentId) {
      return;
    }
    const artistDocument = doc(firestore, 'artists', documentId);
    getDoc(artistDocument).then((snapshot: any) => {
      setArtist({ ...snapshot.data(), id: snapshot.id });
    });
  }, [documentId, firestore, setArtist]);

  return artist ? (
    <>
      <AppHeader/>
      <HeaderContainer>
        <ButtonContainer>
          <Button leftIcon={DropdownChevronLeft}
                  kind={Button.kinds.TERTIARY}
                  onClick={() => window.history.back()}>Back to artists</Button>
        </ButtonContainer>
        <Profile artist={artist} large/>
      </HeaderContainer>
      <Tweets>
        <h2>{artist.tweets.length} tweets:</h2>
        <br/>
      {
        artist && artist.tweets.map((tweet: any) => {
          return (
            <Tweet key={tweet.id} tweet={tweet} statusId={tweet.id}/>
          )
        })
      }
      </Tweets>
    </>
  ) : null;
}

const HeaderContainer = styled.div`
          display: flex;
          flex-direction: column;
          padding: 32px 48px;
  `,
  ButtonContainer = styled.div`
    display: flex;
    margin-bottom: 32px;
  `,
  Tweets = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
    padding: 32px;
    @media (min-width: 1100px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `;
