import React from 'react';
import styled from 'styled-components';
import { Search } from 'monday-ui-react-core';
const logo = require('./logo.png');

export const AppHeader: React.FC<{}> = () => {
  return (
    <AppHeaderContainer>
      <SiteTitle><img src={logo} width={250}/></SiteTitle>
      <Subtitle>
        "In the arts, as in life, everything is possible provided it is based on love." - Marc Chagall
      </Subtitle>
      <SearchWrapper>
        <StyledSearch placeholder="Search"/>
      </SearchWrapper>
    </AppHeaderContainer>
  )
}
const AppHeaderContainer = styled.div`
    background-color: #4D85B9;
    display: flex;
    flex-direction: column;
    padding: 32px;
  `,
  SiteTitle = styled.h1`
    color: white;
    font-size: 1.5em;
    margin: 0;
  `,
  Subtitle = styled.h2`
    color: white;
    font-size: 1em;
    font-weight: 300;
  `,
  SearchWrapper = styled.div`
    background-color: white;
    border-radius: 4px;
    width: 100%;
  `,
  StyledSearch = styled(Search)`
    padding: 0 16px;
  `;
