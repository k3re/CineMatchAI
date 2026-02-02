# 🎬 CineMatch AI - Multi-Agent Entertainment Recommendation System

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-orange)](https://ai.google.dev/)
[![TMDB API](https://img.shields.io/badge/TMDB%20API-3.0-green)](https://www.themoviedb.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/k3re/CineMatchAI?style=social)](https://github.com/k3re/CineMatchAI)

<div align="center">
  <img src="https://img.shields.io/badge/Multi%20Agent-System-purple" alt="Multi Agent"/>
  <img src="https://img.shields.io/badge/Natural%20Language-Processing-blue" alt="NLP"/>
  <img src="https://img.shields.io/badge/500k%2B-Movies-green" alt="500k+ Movies"/>
</div>

## 📋 Table of Contents
- [🎯 Use Case & Rationale](#-use-case--rationale)
- [🤖 Agent Team Architecture](#-agent-team-architecture)
- [🚀 Quick Start](#-quick-start)
- [💬 Example Interactions](#-example-interactions)
- [⚠️ Challenges & Solutions](#️-challenges--solutions)
- [🛠️ Technical Details](#️-technical-details)
- [📁 Project Structure](#-project-structure)
- [📄 License](#-license)

## 🎯 Use Case & Rationale

### Problem Statement
Modern viewers face **choice paralysis** with 500,000+ movies across 100+ streaming platforms. Traditional recommendation engines use simplistic algorithms (collaborative filtering) that lack emotional intelligence and contextual understanding.

### Our Solution: Multi-Agent AI System
CineMatch AI employs a **collaborative multi-agent architecture** where specialized AI agents work together to understand:
- Emotional context ("I'm feeling nostalgic")
- Cinematic preferences ("I love 90s sci-fi")
- Practical constraints ("2-hour runtime for tonight")
- Serendipity factors ("surprise me with something different")

### Why Multi-Agent?
A single LLM struggles with:
- Maintaining context across multiple reasoning steps
- Balancing competing objectives (relevance vs. diversity)
- Fact-checking movie metadata
- Handling real-time API integrations

Our agent team divides these responsibilities for **higher accuracy, better explanations, and more personalized results**.

## 🤖 Agent Team Architecture

### Agent Roles & Responsibilities

```mermaid
graph TD
    User[User Query] --> UI[React Interface]
    UI --> O[Orchestrator Agent]
    
    O --> PP[Preference Profiler]
    O --> NLU[Natural Language Parser]
    O --> TMDB[TMDB Query Builder]
    
    PP --> |User Profile| O
    NLU --> |Parsed Intent| TMDB
    TMDB --> |API Call| TMDB_API[TMDB Database]
    
    TMDB_API --> |Raw Data| FF[Filter & Format Agent]
    FF --> |Structured Data| RA[Recommendation Analyzer]
    RA --> |Curated Results| O
    
    O --> UI
    UI --> User
    
    style O fill:#4a00e0,color:#fff
    style PP fill:#8e2de2,color:#fff
    style TMDB fill:#22c1c3,color:#fff
    style RA fill:#fdbb2d,color:#000
