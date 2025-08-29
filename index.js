const express = require("express");
const app = express();
app.use(express.json());


const USER_ID = "yashaswini_guddanti_24012005"; 
const EMAIL = "yashaswini.guddanti28@gmail.com";
const ROLL = "VIT22BCE9966"; 
app.post("/bfhl", (req, res) => {
  try {
    const body = req.body || {};
    const data = Array.isArray(body.data) ? body.data : [];

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sumNum = 0;

    const lettersForConcat = [];

    const isIntString = (s) => typeof s === "string" && /^[+-]?\d+$/.test(s);
    const isAlphaString = (s) => typeof s === "string" && /^[a-zA-Z]+$/.test(s);

    for (const item of data) {
      if (typeof item === "number" && Number.isInteger(item)) {
        sumNum += item;
        (item % 2 === 0 ? even_numbers : odd_numbers).push(String(item));
      } else if (isIntString(item)) {
        const n = parseInt(item, 10);
        sumNum += n;
        (n % 2 === 0 ? even_numbers : odd_numbers).push(String(item));
      } else if (isAlphaString(item)) {
        alphabets.push(item.toUpperCase());
        lettersForConcat.push(...item.match(/[a-zA-Z]/g));
      } else if (typeof item === "string") {
        special_characters.push(item);
      } else {
        special_characters.push(String(item));
      }
    }

    const rev = lettersForConcat.reverse();
    let concat = "";
    for (let i = 0; i < rev.length; i++) {
      const ch = rev[i];
      concat += i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
    }

    return res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sumNum),
      concat_string: concat,
    });
  } catch (err) {
    return res.status(200).json({
      is_success: false,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      error: err.message,
    });
  }
});

app.listen(process.env.PORT || 3000, () => {});
module.exports = app;
