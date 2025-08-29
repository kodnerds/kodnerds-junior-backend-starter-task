const express = require("express");
const cors = require("cors");
// const dataset = require("./dataset")

const dataset = [
  {
    id: 1,
    author: "Faaruq Azeez",
    date: "23 May, 2024",
    title: "Energy Efficiency ideas to improve business sustainability",
    description:
      "Energy Efficiency with Business Sustainability for substantial savings.",
    image: "https://via.placeholder.com/300x200",
    views: 20,
    likes: 20,
    comments: 20,
    readMore: "#",
  },
  {
    id: 2,
    author: "Faaruq Azeez",
    date: "23 May, 2024",
    title: "Reducing Carbon Emissions through Tech Innovation",
    description: "Leveraging technology for greener energy solutions.",
    image: "https://via.placeholder.com/300x200",
    views: 25,
    likes: 18,
    comments: 22,
    readMore: "#",
  },
  {
    id: 3,
    author: "Faaruq Azeez",
    date: "23 May, 2024",
    title: "Top Strategies for Water Conservation in Business",
    description: "Simple steps for managing water resources effectively.",
    image: "https://via.placeholder.com/300x200",
    views: 30,
    likes: 15,
    comments: 10,
    readMore: "#",
  },
  {
    id: 4,
    author: "Faaruq Azeez",
    date: "23 May, 2024",
    title: "Top Strategies for Water Conservation in Business",
    description: "Simple steps for managing water resources effectively.",
    image: "https://via.placeholder.com/300x200",
    views: 30,
    likes: 15,
    comments: 10,
    readMore: "#",
  },
];

const app = express();

const PORT = 3030;

// middleware initialization
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "welcome to health endpoint",
  });
});

app.post("/create-user-dataset", (req, res) => {
  const {
    author,
    date,
    title,
    description,
    image,
    views,
    likes,
    comments,
    readMore,
  } = req.body;
  if (!author) return res.status(400).json({ error: "Author is required" });

  const newId = dataset.length > 0 ? dataset[dataset.length.id - 1] + 1 : 1;
  const newData = {
    id: newId,
    author,
    date,
    title,
    description,
    image,
    views,
    likes,
    comments,
    readMore,
  };
  dataset.push(newData);
  res
    .status(201)
    .json({ message: "Data is successfully created", data: newData });
});

app.get("/all-user-dataset", (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result = dataset.slice(startIndex, endIndex);

  res.status(200).json({
    total: dataset.length,
    page: page,
    limit: limit,
    data: result,
  });
});
app.get("/user-dataset/:id", (req, res) => {
  const item = dataset.find((i) => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "item not found" });
  res.status(200).json({
    message: "item found",
    data: item,
  });
});
app.put("/update-user-dataset/:id", (req, res) => {
  const item = dataset.find((i) => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "item not found" });

  const {
    author,
    date,
    title,
    description,
    image,
    views,
    likes,
    comments,
    readMore,
  } = req.body;
  res.status(200).json({
    message: " dataset updated successfully",
    data: item,
  });
});
app.delete("/delete-user-dataset/:id", (req, res) => {
  const item = dataset.find((i) => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "item not found" });
  const deleteItem = dataset.splice(item, 1);
  res
    .status(200)
    .json({ message: "data deleted successfully", data: deleteItem });
});
app.listen(PORT, () => {
  console.log("Server is up and running on Port 3030... ");
});
