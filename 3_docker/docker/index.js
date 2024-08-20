import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import { options } from "./swagger/config.js";
import { checkPhone, getToken, sendTokenToSMS } from "./src/phone.js";
import { checkEmail, getWelcomeTemplate, sendTemplateToEmail } from "./src/email.js";
import { Board } from "./src/models/board.js";

const server = express();

/* express 프레임워크는 기본적으로 json 형태를 지원하고 있지 않으므로 추가 */
server.use(express.json());
/* Swagger UI */
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
server.use(cors());

/**
 * 문자 메시지 전송하기
 */
server.post("/phone", async (req, res) => {
  const phone = req.body.phone;

  const isValid = checkPhone(phone);
  if (isValid === false) {
    res.status(400).json({ message: "유효하지 않은 핸드폰 번호입니다." });
    return;
  }

  const token = getToken();

  const isSuccess = await sendTokenToSMS(phone, token);
  if (isSuccess === false) {
    res.status(500).json({ message: "문자 전송에 실패했습니다." });
    return;
  }
  res.status(200).json({ message: "문자 전송에 성공했습니다." });
});

/**
 * 이메일 보내기
 */
server.post("/email", async (req, res) => {
  const { name, age, school, email } = req.body;

  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email);
  if (isValid === false) return;

  // 2. 가입환영 템플릿 만들기
  const myTemplate = getWelcomeTemplate({ name, age, school });

  // 3. 이메일에 가입환영 템플릿 전송하기
  const isSuccess = await sendTemplateToEmail(email, myTemplate);
  if (isSuccess === false) {
    res.status(500).json({ message: "이메일 전송에 실패했습니다." });
    return;
  }
  res.status(200).json({ message: "이메일 전송에 성공했습니다." });
});

server.get("/boards", async (_, res) => {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  const result = await Board.find();

  // 2. 꺼내온 결과 응답 주기
  res.send(result);
});

server.post("/boards", async (req, res) => {
  // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents,
  });
  await board.save();

  // 2. 저장 결과 응답 주기
  res.send("게시물 등록에 성공하였습니다.");
});

/**
 * 데이터베이스 로그 확인
 */
mongoose.set("debug", true);

/**
 * 데이터베이스 연결
 */
mongoose
  .connect("mongodb://my-database:27017/mydocker")
  .then(() => console.log("db 접속에 성공하였습니다."))
  .catch(() => console.log("db 접속에 실패하였습니다."));

/**
 * 서버 시작
 */
server.listen(4_000, () => {
  console.log("Server is running on port 4000");
});
