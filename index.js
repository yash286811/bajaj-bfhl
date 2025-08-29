const express = require("express");
const app = express();

app.use(express.json());

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  const data = req.body.data || [];

  let odd_numbers = [];
  let even_numbers = [];
  let alphabets = [];
  let special_characters = [];
  let sum = 0;

  data.forEach(item => {
    if (!isNaN(item)) {
      const num = parseInt(item);
      sum += num;
      if (num % 2 === 0) {
        even_numbers.push(item);
      } else {
        odd_numbers.push(item);
      }
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
    } else {
      special_characters.push(item);
    }
  });

  const concat_string = alphabets
    .filter(ch => ch === ch.toLowerCase())
    .join("") +
    alphabets
    .filter(ch => ch === ch.toUpperCase())
    .join("");

  res.json({
    is_success: true,
    user_id: "yashaswini_guddanti_24012005",
    email: "yashaswini.guddanti28@gmail.com",
    roll_number: "VIT22BCE9966",
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: sum.toString(),
    concat_string
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
