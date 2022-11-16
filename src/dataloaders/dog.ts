import DataLoader from "dataloader";
import { getDogs } from "../api/index.js";
import { Dog } from "../generated/graphql";

export const getDogLoader = () =>
  new DataLoader<{ dogId: string }, Partial<Dog> | undefined, string>(
    async (keys) => {
      const dogs = await getDogs();

      return keys.map((key) => {
        return dogs.find((dog) => dog.id === key.dogId);
      });
    },
    { cacheKeyFn: ({ dogId }) => dogId }
  );
