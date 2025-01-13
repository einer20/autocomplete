import { defaultFilter } from "./defaults"

const countries = [
    { name: "Dominican Republic", key: "0" },
    { name: "Colombia", key: "1" },
    { name: "Mexico", key: "2" },
];

describe("defaultFilter", ()=>{
    it("should filter by name and return 1 item", async ()=>{
        const items = await defaultFilter("dominican", countries);

        expect(items.length).toBe(1);
    })
})