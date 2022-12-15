export default function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
  } else {
    res.status(400).json({ msg: "Use Post method for this route" });
  }
}
