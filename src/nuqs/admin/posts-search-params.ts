import {
  parseAsInteger,
  createLoader,
  parseAsString,
  parseAsStringEnum,
  createParser,
} from "nuqs/server";

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
  pageSize: parseAsInteger.withDefault(10),
  q: parseAsString.withDefault(""),
  sortBy: parseAsStringEnum([
    "id",
    "like",
    "dislike",
    "sname",
    "status",
    "created_at",
    "updated_at",
    "name_id",
  ]).withDefault("id"),
  orderBy: parseAsStringEnum(["asc", "desc"]).withDefault("asc"),
};

export const postsSearchParams = createLoader(searchParams);
