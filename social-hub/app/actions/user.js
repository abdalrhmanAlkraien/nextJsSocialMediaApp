"use server";

import { db } from "@/lib/db";
import { useUser } from "@clerk/nextjs";

export const createUser = async (user) => {

    const {
        id,
        firstName,
        lastName,
        emailAddresses,
        imageUrl,
        username,
      } = user;

  try {
    console.log(id);
    const userExist = db.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExist) {
      console.log(await userExist);
      // update user
      console.log("the user is exist");

      return;
    }

    console.log("saving data");
    await db.user.create({
      data: {
        id,
        firstName,
        lastName,
        email: emailAddresses,
        imageUrl,
        userName: username
      },
    });
  } catch (e) {
    console.log(e);

    return {
      error: "Field to save into database",
    };
  }
};
