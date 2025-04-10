"use server";

import { db } from "@/lib/db";
import { useUser } from "@clerk/nextjs";

export const createUser = async (user) => {

    console.log("start create user")
    const {
        id,
        first_name: firstName,
        last_name: lastName,
        emailAddress,
        image_url: imageUrl,
        username: userName
      } = user;

  try {
    const userExist = db.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExist) {
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
        email: emailAddress,
        imageUrl,
        userName
      },
    });
  } catch (e) {
    console.log(e);

    return {
      error: "Field to save into database",
    };
  }
};
