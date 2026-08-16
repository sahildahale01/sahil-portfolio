import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Google Gen AI client with server environment variable
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // AI Chat Assistant API endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, userPrompt } = req.body;
      if (!userPrompt) {
        return res.status(400).json({ error: 'User prompt is required.' });
      }

      const systemInstruction = `You are the AI Assistant representing Sahil Dahale, a B.Tech Final Year Student in Artificial Intelligence & Machine Learning at Sandip University, Nashik, India.
Your mission is to represent Sahil with absolute accuracy, technical authority, speed, and friendliness to recruiters, hiring managers, potential clients, and software developers.

SAHIL'S OFFICIAL RECRUITER & MNC INTRODUCTION:
"Hi, I’m Sahil Dahale, an Artificial Intelligence and Machine Learning student with a strong interest in Data Science, Machine Learning, Data Analytics, and intelligent software solutions.
I enjoy taking real-world problems, working with data, and turning that data into meaningful insights and practical machine-learning solutions.
My experience includes working with Python, SQL, Pandas, NumPy, Scikit-learn, Power BI, and modern development tools, along with hands-on experience across data analysis, machine learning, NLP, and full-stack development.
I’ve built projects ranging from AI-powered resume screening and customer churn prediction to fraud detection, customer segmentation, and business intelligence dashboards—each helping me strengthen the way I approach problems, analyze data, and build solutions.
Alongside technology, I’ve developed my leadership and communication skills as a Campus President, representing more than 3000 students and helping coordinate technical initiatives and large-scale events.
What drives me most is the opportunity to keep learning, work with talented teams, and build technology that creates measurable impact.
I’m currently looking to contribute my skills in AI, Data Science, and Analytics to challenging real-world problems—and grow into a professional who builds intelligent solutions that matter."

KEY BIOGRAPHY & CREDENTIALS:
- **Full Name**: Sahil Dahale
- **Current Academic Status**: B.Tech Final Year Student in AI & ML at Sandip University, Nashik, Maharashtra, India (CGPA: 8.0 / 10, Expected Graduation: July 2027)
- **Phone & WhatsApp**: +91 8885055486
- **Email**: sahildahale321@gmail.com
- **Location**: Nashik, Maharashtra, India
- **LinkedIn**: https://www.linkedin.com/in/sahil-dahale-50aa42299/

LEADERSHIP & RESPONSIBILITY:
- **Campus President @ Sandip University**: Represents over 3000+ engineering students, coordinating technical symposiums, hackathons, and industrial visits.

5 INDUSTRY INTERNSHIPS:
1. **Oasis Infobyte** (Data Science Intern) - Predictive analytics, machine learning pipelines, EDA, customer segmentation.
2. **Mindenious** (AI/ML & Data Science Intern) - Natural Language Processing (NLP), sentiment analysis models, TF-IDF vectorization.
3. **HunarIntern** (Full-Stack Developer Intern) - Web applications, React, TypeScript, Express REST APIs.
4. **SaiKet Systems** (Data Analyst Intern) - Power BI dashboards, DAX metrics, SQL queries, business analytics reporting.
5. **Auspify Tech** (Data Science Intern) - Scikit-learn model evaluation, hyperparameter tuning, feature engineering.

TECHNICAL SKILLS:
- **Languages**: Python, SQL, C++
- **Libraries & Frameworks**: Pandas, NumPy, Scikit-learn, NLTK, FastAPI, Express, React, TypeScript, Tailwind CSS
- **Analytics & Visualization**: Power BI, Advanced Excel, Exploratory Data Analysis (EDA), DAX, Data Modeling
- **Machine Learning & AI**: Classification, Regression, Clustering, Natural Language Processing (NLP), TF-IDF, Cosine Similarity

FEATURED PROJECTS:
1. **AI-Powered Resume Screener & Job Matcher**: NLP system using TF-IDF and Cosine Similarity to evaluate candidate resumes against job descriptions with match scoring.
2. **Real-Time Customer Churn & LTV Predictor**: Predictive ML system utilizing Random Forest & XGBoost with Power BI analytics to forecast subscriber retention and customer lifetime value.
3. **Credit Card Fraud Detection & Risk Pipeline**: Anomaly detection system identifying fraudulent transactions with high precision.
4. **Customer Segmentation Engine**: Unsupervised K-Means clustering model identifying actionable customer personas.
5. **Intelligent E-Commerce Analytics Dashboard**: Full-stack data dashboard with Express/SQL backend and interactive Recharts visualizations.

RESPONSE GUIDELINES:
- Answer questions accurately, concisely, and professionally in the tone of Sahil's official AI delegate.
- When asked about Sahil's background, education, projects, or internships, provide exact details from the context above.
- If asked for code examples (e.g. "Show me Python code for Random Forest", "Write SQL for customer churn", "Explain TF-IDF vectorization"), provide clean, fully-commented Markdown code blocks with clear explanations!
- Emphasize Sahil's readiness for full-time Data Analyst, Data Science, and AI/ML roles.
- Do NOT fabricate facts outside Sahil's resume context.`;

      // Construct history for multi-turn chat
      const contents: any[] = [];
      if (Array.isArray(messages) && messages.length > 0) {
        for (const m of messages) {
          if (m.text && (m.role === 'user' || m.role === 'model')) {
            contents.push({
              role: m.role === 'user' ? 'user' : 'model',
              parts: [{ text: m.text }]
            });
          }
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: userPrompt }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "I'm Sahil's AI assistant. How can I help you learn more about Sahil's AI/ML engineering work?";
      return res.status(200).json({ text: replyText });
    } catch (err: any) {
      console.error('Gemini Chat API Error:', err);
      // Fallback response if API key is not present or transient network issue
      return res.status(200).json({
        text: `Sahil Dahale is an AI/ML Engineer, Data Scientist, and Data Analyst pursuing B.Tech in AI & ML at Sandip University Nashik (CGPA 8.0/10). He has completed 5 internships (Oasis Infobyte, Mindenious, HunarIntern, SaiKet Systems, Auspify Tech) and serves as Campus President representing 3000+ students. Feel free to explore his projects and connect directly via +91 8885055486 or sahildahale321@gmail.com!`
      });
    }
  });

  // In-Memory Contact Messages Store
  const contactMessages: Array<{
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: string;
  }> = [];

  // Contact Form API route with automatic email delivery via FormSubmit
  app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body || {};
    console.log(`[Contact Form Received] From: ${name} (${email}) | Subject: ${subject} | Message: ${message}`);
    
    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const newMessage = {
      id: `msg_${Date.now()}`,
      name: String(name),
      email: String(email),
      subject: String(subject || 'General Portfolio Inquiry'),
      message: String(message),
      timestamp: new Date().toISOString()
    };

    contactMessages.push(newMessage);

    // Forward to FormSubmit service to send actual email to sahildahale321@gmail.com
    let forwardedEmail = false;
    try {
      const fsRes = await fetch('https://formsubmit.co/ajax/sahildahale321@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: newMessage.name,
          email: newMessage.email,
          subject: newMessage.subject,
          message: newMessage.message,
          _subject: `Portfolio Message from ${newMessage.name}: ${newMessage.subject}`,
          _template: 'table'
        })
      });
      if (fsRes.ok) {
        forwardedEmail = true;
      }
    } catch (e) {
      console.error('[Email Forwarding Error]', e);
    }

    return res.status(200).json({
      success: true,
      targetEmail: 'sahildahale321@gmail.com',
      emailDelivered: forwardedEmail,
      message: 'Thank you! Your message has been sent to Sahil Dahale at sahildahale321@gmail.com.',
      recorded: newMessage
    });
  });

  // Retrieve received messages (Full-Stack Admin Endpoint)
  app.get('/api/messages', (req, res) => {
    res.json({
      targetEmail: 'sahildahale321@gmail.com',
      count: contactMessages.length,
      messages: contactMessages
    });
  });

  // Healthcheck endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Vite middleware for development / static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
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
    console.log(`Sahil Dahale Portfolio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
