import first from "./first.mjs";

describe("first", () => {
    // @TODO more tests

    it("calls methods one by one", async () => {
        let firstCalled = false,
            secondCalled = false;
        const list = [
            () => {
                firstCalled = true;
                return 1;
            },
            () => {
                secondCalled = false;
                return 2;
            },
        ];

        const res = await first(list);
        res.must.equal(1);
        firstCalled.must.equal(true);
        secondCalled.must.equal(false);
    });
});
