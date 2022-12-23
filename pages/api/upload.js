export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const { img, srcLang, outLang } = req.body;

    try {
      //OCR request

      let formData = new FormData();
      formData.append("language", srcLang);
      formData.append("base64Image", img);
      formData.append("isOverlayRequired", true);
      const ocrResult = await (
        await fetch("https://api.ocr.space/parse/image", {
          method: "POST",
          headers: {
            apikey: "K82260583988957",
          },
          body: formData,
        })
      ).json();

      const lines = ocrResult.ParsedResults[0].TextOverlay.Lines;
      const detectedText = lines.map((line) => line.LineText);

      //translate request
      const translateResult = await (
        await fetch("https://api.lecto.ai/v1/translate/text", {
          method: "POST",
          headers: {
            "X-API-Key": "M1XTY72-HB94VZT-HBR1R9Y-6EV8SCS",
          },
          body: JSON.stringify({
            from: srcLang.slice(0, -1),
            to: [outLang.slice(0, -1)],
            texts: detectedText,
          }),
        })
      ).json();

      const translatedText = translateResult.translations[0].translated;
      const finalTextResult = { detectedText, translatedText };

      res.json(finalTextResult);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.status(400).json({ msg: "Use Post method for this route" });
  }
}
