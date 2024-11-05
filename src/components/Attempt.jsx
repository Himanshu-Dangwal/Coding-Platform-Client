import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/Attempt.css'; // Import the custom CSS

const Attempt = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('C++');
    const [theme, setTheme] = useState('vs-dark');
    const [runResult, setRunResult] = useState(null);
    const [submitResult, setSubmitResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [statusIndicators, setStatusIndicators] = useState([]);
    const [congratulations, setCongratulations] = useState(false);
    const [totalTestCases, setTotalCases] = useState(0);
    const [testCasesPassed, setTestCasesPassed] = useState(0);

    // Define default boilerplate code for each language
    const defaultBoilerplateCode = {
        "C++": `#include<bits/stdc++.h>
using namespace std;

int main() {
    
}`,
        "Java": `public class Main {
    public static void main(String[] args) {
        
    }
}`,
        "Python": `def main():
    
if __name__ == "__main__":
    main()`,
        "Javascript": `function main() {
    
}
main();`
    };

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                let HOST = import.meta.env.VITE_HOST;
                // let HOST = process.env.REACT_APP_HOST;
                // let HOST = "http://localhost:8080"

                const response = await axios.get(`${HOST}/api/problems/attempt/${id}`);
                setProblem(response.data);

                // Get language mapping for the default language
                const languageMappingArray = response.data.problemLanguageMapping;
                let languageMapping = languageMappingArray.find(
                    (mapping) => mapping.language === language
                );

                // Set code based on language mapping or default
                if (languageMapping) {
                    const storedCode = localStorage.getItem(`problem_${id}_${language}`);
                    setCode(storedCode || languageMapping.problemLanguageCodeMapping[0].boilerplateCode);
                } else {
                    // Set default boilerplate code if no mapping found
                    setCode(defaultBoilerplateCode[language]);
                }

                setStatusIndicators(Array(response.data.sampleTestCases.length).fill('orange'));
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        };

        fetchProblem();
    }, [id, language]);

    const handleEditorChange = (value) => {
        setCode(value);
        console.log(value);
    };

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        console.log(selectedLanguage);

        const languageMapping = problem?.problemLanguageMapping.find(
            (mapping) => mapping.language.toLowerCase() === selectedLanguage.toLowerCase()
        );

        if (languageMapping) {
            const storedCode = localStorage.getItem(`problem_${id}_${selectedLanguage}`);
            setCode(storedCode || languageMapping.problemLanguageCodeMapping[0].boilerplateCode);
        } else {
            // Set default boilerplate code if no mapping found
            setCode(defaultBoilerplateCode[selectedLanguage]);
        }
    };

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    // Save code to localStorage
    const handleSaveCode = () => {
        localStorage.setItem(`problem_${id}_${language}`, code);
        alert('Code saved successfully!');
    };

    const handleRunCode = async () => {
        setLoading(true);
        try {
            // let HOST = process.env.REACT_APP_HOST;
            let HOST = import.meta.env.VITE_HOST;
            // let HOST = "http://localhost:8080"
            console.log(code)
            console.log(language)
            const response = await axios.post(`${HOST}/api/submissions/${id}/run`, { userCode: code, language });
            setRunResult(response.data);
            updateStatusIndicators(response.data.results);
        } catch (error) {
            console.error('Error running code:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatusIndicators = (results) => {
        const updatedIndicators = [...statusIndicators];
        for (let i = 0; i < Math.min(2, results.length); i++) {
            updatedIndicators[i] = results[i].success ? 'green' : 'red';
        }
        setStatusIndicators(updatedIndicators);
    };

    const handleSubmitCode = async () => {
        setLoading(true);
        try {
            // let HOST = process.env.REACT_APP_HOST;

            // let HOST = "http://localhost:8080"


            let HOST = import.meta.env.VITE_HOST;
            // const response = await axios.post(`${HOST}/api/submissions/${id}/submit`, { userCode: code, language });

            const token = localStorage.getItem('token'); // Make sure this key matches your storage key
            console
            // Prepare headers object
            const headers = {
                'Content-Type': 'application/json', // Set the content type
            };

            // If the token exists, add it to the headers
            if (token) {
                headers.Authorization = `Bearer ${token}`; // Include the token in the Authorization header
            }

            const response = await axios.post(
                `${HOST}/api/submissions/${id}/submit`,
                { userCode: code, language },
                { headers } // Pass the headers in the request
            );

            updateStatusIndicators(response.data.results);
            setSubmitResult(response.data);

            let cases = response.data.results.length;
            setTotalCases(cases);

            let results = response.data.results;
            let cnt = 0;
            results.forEach((result) => {
                if (result.success) {
                    cnt++;
                }
            });

            setTestCasesPassed(cnt);

            if (cases === cnt) {
                setCongratulations(true);
                setTimeout(() => {
                    setCongratulations(false);
                }, 1000); // Show for 1 second
            }
        } catch (error) {
            console.error('Error submitting code:', error);
        } finally {
            setLoading(false);
        }
    };
    const renderTextWithLineBreaks = (text) => {
        if (!text) return null;
        console.log(problem)
        console.log(text)
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className="container mt-4">
            {congratulations && (
                <div className="congratulations-animation">
                    <h2 className="congratulations-banner">
                        🎉 Congratulations! You passed all test cases! 🎉
                    </h2>
                </div>
            )}
            <div className="row">
                <div className="col-md-6 left-side">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title extra-title">{problem?.title}</h3>
                            <p className="card-text extra-text">{renderTextWithLineBreaks(problem?.description)}</p>
                            <h5>Sample Test Cases</h5>
                            <div className="test-case-container">
                                {problem?.sampleTestCases.map((testCase, idx) => (
                                    <div key={idx} className="test-case mb-3">
                                        <strong>Input:</strong> <pre>{testCase.input}</pre>
                                        <strong>Output:</strong> <pre>{testCase.output}</pre>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 right-side">
                    <div className="editor-container">
                        <div className="editor-header mb-3">
                            <div className="form-group">
                                <label htmlFor="language-select">Language:</label>
                                <select id="language-select" className="form-control" value={language} onChange={handleLanguageChange}>
                                    <option value="C++">C++</option>
                                    {/* <option value="Javascript">JavaScript</option> */}
                                    <option value="Python">Python</option>
                                    <option value="Java">Java</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="theme-select">Theme:</label>
                                <select id="theme-select" className="form-control" value={theme} onChange={handleThemeChange}>
                                    <option value="vs-dark">Dark</option>
                                    <option value="light">Light</option>
                                </select>
                            </div>
                            <button className="btn btn-warning" onClick={handleSaveCode}>💾 Save</button>
                        </div>

                        <Editor
                            height="300px"
                            language={language}
                            theme={theme}
                            value={code}
                            onChange={handleEditorChange}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 16,
                            }}
                        />

                        <div className="sample-io-section mt-4">
                            <div className="io-block">
                                <h5>Sample Input 1</h5>
                                <div className="indicator" style={{ backgroundColor: statusIndicators[0] }}></div>
                                <pre>{problem?.sampleTestCases[0]?.input}</pre>
                                <h5>Sample Output 1</h5>
                                <pre>{problem?.sampleTestCases[0]?.output}</pre>
                            </div>

                            <div className="io-block">
                                <h5>Sample Input 2</h5>
                                <div className="indicator" style={{ backgroundColor: statusIndicators[1] }}></div>
                                <pre>{problem?.sampleTestCases[1]?.input}</pre>
                                <h5>Sample Output 2</h5>
                                <pre>{problem?.sampleTestCases[1]?.output}</pre>
                            </div>
                        </div>

                        <div className="action-buttons mt-4">
                            <button className="btn btn-primary mr-2" onClick={handleRunCode} disabled={loading}>
                                {loading ? 'Running...' : '▶ Run'}
                            </button>
                            <button className="btn btn-success" onClick={handleSubmitCode}>
                                {loading ? 'Processing...' : 'Submit'}
                            </button>
                        </div>

                        {runResult && (
                            <div className="run-result mt-4">
                                <h5>Run Result:</h5>
                                <pre>{JSON.stringify(runResult, null, 2)}</pre>
                            </div>
                        )}

                        {submitResult && (
                            <div className="submit-result mt-4">
                                <h5>Submit Result:</h5>
                                <div className="row">
                                    {submitResult.results.map((result, index) => (
                                        <div className="col-md-6" key={index}>
                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    <h6 className="card-title">Test Case {index + 1}</h6>
                                                    <p className="card-text">Success: {result.success ? '✅' : '❌'}</p>
                                                    <p className="card-text">Input: {result.input}</p>
                                                    <p className="card-text">Expected: {result.expected_output}</p>
                                                    <p className="card-text">Received: {atob(result.actual_output)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attempt;
