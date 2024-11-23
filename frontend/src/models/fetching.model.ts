export const HTTP_METHODS = {
  POST: "POST" as "POST",
  DELETE: "DELETE" as "DELETE",
  GET: "GET" as "GET",
  PUT: "PUT" as "PUT",
  OPTIONS: "OPTIONS" as "OPTIONS",
};

export type MethodsType = keyof typeof HTTP_METHODS;
