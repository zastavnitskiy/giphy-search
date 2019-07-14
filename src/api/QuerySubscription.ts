export enum Status {
  idle,
  fetching,
  error
}

export interface QueryState {
  data: Gif[];
  status: Status;
  total: number;
}

interface Props {
  query: string;
  subscriber(state: QueryState): void;
}

// todo move into configuration
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const LIMIT = 25;

if (!API_KEY) {
  throw new Error(
    `'REACT_APP_GIPHY_API_KEY' is required for running this application.`
  );
}

export class QuerySubscription {
  constructor(props: Props) {
    this.query = props.query;
    this.subscriber = props.subscriber;
    this.data = [];
    this.fetching = false;
    this.status = Status.idle;
    this.total = Number.MAX_SAFE_INTEGER;
  }

  //todo error handling
  private async _fetch() {
    if (this.fetching) {
      return this.fetching;
    }

    const offset = this.data.length;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${
      this.query
    }&limit=${LIMIT}&offset=${offset}&rating=G&lang=en`;

    this.status = Status.fetching;
    this.notifySubscriber();

    this.fetching = fetch(url)
      .then(response => response.json())
      .then((parsedReponse: ApiResponse) => {
        this.data = this.data.concat(parsedReponse.data);
        this.status = Status.idle;
        this.fetching = null;
        this.total = parsedReponse.pagination.total_count;
      })
      .catch(error => {
        this.fetching = null;
        this.status = Status.error;
      })
      .then(() => {
        this.notifySubscriber();
      });

    return this.fetching;
  }

  private status: Status;
  private data: Gif[];
  private query: string;
  private subscriber: Props["subscriber"];
  private fetching: any;
  private total: number;

  private notifySubscriber(): void {
    this.subscriber({
      data: this.data,
      status: this.status,
      total: this.total
    });
  }

  public async fetch() {
    return this._fetch();
  }
}
