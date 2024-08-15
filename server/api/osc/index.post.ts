import * as z from "zod";
import { db } from "~/db/drizzle";
import { InsertOscCommand, oscCommands } from "~/db/schema";

const schema = z.object({
  targetIp: z.string(),
  targetPort: z.number({ coerce: true }),
  targetMachineName: z.string().optional(),
  address: z.string(),
  args: z.array(z.string()),
});

function createInsertType(body: z.infer<typeof schema>): InsertOscCommand {
  return {
    ...body,
    args: JSON.stringify(
      body.args.map((arg) => {
        let type = "string";
        if (arg === "true" || arg === "false") {
          type = "boolean";
        } else if (parseFloat(arg) == parseInt(arg)) {
          type = "integer";
        } else if (!Number.isNaN(parseFloat(arg))) {
          type = "float";
        }

        return {
          type: type,
          value: arg,
        };
      })
    ),
  };
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => schema.safeParse(body));
  if (!body.success) {
    console.log(body.error);
    setResponseStatus(event, 400, "Bad Request");
    return "Bad Request";
  }

  // body.args = JSON.stringify(
  //   body.args.map((arg) => {
  //     let type = "string";
  //     if (arg === "true" || arg === "false") {
  //       type = "boolean";
  //     } else if (parseFloat(arg) == parseInt(arg)) {
  //       type = "integer";
  //     } else if (!Number.isNaN(parseFloat(arg))) {
  //       type = "float";
  //     }
  //
  //     return {
  //       type: type,
  //       value: arg,
  //     };
  //   })
  // );
  // console.log(body);

  const res = await db.insert(oscCommands).values(createInsertType(body.data)).returning();
  console.log(res);
  // console.log(body);
  // const commandsHandle = await fs.readFile("commands.json", "utf-8");
  // const commands = JSON.parse(commandsHandle) as Array<{
  //   address: string;
  //   args: Array<{
  //     type: string;
  //     value: string;
  //   }>;
  // }>;
  // commands.push(body);
  // await fs.writeFile("commands.json", JSON.stringify(commands, null, 2));
  return res;
});
