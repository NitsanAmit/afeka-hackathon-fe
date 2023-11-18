import React, { useContext, useEffect } from 'react';
import './App.css';
import { FirebaseContext } from './FirebaseContext';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import styled from 'styled-components';
import { Box, Tab } from 'monday-ui-react-core';
import { Tweet } from './Tweet';
import { AppHeader } from './AppHeader';
import { Profile } from './Profile';

export const HomeComponent: React.FC = () => {
  const firebaseContext = useContext(FirebaseContext);
  const firestore = firebaseContext?.firestore;

  const [artists, setArtists] = React.useState([]);

  useEffect(() => {
    console.log('loading artists', artists, firestore);
    if (!firestore) {
      return;
    }
    const artistsCollection = collection(firestore, 'artists');
    getDocs(artistsCollection).then((snapshot: any) => {
      const artists: any = [];
      snapshot.forEach((doc: any) => {
        artists.push({ ...doc.data(), id: doc.id });
      });
      setArtists(artists);
    });
  }, [artists, firestore, setArtists]);

  return artists ? (
    <HomeContainer>
      <AppHeader/>
      <StyledTabList>
        <StyledTab active>
          Artists
        </StyledTab>
        <StyledTab>
          About us
        </StyledTab>
        <StyledTab>
          Contact us
        </StyledTab>
      </StyledTabList>
      <MissionStatement>
        In response to a letter signed by 8,000 artists blaming Israel of genocide and ignoring the terrorist acts done
        by Hamas, we have embarked on a decisive initiative to confront and eradicate anti-Semitism and xenophobia in
        the art world—a realm where such prejudices have no place. With the Jewish community being a pivotal supporter
        of the fine arts, In collaboration with a group of philanthropists from all over the world. We are deploying a
        sophisticated system to scrutinize the social media activities of these artists. Leveraging advanced machine
        learning techniques, we aim to systematically identify, analyze, and document any instances of hate speech and
        anti-Semitic content. This vital information will be showcased on a dedicated platform, providing essential
        insights to museums, galleries, and art patrons globally. Our mission is clear: to actively dismantle the spread
        of bigotry and intolerance in the art sector, ensuring it remains a space of diversity, respect, and cultural
        dialogue.
      </MissionStatement>
      <ArtistsList>
        {
          artists.map((artist: any) => {
            return (
              <StyledLink to={`/artist/${artist.id}`} state={{ artist }}>
                <StyledBox
                  key={artist.id}
                  border={Box.borders.DEFAULT}
                  rounded={Box.roundeds.MEDIUM}
                  backgroundColor={Box.backgroundColors.GREY_BACKGROUND_COLOR}>
                  <StyledProfile artist={artist}/>
                  {
                    artist.tweets?.[0]?.id &&
                    <Tweet key={artist.tweets[0].id} tweet={artist.tweets[0]} />
                  }
                </StyledBox>
              </StyledLink>
            )
          })
        }
      </ArtistsList>
    </HomeContainer>
  ) : null;
}

export const Home = React.memo(HomeComponent);


const HomeContainer = styled.div`
          display: flex;
          flex-direction: column;
  `,
  StyledLink = styled(Link)`
    text-decoration: unset;
    color: unset;
    width: 100%;
  `,
  StyledTabList = styled.div`
    display: flex;
    flex-direction: row;
    padding: 16px 0 0 16px;
    background-color: #EEEEEE;
  `,
  StyledTab = styled(Tab)`
    margin-right: 16px;
  `,
  MissionStatement = styled.div`
    padding: 32px 48px;
    font-size: 1.2em;
    line-height: 1.5em;
  `,
  StyledProfile = styled(Profile)`
    margin-bottom: 16px;
    `,
  ArtistsList = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
    padding: 32px;
    @media (min-width: 1100px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `,
  StyledBox = styled(Box)`
    padding: 16px;
    margin: 16px;
  `;
