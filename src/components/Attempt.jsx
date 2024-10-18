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

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/problems/attempt/${id}`);
                setProblem(response.data);

                // Set the initial boilerplate code for the selected language
                const languageMappingArray = response.data.problemLanguageMapping;
                let languageMapping = languageMappingArray.find(
                    (mapping) => mapping.language === language
                );

                if (languageMapping) {
                    setCode(languageMapping.problemLanguageCodeMapping[0].boilerplateCode);
                }

                // Initialize status indicators to orange
                setStatusIndicators(Array(response.data.sampleTestCases.length).fill('orange'));
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        };

        fetchProblem();
    }, [id, language]);

    // Handle code editor changes
    const handleEditorChange = (value) => {
        setCode(value);
    };

    // Handle language change
    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);

        const languageMapping = problem?.problemLanguageMapping.find(
            (mapping) => mapping.language.toLowerCase() === e.target.value
        );
        if (languageMapping) {
            setCode(languageMapping.problemLanguageCodeMapping[0].boilerplateCode);
        }
    };

    // Handle theme change
    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    // Handle Run button click
    const handleRunCode = async () => {
        setLoading(true); // Start loader
        try {
            const response = await axios.post(`http://localhost:8080/api/submissions/${id}/run`, { code, language });
            console.log(response.data);
            setRunResult(response.data);
            updateStatusIndicators(response.data.results);
        } catch (error) {
            console.error('Error running code:', error);
        } finally {
            setLoading(false); // Stop loader
        }
    };

    const updateStatusIndicators = (results) => {
        const updatedIndicators = results.map(result => (result.success ? 'green' : 'red'));
        setStatusIndicators(updatedIndicators);
    };

    // Handle Submit button click
    const handleSubmitCode = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/submissions/${id}/submit`, { code, language });
            setSubmitResult(response.data);
        } catch (error) {
            console.error('Error submitting code:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Problem details card (Left side) */}
                <div className="col-md-6 left-side">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title extra-title">{problem?.title}</h3>
                            <p className="card-text extra-text">{problem?.description}</p>
                            <h5>Sample Test Cases</h5>
                            <div className="test-case-container">
                                {problem?.sampleTestCases.map((testCase, idx) => (
                                    <div key={idx} className="test-case mb-3">
                                        <strong>Input:</strong> <pre>{testCase.input}</pre>
                                        <strong>Output:</strong> <pre>{testCase.output}</pre>
                                        {/* Status indicator */}
                                        <div
                                            className="indicator"
                                            style={{ backgroundColor: statusIndicators[idx] }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Code editor and sample input/output (Right side) */}
                <div className="col-md-6 right-side">
                    <div className="editor-container">
                        <div className="editor-header mb-3">
                            <div className="form-group">
                                <label htmlFor="language-select">Language:</label>
                                <select id="language-select" className="form-control" value={language} onChange={handleLanguageChange}>
                                    <option value="C++">C++</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="theme-select">Theme:</label>
                                <select id="theme-select" className="form-control" value={theme} onChange={handleThemeChange}>
                                    <option value="vs-dark">Dark</option>
                                    <option value="light">Light</option>
                                </select>
                            </div>
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

                        {/* Section for sample inputs and outputs */}
                        <div className="sample-io-section mt-4">
                            <div className="io-block">
                                <h5>Sample Input 1</h5>
                                <pre>{problem?.sampleTestCases[0]?.input}</pre>
                                <h5>Sample Output 1</h5>
                                <pre>{problem?.sampleTestCases[0]?.output}</pre>
                            </div>
                            <div className="io-block">
                                <h5>Sample Input 2</h5>
                                <pre>{problem?.sampleTestCases[1]?.input}</pre>
                                <h5>Sample Output 2</h5>
                                <pre>{problem?.sampleTestCases[1]?.output}</pre>
                            </div>
                        </div>

                        {/* Run and Submit buttons */}
                        <div className="action-buttons mt-4">
                            <button className="btn btn-primary mr-2" onClick={handleRunCode} disabled={loading}>
                                {loading ? 'Running...' : '▶ Run'}
                            </button>
                            <button className="btn btn-success" onClick={handleSubmitCode}>
                                Submit
                            </button>
                        </div>

                        {/* Display results */}
                        {runResult && (
                            <div className="run-result mt-4">
                                <h5>Run Result:</h5>
                                <pre>{JSON.stringify(runResult, null, 2)}</pre>
                            </div>
                        )}

                        {submitResult && (
                            <div className="submit-result mt-4">
                                <h5>Submit Result:</h5>
                                <pre>{JSON.stringify(submitResult, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attempt;
