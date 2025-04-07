"use server";

import { db } from "@/lib/db";

export const createUser = async (user) => {
  const { id, first_name, last_name, email_addresses, image_url, username } = user;

  try {
    console.log(id)
    const userExist = db.user.findUnique({
      where: {
        id,
      },
    });
    

    if (!userExist) {
        console.log( await userExist)
      // update user
      console.log("the user is exist")

      return;
    }

    console.log("saving data")
    await db.user.create({
      data: {
        id,
        first_name,
        last_name,
        email_addresses,
        image_url,
        username
      },
    });
  } catch (e) {
    console.log(e);

    return {
      error: "Field to save into database",
    };
  }
};
