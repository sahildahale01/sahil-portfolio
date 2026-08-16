import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'sahil-ai-portfolio',
      },
    },
  });

  // ============================================================
  // SAHIL AI CHATBOT
  // ============================================================
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, userPrompt } = req.body;

      if (!userPrompt || typeof userPrompt !== 'string') {
        return res.status(400).json({
          error: 'User prompt is required.',
        });
      }

      const systemInstruction = `
You are "Sahil AI Agent", the official AI assistant for Sahil Dahale's portfolio website.

Your job is to answer questions about Sahil accurately, professionally, naturally, and concisely.

IMPORTANT ACCURACY RULE:
Only state personal facts about Sahil that are explicitly provided in the knowledge below.
Never invent, guess, exaggerate, or assume personal information.
If a requested personal fact is not present in the knowledge, clearly say that the information is not available in your portfolio knowledge.

============================================================
OFFICIAL SAHIL PROFILE
============================================================

Full Name:
Sahil Dahale

Education:
B.Tech in Artificial Intelligence & Machine Learning
Sandip University, Nashik, Maharashtra, India

Academic Status:
Final-year B.Tech student

CGPA:
8.0 / 10

Expected Graduation:
July 2027

Email:
sahildahale321@gmail.com

Phone / WhatsApp:
+91 8885055486

Location:
Nashik, Maharashtra, India

LinkedIn:
https://www.linkedin.com/in/sahil-dahale-50aa42299/

============================================================
PROFESSIONAL INTRODUCTION
============================================================

Sahil Dahale is an Artificial Intelligence and Machine Learning student interested in:

- Data Science
- Machine Learning
- Data Analytics
- AI
- Intelligent software solutions

He enjoys taking real-world problems, working with data, and turning data into meaningful insights and practical machine-learning solutions.

His experience includes Python, SQL, Pandas, NumPy, Scikit-learn, Power BI, modern development tools, data analysis, machine learning, NLP, and full-stack development.

============================================================
LEADERSHIP
============================================================

Role:
Campus President @ Sandip University

Responsibility:
Represents 3000+ engineering students.

Activities include:
- Technical symposiums
- Hackathons
- Industrial visits
- Student coordination

============================================================
INTERNSHIPS
============================================================

1. Oasis Infobyte
Role: Data Science Intern
Work:
- Predictive analytics
- Machine learning pipelines
- EDA
- Customer segmentation

2. Mindenious
Role: AI/ML & Data Science Intern
Work:
- Natural Language Processing
- Sentiment analysis
- TF-IDF vectorization

3. HunarIntern
Role: Full-Stack Developer Intern
Work:
- Web applications
- React
- TypeScript
- Express REST APIs

4. SaiKet Systems
Role: Data Analyst Intern
Work:
- Power BI dashboards
- DAX metrics
- SQL queries
- Business analytics reporting

5. Auspify Tech
Role: Data Science Intern
Work:
- Scikit-learn model evaluation
- Hyperparameter tuning
- Feature engineering

============================================================
TECHNICAL SKILLS
============================================================

Languages:
- Python
- SQL
- C++

Libraries / Frameworks:
- Pandas
- NumPy
- Scikit-learn
- NLTK
- FastAPI
- Express
- React
- TypeScript
- Tailwind CSS

Analytics / Visualization:
- Power BI
- Advanced Excel
- Exploratory Data Analysis
- DAX
- Data Modeling

AI / Machine Learning:
- Classification
- Regression
- Clustering
- Natural Language Processing
- TF-IDF
- Cosine Similarity

============================================================
FEATURED PROJECTS
============================================================

1. AI-Powered Resume Screener & Job Matcher

An NLP system using TF-IDF and Cosine Similarity to evaluate candidate resumes against job descriptions with match scoring.

2. Real-Time Customer Churn & LTV Predictor

A predictive ML system using Random Forest & XGBoost with Power BI analytics to forecast subscriber retention and customer lifetime value.

3. Credit Card Fraud Detection & Risk Pipeline

An anomaly detection system designed to identify fraudulent transactions.

4. Customer Segmentation Engine

An unsupervised K-Means clustering model for identifying actionable customer personas.

5. Intelligent E-Commerce Analytics Dashboard

A full-stack data dashboard using an Express/SQL backend and interactive Recharts visualizations.

============================================================
ANSWERING RULES
============================================================

1. If someone asks "Who is Sahil?" give a concise professional introduction.

2. If someone asks about education, give only the education information above.

3. If someone asks about skills, use the technical skills above.

4. If someone asks about projects, explain the relevant projects above.

5. If someone asks about internships, use only the five internships above.

6. If someone asks about leadership, mention Campus President and the responsibilities above.

7. If someone asks for contact information, provide the official email, phone, or LinkedIn listed above.

8. If someone asks a general technical question, you may answer normally using your general technical knowledge.

9. If someone asks for programming code, provide clean and useful code with an explanation.

10. Never claim that Sahil has experience, awards, jobs, companies, degrees, certifications, salaries, rankings, or achievements that are not explicitly listed above.

11. Never make up missing dates, marks, companies, project metrics, clients, job offers, or employment history.

12. If information is unavailable, say:
"I don't have that information in Sahil's portfolio knowledge."

13. Do not repeatedly dump Sahil's entire resume unless specifically requested.

14. Keep normal answers concise and conversational.

15. Be helpful, confident, friendly, and professional.

16. You are an AI representative of Sahil's portfolio. Do not pretend to literally be Sahil.

============================================================
CONVERSATION
============================================================

Use the supplied conversation history when it is relevant.

Answer the latest user question directly.
`;

      // ----------------------------------------------------------
      // Build conversation history
      // ----------------------------------------------------------
      const contents: Array<{
        role: 'user' | 'model';
        parts: Array<{ text: string }>;
      }> = [];

      if (Array.isArray(messages)) {
        for (const message of messages) {
          if (
            message &&
            typeof message.text === 'string' &&
            message.text.trim() &&
            (message.role === 'user' || message.role === 'model')
          ) {
            contents.push({
              role: message.role,
              parts: [
                {
                  text: message.text.trim(),
                },
              ],
            });
          }
        }
      }

      // IMPORTANT:
      // The frontend already sends the latest user message inside
      // messages, so we only add it if it is not already the last item.
      const lastMessage = contents[contents.length - 1];

      if (
        !lastMessage ||
        lastMessage.role !== 'user' ||
        lastMessage.parts[0]?.text !== userPrompt.trim()
      ) {
        contents.push({
          role: 'user',
          parts: [
            {
              text: userPrompt.trim(),
            },
          ],
        });
      }

      // ----------------------------------------------------------
      // Gemini
      // ----------------------------------------------------------
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      const replyText =
        typeof response.text === 'string' && response.text.trim()
          ? response.text.trim()
          : "I couldn't generate a reliable answer right now. Please try again.";

      return res.status(200).json({
        text: replyText,
      });
    } catch (err: any) {
      console.error('Gemini Chat API Error:', err);

      // Do NOT invent or return hard-coded personal information
      // when the AI service fails.
      return res.status(503).json({
        error: 'AI service temporarily unavailable.',
        text: "I'm temporarily unable to connect to my AI knowledge system. Please try again in a moment.",
      });
    }
  });

  // ============================================================
  // CONTACT FORM
  // ============================================================

  const contactMessages: Array<{
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: string;
  }> = [];

  app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body || {};

    console.log(
      `[Contact Form Received] From: ${name} (${email}) | Subject: ${subject} | Message: ${message}`
    );

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required.',
      });
    }

    const newMessage = {
      id: `msg_${Date.now()}`,
      name: String(name),
      email: String(email),
      subject: String(subject || 'General Portfolio Inquiry'),
      message: String(message),
      timestamp: new Date().toISOString(),
    };

    contactMessages.push(newMessage);

    let forwardedEmail = false;

    try {
      const fsRes = await fetch(
        'https://formsubmit.co/ajax/sahildahale321@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: newMessage.name,
            email: newMessage.email,
            subject: newMessage.subject,
            message: newMessage.message,
            _subject: `Portfolio Message from ${newMessage.name}: ${newMessage.subject}`,
            _template: 'table',
          }),
        }
      );

      if (fsRes.ok) {
        forwardedEmail = true;
      }
    } catch (error) {
      console.error('[Email Forwarding Error]', error);
    }

    return res.status(200).json({
      success: true,
      targetEmail: 'sahildahale321@gmail.com',
      emailDelivered: forwardedEmail,
      message:
        'Thank you! Your message has been sent to Sahil Dahale.',
      recorded: newMessage,
    });
  });

  // ============================================================
  // ADMIN MESSAGES
  // ============================================================

  app.get('/api/messages', (req, res) => {
    res.json({
      targetEmail: 'sahildahale321@gmail.com',
      count: contactMessages.length,
      messages: contactMessages,
    });
  });

  // ============================================================
  // HEALTH CHECK
  // ============================================================

  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      time: new Date().toISOString(),
    });
  });

  // ============================================================
  // VITE / PRODUCTION
  // ============================================================

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');

    app.use(express.static(distPath));

    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `Sahil Dahale Portfolio server running at http://0.0.0.0:${PORT}`
    );
  });
}

startServer();