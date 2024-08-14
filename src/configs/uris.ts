const URI_GENESYS = process.env.URI_GENESYS || "http://localhost:4000";
const URI_SISAP = process.env.URI_SISAP || "http://127.0.0.1:3100";

export default {
  genesys: URI_GENESYS,
  query_sisap: URI_SISAP,
};
