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
      console.log("the user is exist");
      // update user
      updateUser(user)
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

export const updateUser = async(user)=> {

try {

  db.user.update({
    where: {
      id
    }, data: {
  
      id,
      firstName,
      lastName,
      email: emailAddress,
      imageUrl,
      userName
    }
  })
} catch(e) {

  console.log("update user issue")
  throw new Error("issue with update user")
}
}

export const deleteUser = async(id)=> {

  try {
    db.user.delete({
      where: {
        id: user.id
      }
    })
  } catch(error) {
    console.log("error with delete user")
    throw new Error("error with delete user")
  }
}

export const getUser = async (id) => {

  try {

    db.user.findUnique({
      where: {
        id, 
      }, select: {
        id: true, 
        firstName: true, 
        lastName: true,
        email: true,
        userName: true
      }
    })
  } catch(error) {

    console.log(`issue with get user ${id}`)
  }
} 