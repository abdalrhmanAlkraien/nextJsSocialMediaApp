import { createUser } from "@/app/actions/user";
import { headers } from "next/headers";
import { Webhook } from "svix";

// export const runtime = 'nodejs'; // Force Node.js runtime instead of Edge

export async function POST(req) {
  const WEB_SECRET = process.env.WEB_HOOK_SECRET;
  console.log("start clerk request");
  if (!WEB_SECRET) {
    throw new Error("could not find the secret");
  }

  const headerPayload = await headers();
  const svixId = (await headerPayload).get("svix-id");
  const svixTimestamp = (await headerPayload).get("svix-timestamp");
  const signature = (await headerPayload).get("svix-signature");

  if (!svixId || !svixTimestamp || !signature) {
    console.log("messing header");
    return new Response("Missing header", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  console.log(`the body is ${body}`);
  const webHook = new Webhook(WEB_SECRET);

  let evt;

  try {
    evt = webHook.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": signature,
    });
  } catch (Error) {
    console.log("webhook verify has Error");
    return new Response("Error with webHook", { status: 400 });
  }

  const eventType = evt.type;
  console.log(`We have Recived ${eventType} event`);

  switch (eventType) {
    case "user.created":
      try {
        console.log("the eventType is user.created");
        const {
          id,
          first_name,
          last_name,
          email_addresses,
          image_url,
          username,
        } = evt.data;

        const emailAddress =
          Array.isArray(email_addresses) && email_addresses.length > 0
            ? email_addresses[0].email_address
            : null;
        await createUser({
          id,
          first_name,
          last_name,
          emailAddress,
          image_url,
          username,
        });
      } catch (e) {
        throw new Error("field save on db");
      }
      break;

    case "session.created":
      try {
        console.log("the eventType is session.created");
      } catch (e) {
        throw new Error("field save on db");
      }
      break;

    default:
      console.log("Unhandled event type:", eventType);
  }

  return new Response("Webhook received", { status: 200 }); // ✅ Final response
}
// export async function GET() {

//     return Response.json({message: "Hello"})
// }
