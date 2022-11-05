import prismaClient from "../../prismaClient";
import { procedure } from "../../servers/trpcServer";

const posts = procedure.query(async () => prismaClient.post.findMany());

export default posts;
