const API_KEY = import.meta.env.VITE_API_KEY;

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


const GoogleGeminiAPI = {
    async getHints(problemStatement) {
        try {
            const prompt = `Provide hints to solve this coding problem without giving the full solution or any pseudocode:\n\n${problemStatement}`;
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error("Error fetching hints from Gemini API:", error);
            return "Error fetching hints. Please try again later.";
        }
    },

    async getMoreConcepts(problemStatement) {
        try {
            const prompt = `Provide conceptual insights and techniques useful for solving this coding problem, without providing the full code or any pseudocode:\n\n${problemStatement}`;
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error("Error fetching hints from Gemini API:", error);
            return "Error fetching hints. Please try again later.";
        }
    }
};

export default GoogleGeminiAPI;
