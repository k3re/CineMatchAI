# 🎬 CineMatch AI - Multi-Agent Entertainment Recommendation System

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-orange)](https://ai.google.dev/)
[![TMDB](https://img.shields.io/badge/TMDB-API-green)](https://www.themoviedb.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![LangGraph](https://img.shields.io/badge/LangGraph-Multi--Agent-purple)](https://langchain.com/langgraph)

🤖 **AI-Powered Entertainment Agent** that analyzes emotional wavelengths and cinematic tastes to curate personalized movie recommendations through coordinated multi-agent intelligence.

---

## 📋 Table of Contents
- [Use Case & Rationale](#-use-case--rationale)
- [Agent Team Architecture](#🤖-agent-team-architecture)
- [Installation & Setup](#🚀-installation--setup)
- [Example Interactions](#💬-example-interactions)
- [Challenges & Solutions](#⚡-challenges--solutions)
- [Project Structure](#📁-project-structure)
- [API Reference](#🔧-api-reference)
- [Deployment](#🚀-deployment)
- [Contributing](#🤝-contributing)
- [License](#📄-license)

---

## 🎯 Use Case & Rationale

### **Problem Statement**
Modern streaming platforms offer overwhelming choice but lack **emotional intelligence** in recommendations. Users struggle to find films matching their **current mood, context, and nuanced preferences**.

### **Solution: Multi-Agent AI System**
CineMatch AI employs a **coordinated team of specialized AI agents** that collaboratively:
1. **Understand** emotional state and preferences
2. **Research** from 500,000+ movie database
3. **Analyze** cinematic elements and emotional resonance
4. **Curate** personalized recommendations with explanations

### **Why Multi-Agent?**
- **Specialization**: Each agent excels at specific tasks
- **Collaboration**: Agents share insights for holistic recommendations
- **Error Resilience**: Failure in one agent doesn't collapse system
- **Explainability**: Clear division of labor for transparency

---

## 🤖 Agent Team Architecture

### **Agent Roles & Responsibilities**

```mermaid
graph TB
    User[User Input] --> Supervisor{Supervisor Agent}
    
    Supervisor --> Profiler[Preference Profiler]
    Profiler --> |User Profile| Supervisor
    
    Supervisor --> Researcher[Content Researcher]
    Researcher --> |Movie Data| Supervisor
    
    Supervisor --> Matcher[Taste Matcher]
    Matcher --> |Similarity Scores| Supervisor
    
    Supervisor --> Curator[Diversity Curator]
    Curator --> |Variety Check| Supervisor
    
    Supervisor --> Builder[Plan Builder]
    Builder --> |Final Plan| Supervisor
    
    Supervisor --> Human{Human-in-the-Loop}
    Human --> |Approval/Feedback| Supervisor
    
    Supervisor --> Output[Personalized Recommendations]
    
    style Supervisor fill:#4f46e5
    style Profiler fill:#8b5cf6
    style Researcher fill:#10b981
    style Matcher fill:#f59e0b
    style Curator fill:#ec4899
    style Builder fill:#6366f1
    style Human fill:#ef4444
