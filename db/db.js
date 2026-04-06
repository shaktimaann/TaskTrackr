
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;

export const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "app_db",
  password: "admin",
  port: 5432,
});


