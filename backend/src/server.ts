import express from "express";
import cors from "cors";
import axios from "axios";

import csvParser from "csv-parser";
import bodyParser from "body-parser";
import fs from "fs";

// redux
import store from "../../src/store";

// data
import userDataQuestions from "../data/userDataQuestions.json";

// components
import { setServiceId } from "../../src/store/userSlice";

// interfaces
import { CsvRow } from "../../src/interfaces/dataInterfaces";

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
            // console.log(`Question: ${question}, Option: ${option}`);

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

app.get("/user-data-questions", async (req, res) => {
  let currentQuestionIndex = 0;
  if (currentQuestionIndex < userDataQuestions.length) {
    res.json(userDataQuestions[currentQuestionIndex]);
    currentQuestionIndex++;
  } else {
    res.json({ message: "All questions have been answered" });
    currentQuestionIndex = 0; // Reset for next session or set appropriate handling
  }
});

app.post("/update-service-id", (req, res) => {
  const questionFunnel = req.headers["question-funnel"];

  const results: CsvRow[] = [];

  fs.createReadStream("../home_improvement/home_improvement.csv")
    .pipe(csvParser())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      const matchingRow = results.find(
        (row) => row["Question Funnel"] === questionFunnel
      );

      if (matchingRow) {
        const serviceId = matchingRow["Service ID"];
        res.status(200).json({ serviceId });
        // console.log(`Service ID: ${serviceId}`);
        // store.dispatch(setServiceId({ serviceId }));

        // res.status(200).send("Service ID updated in state.");
      } else {
        res.status(404).send("No matching Question Funnel found.");
      }
    })
    .on("error", (error) => {
      console.error("Error reading CSV:", error);
      res.status(500).send("Internal server error.");
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
