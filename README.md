<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Parkinson's Park Website

A community website for Parkinson's Park in Guiseley, West Yorkshire, featuring an AI-powered nature guide chatbot named Willow.

## Features

- Interactive park information and history
- AI chatbot (Willow) powered by Google Gemini
- Ecology, geology, and history pages
- Events calendar and volunteer opportunities

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Gemini API key to `.env`:
     ```
     API_KEY=your_gemini_api_key_here
     ```
   - Get your API key from: https://aistudio.google.com/app/apikey

3. Run the development server:
   ```bash
   npm run dev
   ```

## Deploy

The site automatically deploys to GitHub Pages when changes are pushed to the main branch.
