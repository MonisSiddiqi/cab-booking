const express = require("express");
const { graph, dijkstra } = require("./graph");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const cabCategories = [
  { type: "Mini", price: 10 },
  { type: "Sedan", price: 15 },
  { type: "SUV", price: 20 },
  { type: "SUV + ", price: 25 },
  { type: "Premium", price: 30 },
];

app.post("/book-cab", (req, res) => {
  const { email, source, destination, cabCategory } = req.body;
  const shortestPath = dijkstra(graph, source, destination);
  let timeTaken = 0;
  for (let i = 0; i < shortestPath.length - 1; i++) {
    const from = shortestPath[i];
    const to = shortestPath[i + 1];
    timeTaken += graph[from][to];
  }
  const selectedCabCategory = cabCategories.find(
    (category) => category.type === cabCategory
  );
  const cost = selectedCabCategory
    ? selectedCabCategory.price * timeTaken
    : undefined;

  const responseData = {
    message: "Cab booked successfully",
    shortestPath,
    timeTaken,
    cost,
    cabCategories,
  };
  res.json(responseData);
});

app.get("/cab-details", (req, res) => {
  const cabDetails = {
    name: "Example Cab Company",
    rates: cabCategories,
  };
  res.json(cabDetails);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
