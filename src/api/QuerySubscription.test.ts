import { QuerySubscription, Status } from "./QuerySubscription";

describe("lifecyle", () => {
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
