import React from "react";
import  styled from "styled-components/macro";
import Icon from "../styled-elements/icons";
import UnstyledButton from "../styled-elements/unstyled-button";

type AppProps = {
  url: string;
  id: number;
  score: number;
  handleVotes: (id: number, score: number, direction: string) => void;
  handleFavourite:  (id: number, favId: number) => void;
  favourite: Favourite;
};

type Favourite = {
  id: number;
}
const CatCard = ({
  url,
  id,
  score,
  handleVotes,
  favourite,
  handleFavourite,
}: AppProps) => {
  const favouriteId = favourite ? favourite.id : 0;
  const heartColour = favourite ? "red" : "white";
  return (
    <Wrapper>
      <ImageWrapper>
        <Image alt="" src={url} />
        <UnstyledButton onClick={() => handleFavourite(id, favouriteId)}>
          <Heart id="heart" color={heartColour} size={24} strokeWidth={1.5} />
        </UnstyledButton>
      </ImageWrapper>
      <div>
        <Row>
          <UnstyledButton onClick={() => handleVotes(id, score, "up")}>
            <ThumbsUp id="thumbs-up" size={24} strokeWidth={1.5} />
          </UnstyledButton>

          <h2> {score} votes</h2>
          <UnstyledButton onClick={() => handleVotes(id, score, "down")}>
            <ThumbsDown id="thumbs-down" size={24} strokeWidth={1.5} />
          </UnstyledButton>
        </Row>
      </div>
    </Wrapper>
  );
};

export default CatCard;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
  height: 275px;
  object-fit: cover;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 275px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

// const IconWrapper = styled.div`
//   display: flex;
// `;
const ThumbsUp = styled(Icon)`
  width: 24px;
  height: 24px;
`;

const ThumbsDown = styled(Icon)`
  width: 24px;
  height: 24px;
`;

const Heart = styled(Icon)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
`;
