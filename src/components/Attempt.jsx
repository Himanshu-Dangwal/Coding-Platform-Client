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

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/problems/attempt/${id}`);
                setProblem(response.data);

                const languageMappingArray = response.data.problemLanguageMapping;
                let languageMapping = languageMappingArray.find(
                    (mapping) => mapping.language === language
                );

                if (languageMapping) {
                    setCode(languageMapping.problemLanguageCodeMapping[0].boilerplateCode);
                }

                setStatusIndicators(Array(response.data.sampleTestCases.length).fill('orange'));
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        };

        fetchProblem();
    }, [id, language]);

    const handleEditorChange = (value) => {
        console.log(value);
        setCode(value);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);

        const languageMapping = problem?.problemLanguageMapping.find(
            (mapping) => mapping.language.toLowerCase() === e.target.value
        );
        if (languageMapping) {
            setCode(languageMapping.problemLanguageCodeMapping[0].boilerplateCode);
        }
    };

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    const handleRunCode = async () => {
        setLoading(true);
        try {
            console.log(code);
            const response = await axios.post(`http://localhost:8080/api/submissions/${id}/run`, { userCode: code, language });
            console.log(response.data);
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
            const response = await axios.post(`http://localhost:8080/api/submissions/${id}/submit`, { userCode: code, language });
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

            console.log(results);

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
                            <p className="card-text extra-text">{problem?.description}</p>
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
                                                    <p><strong>Input:</strong> <pre>{result.input}</pre></p>
                                                    <p><strong>Expected Output:</strong> <pre>{result.expected_output}</pre></p>
                                                    <p><strong>Your Output:</strong> <pre>{atob(result.actual_output)}</pre></p>
                                                    <p>
                                                        <strong>Status:</strong>
                                                        {result.success ? (
                                                            <span className="text-success">Accepted</span>
                                                        ) : result.status === 'Compilation Error' ? (
                                                            <span className="text-danger">Compilation Error</span>
                                                        ) : result.status === 'Wrong Answer' ? (
                                                            <span className="text-warning">Wrong Answer</span>
                                                        ) : result.status === 'Time Limit Exceeded' ? (
                                                            <span className="text-warning">Time Limit Exceeded</span>
                                                        ) : (
                                                            <span>{result.status}</span>
                                                        )}
                                                    </p>
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
