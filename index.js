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

    let odds = [];
    let evens = [];
    let alphabets = [];
    let specials = [];
    let total = 0;

    let lettersForConcat = [];

    const isIntString = (s) => typeof s === "string" && /^[+-]?\d+$/.test(s);
    const isAlpha = (s) => typeof s === "string" && /^[a-zA-Z]+$/.test(s);

    for (let item of data) {
      if (isIntString(item)) {
        let n = parseInt(item);
        total += n;
        (n % 2 === 0 ? evens : odds).push(item.toString());
      } else if (isAlpha(item)) {
        alphabets.push(item.toUpperCase());
        lettersForConcat.push(...item);
      } else {
        specials.push(item.toString());
      }
    }

    let concat = lettersForConcat.reverse().map((ch, i) =>
      i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join("");

    res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers: odds,
      even_numbers: evens,
      alphabets,
      special_characters: specials,
      sum: total.toString(),
      concat_string: concat
    });
  } catch (err) {
    console.log("Error happened:", err);
    res.status(200).json({ is_success: false });
  }
});

app.listen(3000, () => console.log("server running locally"));
