import streamlit as st
import PyPDF2
import docx
import os
import google.generativeai as genai

# Initialize Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Load Gemini model (use correct name)
model = genai.GenerativeModel("models/gemini-2.5-pro")

# Function to extract text from PDF
def extract_text_from_pdf(file):
    pdf_reader = PyPDF2.PdfReader(file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

# Function to extract text from DOCX
def extract_text_from_docx(file):
    doc = docx.Document(file)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text

# Function to process file and extract text
def extract_text(file):
    if file.type == "application/pdf":
        return extract_text_from_pdf(file)
    elif file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return extract_text_from_docx(file)
    else:
        return ""

# Function to get match percent using Gemini
def get_match_percent(jd, cv_text):
    prompt = f"""
You are an ATS CV screening assistant.

Job Description:
{jd}

Candidate CV:
{cv_text}

Based on semantic and skill relevance, give ONLY the overall match percentage between 0 and 100 for how well this CV matches the job description. Respond only with a number. Do not include % sign or any other text.
"""
    response = model.generate_content(prompt)
    try:
        percent = float(response.text.strip())
        percent = max(0, min(100, percent))  # ensure within 0-100
    except:
        percent = 0.0
    return percent

# Streamlit UI
st.title("ATS CV Screening App (Gemini-powered)")

jd = st.text_area("Paste the Job Description here:")

uploaded_files = st.file_uploader("Upload multiple CV files (PDF/DOCX)", accept_multiple_files=True)

if st.button("Rank CVs"):
    if jd and uploaded_files:
        results = []
        with st.spinner("Processing CVs..."):
            for file in uploaded_files:
                cv_text = extract_text(file)
                match_percent = get_match_percent(jd, cv_text)
                results.append({
                    "filename": file.name,
                    "match_percent": round(match_percent, 2)
                })

        # Sort and display top 3
        sorted_results = sorted(results, key=lambda x: x["match_percent"], reverse=True)
        top_3 = sorted_results[:3]

        st.subheader("Top 3 CVs Ranked:")
        for idx, res in enumerate(top_3, 1):
            st.write(f"{idx}. **{res['filename']}** - {res['match_percent']}% match")
    else:
        st.warning("Please enter the job description and upload CV files.")
