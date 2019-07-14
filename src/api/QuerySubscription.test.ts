import { QuerySubscription, Status } from "./QuerySubscription";

describe("integration-lifecycle", () => {
  const subscriber = jest.fn();
  const subscription = new QuerySubscription({
    query: "kittens",
    subscriber
  });

  it("should receive initial data", async () => {
    await subscription.fetch();
    expect(subscriber).toHaveBeenCalledTimes(2);
    expect(subscriber.mock.calls[0][0].status).toEqual(Status.fetching);
    expect(subscriber.mock.calls[1][0].data).toHaveLength(25);
    expect(subscriber.mock.calls[1][0].status).toEqual(Status.idle);
  });

  it("should fetch more data when asked", async () => {
    await subscription.fetch();
    expect(subscriber).toHaveBeenCalledTimes(4);
    expect(subscriber.mock.calls[2][0].status).toEqual(Status.fetching);
    expect(subscriber.mock.calls[3][0].data).toHaveLength(50);
    expect(subscriber.mock.calls[3][0].status).toEqual(Status.idle);
  });

  it("when called repeatedly, should not overfetch", async () => {
    subscription.fetch();
    subscription.fetch();
    subscription.fetch();
    await subscription.fetch();

    expect(subscriber).toHaveBeenCalledTimes(6);
  });
});

describe("unit", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(async () => {
      return {
        json: async () => {
          return {
            data: new Array(25).fill({}),
            pagination: {
              total_count: 1000
            }
          };
        }
      };
    });
  });

  afterEach(() => {});

  it("calls fetch with required params", async () => {
    const subscriber = jest.fn();
    const subscription = new QuerySubscription({
      query: "kittens",
      subscriber
    });

    await subscription.fetch();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toContain("q=kittens");
    expect(global.fetch.mock.calls[0][0]).toContain(
      `api_key=${process.env.REACT_APP_GIPHY_API_KEY}`
    );

    await subscription.fetch();
    expect(global.fetch.mock.calls[1][0]).toContain("offset=25");
  });

  it("handles errors", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      throw new Error("Mocked error");
    });

    const subscriber = jest.fn();
    const subscription = new QuerySubscription({
      query: "kittens",
      subscriber
    });

    await subscription.fetch();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(subscriber.mock.calls[1][0].status).toEqual(Status.error);
  });
});
