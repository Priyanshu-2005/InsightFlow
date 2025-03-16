require("dotenv").config();
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
const supabase = require("../backend/config/supabaseclient");

const app = express();
const port = 5000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("pdf"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text.slice(0, 3000); // Keep within token limits

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(
      `Summarize the following text: ${text}`
    );

    res.json({
      summary: response.response.candidates[0].content.parts[0].text,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error processing PDF" });
  }
});

app.post("/summarize", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    // Get a reference to the Gemini generative model (adjust the model name if needed)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(
      `Summarize the following text: ${text}`
    );

    // Return the summary extracted from the response
    res.json({
      summary: response.response.candidates[0].content.parts[0].text,
    });
  } catch (error) {
    console.error("Error processing summarization:", error);
    res.status(500).json({ error: "Error processing summarization" });
  }
});

app.post("/addUserIfNotExist", async (req, res) => {
  console.log("in backendP");
  console.log(req.body);
  const {
    id,
    email,
    name,
    phoneNumber,
    password,
    aadhaarNumber,
    emailVerified,
    createdAt,
  } = req.body;
  const { data, error } = await supabase.from("profiles2").insert([
    {
      id,
      email,
      name,
      phone_number: phoneNumber,
      // password, // ⚠ Consider hashing before storing
      aadhaar_number: aadhaarNumber,
      email_verified: emailVerified,
      created_at: createdAt || new Date().toISOString(),
    },
  ]);
  console.log(data, " ", error);

  if (error) {
    console.error("Insert error:", error);
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: "Profile created successfully", data });
});

app.post("/resend-verification", async (req, res) => {
  console.log("in backendP");
  console.log(req.body);
  const {
    id,
    email,
    name,
    phoneNumber,
    password,
    aadhaarNumber,
    emailVerified,
    createdAt,
  } = req.body;
  const { data, error } = await supabase.from("profiles2").insert([
    {
      id,
      email,
      name,
      phone_number: phoneNumber,
      // password, // ⚠ Consider hashing before storing
      aadhaar_number: aadhaarNumber,
      email_verified: emailVerified,
      created_at: createdAt || new Date().toISOString(),
    },
  ]);
  console.log(data, " ", error);

  if (error) {
    console.error("Insert error:", error);
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: "Profile created successfully", data });
});

app.post("/saveMarkdown", async (req, res) => {
  console.log("in backendP");
  console.log(req.body);
  const { markdown, userId, noteName } = req.body;
  const { data, error } = await supabase.from("notes").insert([
    {
      user_id: userId,
      title: noteName,
      content: markdown,
    },
  ]);

  console.log(data, " ", error);

  if (error) {
    console.error("Insert error:", error);
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: "Notes saved successfully", data });
});

app.get("/getUserNotes/:userId", async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error("Error fetching user notes:", error);
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

// GET /getNote/:noteId
// Returns a single note for the given noteId.
app.get("/getNote/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", noteId)
    .single();
  if (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

// DELETE /deleteNote/:noteId
// Deletes a note with the given noteId.
app.delete("/deleteNote/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const { data, error } = await supabase
    .from("notes")
    .delete()
    .eq("id", noteId);
  if (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});
app.get("/keepalive", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
