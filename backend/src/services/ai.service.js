const fetch = require('node-fetch');
// or require your in‑process model library

const aiService = {
    async runPreAnalysis({ text, imagePath }) {
        // if using Python microservice:
        const res = await fetch('http://localhost:8000/pre-analyze', {
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify({ text, imagePath })
        });
        return res.json();

        // OR, for in‑process:
        // return myNodeModel.predict(text, imagePath);
    },

    async runReportAnalysis({ name, imagePath, modelUsed }) {
        // dispatch to model A or B
        return fetch(`http://localhost:8000/report-analyze/${modelUsed}`, {
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify({ name, imagePath })
        }).then(r=>r.json());
    }
};

module.exports = { aiService };
