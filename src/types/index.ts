export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
}

export interface GameState {
  active: boolean;
  range: {
    min: number;
    max: number;
  };
}

export interface Winner {
  winner: string;
  number: number;
}