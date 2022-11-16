import { Dog, Person, Breed } from "../generated/graphql";
import { v4 as uuid } from "uuid";
import { name } from "faker";
import pLimit from "p-limit";

const limit = pLimit(1);

const wait = (time: number) => new Promise((res) => setTimeout(res, time));

const dogsWithNoOwners = Array(4)
  .fill(null)
  .map(() => ({
    id: uuid(),
    name: name.prefix() + " " + name.firstName(),
    breed: Math.random() > 0.5 ? (Breed.Labrador) : (Breed.Poodle),
  }));

const people: Person[] = Array(10)
  .fill(null)
  .map(() => ({
    id: uuid(),
    firstName: name.firstName(),
    lastName: name.lastName(),
    dogs: [] as Dog[],
  }));

const dogs: Array<Omit<Dog, "owner">> = dogsWithNoOwners.map((dog) => {
  const idx = Math.floor((Math.random() * people.length) / 2);
  const owner = people[idx];

  people[idx].dogId = dog.id;
  return {
    ...dog,
    ownerId: owner.id,
  };
});

export const getDogs = () =>
  limit(async (): Promise<Partial<Dog>[]> => {
    try {
      console.log("Getting dogs");
      await wait(1000);
      return dogs;
    } finally {
      console.log("Got Dogs");
    }
  });

export const getPeople = () =>
  limit(async (): Promise<Partial<Person>[]> => {
    try {
      console.log("Getting people");
      await wait(1000);
      return people;
    } finally {
      console.log("Got people");
    }
  });

export const getDogById = ({ id }: { id: string }) =>
  limit(async (): Promise<Partial<Dog> | undefined> => {
    try {
      console.log("Getting dog " + id);
      await wait(1000);
      return dogs.find((dog) => dog.id === id);
    } finally {
      console.log("Got Dog " + id);
    }
  });

export const getPersonById = ({ id }: { id: string }) =>
  limit(async (): Promise<Partial<Person> | undefined> => {
    try {
      console.log("Getting person " + id);
      await wait(1000);
      return people.find((person) => person.id === id);
    } finally {
      console.log("Got person " + id);
    }
  });
