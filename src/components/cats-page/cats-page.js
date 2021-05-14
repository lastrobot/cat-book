import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components/macro";
import {
  loadCats,
  voteCat,
  favouriteCat,
  unFavouriteCat,
} from "../../redux/cat-store";
import Spinner from "../spinner";
import CatCard from "../cat-card/cat-card";
import { QUERIES } from "../../constants";

const CatsPage = ({
  cats,
  loadCats,
  voteCat,
  favouriteCat,
  unFavouriteCat,
  isLoading,
}) => {
  useEffect(() => {
    loadCats();
  }, [loadCats]);

  const voteHandler = (id, score, direction) => {
    const newScore =
      direction === "up" ? parseInt(score) + 1 : parseInt(score) - 1;
    voteCat(id, newScore);
  };

  const toggleFavouriteHandler = (id, favouriteId) => {
    if (favouriteId === 0) {
      favouriteCat(id);
      return;
    }

    unFavouriteCat(id, favouriteId);
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

  @media ${QUERIES.phoneScreens} {
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
  text-align: left;
  padding-left: 32px;

  @media ${QUERIES.phoneScreens} {
    padding-left: 16px;
  }
`;

const mapStateToProps = ({ cats }) => {
  return {
    isLoading: cats.isFetching,
    cats: cats.catList,
  };
};

const mapDispatchToProps = {
  loadCats,
  voteCat,
  favouriteCat,
  unFavouriteCat,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatsPage);
