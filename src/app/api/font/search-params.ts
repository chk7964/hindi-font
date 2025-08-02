import { parseAsInteger, createLoader, createParser } from "nuqs/server";

const parseAsPositiveIndex = createParser({
  parse(queryValue) {
    const parsed = Number(queryValue);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
  },
  serialize(value) {
    return value.toString();
  },
});
const searchParams = {
  page: parseAsPositiveIndex.withDefault(1),
  pageSize: parseAsInteger.withDefault(30),
};

export const loadSearchParams = createLoader(searchParams);
