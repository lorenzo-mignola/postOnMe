import prismaClient from "../../prismaClient";
import { procedure } from "../../servers/trpcServer";

export default procedure.query(async () => prismaClient.user.findMany());
