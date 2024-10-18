"use server";
import { connect, default as mongoose } from "mongoose";
import userDB from "./schemas/eventuser";
import { Avatar } from "@nextui-org/react";
require("dotenv").config();

const mongoUrl = process.env.MONGODBURL;

export async function connectDB() {
  connect(mongoUrl as string, {
    dbName: process.env.DBNAME,
  })
    .then(() => console.log("The bot is Connected to the Database"))

    .catch((error) => {
      console.log(error);
    });
}

export async function getMemberList(id: string) {
  await connectDB();
  const data = await userDB.find({ EventID: id }).sort();

  if (!data) {
    null;
  }

  return data.map((member) => {
    return {
      Username: member.Username,
      Infos: member.Infos,
      Avatar: member.Avatar,
    };
  });
}
