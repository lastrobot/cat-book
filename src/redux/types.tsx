export type Favourite = {
  id: number;
}

export type Cat = {
  id: number;
    url: string,
  score: number,
  favourite: Favourite;
}

export type Vote = {
    id: number,
    image_id: number
    value: number,
}