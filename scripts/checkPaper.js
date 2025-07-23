
async function checkPaper() {
    const answeredPaper = JSON.parse(localStorage.getItem("answeredPaper"));
    const GEMINI_API_KEY = "AIzaSyAG-McRCi-chosYEv-uwduTJoWGHWsdFw8"; // <<< Replace with your actual API key
    const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
    const MODEL_NAME = "gemini-2.5-flash"; // Or "gemini-1.5-pro", "gemini-1.5-flash", etc.
        const prompt = `
            You are an intelligent quiz grader API. Your task is to accurately assess quiz responses based on the provided JSON data.

        For each question in the input JSON, evaluate the \`userSelected\` answer against the \`answers\` provided. A user's \`userSelected\` answer is considered **correct** if it exactly matches one of the provided \`answers\` for that question. If \`userSelected\` is \`null\` or does not match any of the provided \`answers\`, it is considered **incorrect**.

        The output should be a **JSON object** with a \`results\` array and a \`totalMarks\` integer. The \`results\` array will contain objects, each representing a question. Each question object must contain the following keys:
        * \`question\` (string): The original question text.
        * \`userSelected\` (string or null): The user's selected answer.
        * \`isCorrect\` (boolean): \`true\` if the \`userSelected\` answer is correct, \`false\` otherwise.
        * \`mark\` (integer): \`1\` if \`isCorrect\` is \`true\`, \`0\` otherwise.
        * \`suggestion\` (string, **only if \`isCorrect\` is \`false\`**): A concise and helpful explanation of why the answer was incorrect, or additional relevant information.
        * \`correctAnswer\` (string): The full, correct answer string as it appears in the \`answers\` array for that question.

        The \`totalMarks\` key at the root of the JSON should represent the sum of all \`mark\` values from the \`results\` array.

        Assume the input JSON is well-formed and follows the structure provided.

        Here is the quiz JSON to grade:
        \`\`\`json
        ${JSON.stringify(answeredPaper)}
        \`\`\`
        `;        
        try {
            const response = await fetch(`${API_BASE_URL}/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        responseMimeType: "application/json", // Ensure JSON output
                        temperature: 0.1 // Lower temperature for more deterministic answers
                    }
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                error(errorData);
                return;
            }

            const data = await response.json();
            const generatedText = data.candidates[0]?.content?.parts[0]?.text;

            if (!generatedText) {
                error("Gemini API returned no content");
                return;
            }

            localStorage.setItem("checkedPaper",generatedText);
            window.location.replace("mentoring.html")
        } catch (error) {
            error(error);
        }

}

function error(error) {
    window.alert(error);
    window.location.replace("index.html");
}