# InsightFlow

InsightFlow is a web-based application designed to help users efficiently extract and summarize text from PDFs. It enables users to upload PDFs, generate full-document or page-wise summaries, and take notes for easy reference. With secure authentication and a verification page, InsightFlow ensures a seamless and organized document management experience.

## Deployed URL

[InsightFlow](https://priyanshu-2005.github.io/InsightFlow/)

## Features

- **PDF Text Extraction** - Extract text from entire PDFs or specific pages.
- **AI-Powered Summarization** - Get concise summaries of extracted text.
- **Note-Taking** - Take and save notes alongside extracted content..
<!-- - **Visibility Control** - Manage document visibility and access. -->

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL / Supabase
- **Authentication:** Supabase Auth
- **Deployment:** Render(backend), Github Pages(Frontend)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 16)
- npm or yarn
- PostgreSQL or Supabase account

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/InsightFlow.git
cd InsightFlow

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Update .env with your API keys and database credentials

# Start the development server
npm run dev
```

## Usage

1. Upload a PDF file to extract text.
2. Choose whether to summarize the entire document or specific pages.
3. Take notes and save them and revisit them anytime.

## Future Scope

- Real-time collaboration on notes
- Multi-language OCR support
- Dashboard for document insights

## ScreenShots
`/app`
![image](https://github.com/user-attachments/assets/c38a0208-81fb-46ad-9400-6d8f4173c5d1)

`Summarize page button to summarize the page currently open.`
![image](https://github.com/user-attachments/assets/b79c12f6-d06f-4963-a71f-aae797bf9f1b)

`Enable user to take down notes alongside`
![image](https://github.com/user-attachments/assets/b4b50187-7689-47b7-87be-291be6e52d75)

`Save notes in database`
![image](https://github.com/user-attachments/assets/54189e08-87a0-49f5-a0e8-5c8c8d6a4bf0)

`View Previous notes`
![image](https://github.com/user-attachments/assets/8695205b-d57b-408c-818c-320325524f0d)

`Open and edit previous notes`
![image](https://github.com/user-attachments/assets/dce83a0c-5bef-452f-840e-3e7c24c0659d)





