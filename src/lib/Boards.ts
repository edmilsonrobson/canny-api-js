import { AxiosInstance } from 'axios';

export interface ICannyBoardListResponse {
  boards: ICannyBoardWithToken[];
}
export default class Boards {
  static BOARDS_LIST_ROUTE = '/boards/list';
  static BOARDS_RETRIEVE_ROUTE = '/boards/retrieve';

  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async retrieve(boardId: string): Promise<ICannyBoard> {
    const response = await this.axios.post(Boards.BOARDS_RETRIEVE_ROUTE, {
      id: boardId,
    });
    const { data: board } = response;

    return board;
  }

  async list(): Promise<ICannyBoardListResponse> {
    const response = await this.axios.post(Boards.BOARDS_LIST_ROUTE);
    const { data } = response;

    return data;
  }
}
