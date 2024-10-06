import express from "express";
import cors from "cors";
import axios from "axios";

import csvParser from "csv-parser";
import bodyParser from "body-parser";
import fs from "fs";

// components

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

interface ChatbotNode {
  question: string;
  options: { [key: string]: ChatbotNode | string };
}

const parseCSVAndBuildTree = (
  filePath: string,
  categoryId: number
): Promise<ChatbotNode> => {
  return new Promise((resolve, reject) => {
    const chatbotTree: ChatbotNode = {
      question: "",
      options: {},
    };
    let currentNode: ChatbotNode = chatbotTree;

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        if (parseInt(row["Category ID"], 10) === categoryId) {
          const funnel = row["Question Funnel"].split(" | "); // Split into question-option pairs
          // console.log(funnel);
          funnel.forEach((pair: string) => {
            const [question, option] = pair.split(" > "); // Separate question and option
            console.log(`Question: ${question}, Option: ${option}`);

            if (!currentNode.question) {
              currentNode.question = question; // Set the question
            }
            if (!currentNode.options[option]) {
              currentNode.options[option] = { question: "", options: {} };
            }
            currentNode = currentNode.options[option] as ChatbotNode; // Move to the next node
          });
          currentNode = chatbotTree; // Reset to root for next row
        }
      })
      .on("end", () => {
        resolve(chatbotTree);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

app.get("/chatbot-tree", async (req, res) => {
  const categoryId: number = parseInt(req.query.categoryId as string, 10)!;

  try {
    const tree = await parseCSVAndBuildTree(
      "../home_improvement/home_improvement.csv",
      categoryId
    );
    res.json(tree);
  } catch (error) {
    res.status(500).json({ error: "Failed to parse CSV" });
  }
});

app.get("/user-data-questions", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
