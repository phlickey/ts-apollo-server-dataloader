import DataLoader from "dataloader";
import { getPeople } from "../api/index.js";
import { Person } from "../generated/graphql";

export const getpersonLoader = () =>
  new DataLoader<{ personId: string }, Partial<Person> | undefined, string>(
    async (keys) => {
      const people = await getPeople();

      return keys.map((key) => {
        return people.find((person) => person.id === key.personId);
      });
    },
    { cacheKeyFn: ({ personId }) => personId }
  );
