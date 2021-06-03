import React, { useEffect } from "react";

import styled from "styled-components/macro";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import type { RootState } from '../../redux/configure-store-dev';
import {
  loadCats,
  voteCat,
  favouriteCat,
  unFavouriteCat,
} from "../../redux/cat-store";
import Spinner from "../spinner";
import CatCard from "../cat-card/cat-card";
import { QUERIES } from "../../constants";
import type {Cat} from '../../redux/types';


const CatsPage = () => {

  const dispatch = useAppDispatch()

  const cats: Nullable<Array<Cat>> = useAppSelector(
    (state:RootState) => state.cats.catList,
  );

  const isLoading: boolean = useAppSelector(
    (state:RootState) => state.cats.isFetching,
  );

  useEffect(() => {
    dispatch(loadCats());
  }, [dispatch]);

  const voteHandler = (id: number, score: number, direction:string) => {
    const newScore =
      direction === "up" ? score + 1 : score - 1;
    dispatch(voteCat(id, newScore));
  };

  const toggleFavouriteHandler = (id: number, favouriteId: number) => {
    if (favouriteId === 0) {
      dispatch(favouriteCat(id));
      return;
    }

    dispatch(unFavouriteCat(id, favouriteId));
  };

  return (
    <MaxWidthWrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Heading>The cats</Heading>
          <GridWrapper>
            {cats &&
              cats.map((cat) => (
                <CatCard
                  key={cat.id}
                  {...cat}
                  handleVotes={voteHandler}
                  handleFavourite={toggleFavouriteHandler}
                />
              ))}
          </GridWrapper>
        </>
      )}
    </MaxWidthWrapper>
  );
};

const GridWrapper = styled.div`
  position: relative;
  padding: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: flex-start;

  @media ${QUERIES.tabletScreens} {
    justify-content: center;
  }

  @media ${QUERIES.mobileScreens} {
    padding: 16px;
  }
`;

const MaxWidthWrapper = styled.div`
  padding-top: 64px;
  margin: 0 auto;
  max-width: 1250px;
`;

const Heading = styled.h1`
  font-size: 1.8rem;
  text-align: center;
`;

/*
CatsPage.defaultProps = {
  cats: [],
};

CatsPage.propTypes = {
  cats: PropTypes.arrayOf(PropTypes.object),
  loadCats: PropTypes.func.isRequired,
  voteCat: PropTypes.func.isRequired,
  favouriteCat: PropTypes.func.isRequired,
  unFavouriteCat: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
*/




export default CatsPage;
