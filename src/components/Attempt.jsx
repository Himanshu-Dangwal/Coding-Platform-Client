
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Attempt.css';

const languageMap = {
    "C++": "cpp",
    "Python": "python",
    "Java": "java",
    "Javascript": "javascript"
};

const Attempt = ({ darkMode, isLoggedIn, setIsLoggedIn }) => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('C++');
    const [theme, setTheme] = useState(darkMode ? 'vs-dark' : 'vs');
    const [runResult, setRunResult] = useState(null);
    const [submitResult, setSubmitResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [statusIndicators, setStatusIndicators] = useState([]);
    const [congratulations, setCongratulations] = useState(false);
    const [totalTestCases, setTotalCases] = useState(0);
    const [testCasesPassed, setTestCasesPassed] = useState(0);
    const editorRef = useRef(null);

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
        setTheme(darkMode ? 'vs-dark' : 'vs');
    }, [darkMode]);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                let HOST = import.meta.env.VITE_HOST;
                const response = await axios.get(`${HOST}/api/problems/attempt/${id}`);
                setProblem(response.data);

                if (localStorage.getItem(`problem_${response.data._id}_${language}`)) {
                    setCode(localStorage.getItem(`problem_${response.data._id}_${language}`));
                } else {
                    const languageMappingArray = response.data.problemLanguageMapping;
                    let languageMapping = languageMappingArray.find(
                        (mapping) => mapping.language === language
                    );

                    if (languageMapping) {
                        const storedCode = localStorage.getItem(`problem_${id}_${language}`);
                        setCode(storedCode || languageMapping.problemLanguageCodeMapping[0].boilerplateCode);
                    } else {
                        setCode(defaultBoilerplateCode[language]);
                    }
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
    };

    const handleLanguageChange = (e) => {
        handleSaveCode(false);
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);

        if (localStorage.getItem(`problem_${problem._id}_${selectedLanguage}`)) {
            setCode(localStorage.getItem(`problem_${problem._id}_${selectedLanguage}`));
        } else {
            const languageMapping = problem?.problemLanguageMapping.find(
                (mapping) => mapping.language.toLowerCase() === selectedLanguage.toLowerCase()
            );

            if (languageMapping) {
                const storedCode = localStorage.getItem(`problem_${id}_${selectedLanguage}`);
                setCode(storedCode || languageMapping.problemLanguageCodeMapping[0].boilerplateCode);
            } else {
                setCode(defaultBoilerplateCode[selectedLanguage]);
            }
        }
    };

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    const handleSaveCode = (savePressed) => {
        localStorage.setItem(`problem_${id}_${language}`, code);
        if (savePressed) alert('Code saved successfully!');
    };

    const handleRunCode = async () => {
        handleSaveCode(false);
        setLoading(true);
        try {
            let HOST = import.meta.env.VITE_HOST;
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
        handleSaveCode(false);
        if (isLoggedIn) {
            setLoading(true);
            try {
                let HOST = import.meta.env.VITE_HOST;
                const token = localStorage.getItem('token');
                const headers = {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                };

                const response = await axios.post(
                    `${HOST}/api/submissions/${id}/submit`,
                    { userCode: code, language },
                    { headers }
                );

                updateStatusIndicators(response.data.results);
                setSubmitResult(response.data);

                const cases = response.data.results.length;
                setTotalCases(cases);

                const cnt = response.data.results.filter(result => result.success).length;
                setTestCasesPassed(cnt);

                if (cases === cnt) {
                    setCongratulations(true);
                    setTimeout(() => setCongratulations(false), 1000);
                }
            } catch (error) {
                console.error('Error submitting code:', error);
            } finally {
                setLoading(false);
            }
        } else {
            alert("You need to login first to submit the code");
            localStorage.setItem(`problem_${id}_${language}`, code);
        }
    };

    const editorOptions = {
        minimap: { enabled: true },
        fontSize: 16,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        folding: true,
        automaticLayout: true,
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        suggest: { quickSuggestions: true },
        scrollbar: { vertical: 'auto', horizontal: 'auto' },
        wordWrap: 'on',
    };

    const handleEditorMount = (editor, monaco) => {
        editorRef.current = editor;
        const editorNode = editor.getDomNode();

        // Add resize observer to track editor height changes
        const resizeObserver = new ResizeObserver(() => {
            // Force update scroll position calculations
            editor.layout();
        });

        // Handle wheel events with improved edge detection
        editorNode.addEventListener('wheel', (event) => {
            const scrollTop = editor.getScrollTop();
            const scrollHeight = editor.getScrollHeight();
            const editorHeight = editor.getLayoutInfo().height;
            const delta = -event.deltaY;

            // Check if editor is scrollable at all
            const isScrollable = scrollHeight > editorHeight;
            if (!isScrollable) {
                event.stopPropagation();
                return;
            }

            // Calculate potential new scroll position
            const potentialScrollTop = scrollTop + delta;
            const canScrollUp = potentialScrollTop > 0;
            const canScrollDown = potentialScrollTop < scrollHeight - editorHeight;

            // Check if we're at the boundaries
            const atTop = scrollTop <= 0 && delta > 0;
            const atBottom = scrollTop >= scrollHeight - editorHeight && delta < 0;

            if ((atTop || atBottom) || (!canScrollUp && !canScrollDown)) {
                // Allow page scroll when at boundaries
                event.stopPropagation();
                return;
            }

            // Otherwise handle editor scroll
            event.preventDefault();
            event.stopPropagation();
            editor.setScrollTop(potentialScrollTop);
        }, { passive: false });

        resizeObserver.observe(editorNode);
    };

    const renderTextWithLineBreaks = (text) => {
        return text?.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className={`container mt-4 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            {congratulations && (
                <div className="congratulations-animation">
                    <h2 className="congratulations-banner">
                        🎉 Congratulations! You passed all test cases! 🎉
                    </h2>
                </div>
            )}
            <div className="row">
                <div className="col-md-6 left-side">
                    <div className={`card ${darkMode ? 'bg-secondary text-white' : ''}`}>
                        <div className="card-body">
                            <h3 className={`card-title text-center ${darkMode ? 'text-white' : 'text-dark'}`}>
                                {problem?.title}
                            </h3>
                            <p className="card-text extra-text">
                                {renderTextWithLineBreaks(problem?.description)}
                            </p>
                            <h5>Sample Test Cases</h5>
                            <div className={`test-case-container ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                                {problem?.sampleTestCases.map((testCase, idx) => (
                                    <div key={idx} className="test-case mb-3">
                                        <strong>Input:</strong>
                                        <pre className={darkMode ? 'bg-dark text-white p-2' : ''}>
                                            {testCase.input}
                                        </pre>
                                        <strong>Output:</strong>
                                        <pre className={darkMode ? 'bg-dark text-white p-2' : ''}>
                                            {testCase.output}
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`col-md-6 right-side ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                    <div className={`editor-container ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                        <div className="editor-header mb-3">
                            <div className="form-group">
                                <label htmlFor="language-select">Language:</label>
                                <select
                                    id="language-select"
                                    className="form-control"
                                    value={language}
                                    onChange={handleLanguageChange}
                                >
                                    <option value="C++">C++</option>
                                    <option value="Python">Python</option>
                                    <option value="Java">Java</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="theme-select">Theme:</label>
                                <select
                                    id="theme-select"
                                    className="form-control"
                                    value={theme}
                                    onChange={handleThemeChange}
                                >
                                    <option value="vs-dark">Dark</option>
                                    <option value="vs">Light</option>
                                </select>
                            </div>
                            <button className="btn btn-warning" onClick={() => handleSaveCode(true)}>
                                💾 Save
                            </button>
                        </div>

                        <Editor
                            height="70vh"
                            language={languageMap[language]}
                            theme={theme}
                            value={code}
                            onChange={handleEditorChange}
                            options={editorOptions}
                            onMount={handleEditorMount}
                        />

                        <div className={`sample-io-section mt-4 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                            {problem?.sampleTestCases.slice(0, 2).map((testCase, idx) => (
                                <div key={idx} className={`io-block ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                                    <h5>Sample Input {idx + 1}</h5>
                                    <div className="indicator" style={{ backgroundColor: statusIndicators[idx] }}></div>
                                    <pre className={darkMode ? 'bg-dark text-white p-2' : 'bg-light text-dark p-2'}>
                                        {testCase.input}
                                    </pre>
                                    <h5>Sample Output {idx + 1}</h5>
                                    <pre className={darkMode ? 'bg-dark text-white p-2' : 'bg-light text-dark p-2'}>
                                        {testCase.output}
                                    </pre>
                                </div>
                            ))}
                        </div>

                        <div className="action-buttons mt-4">
                            <button className={`btn btn-primary mr-2 ${darkMode ? 'text-white' : 'text-dark'}`}
                                onClick={handleRunCode}
                                disabled={loading}>
                                {loading ? 'Running...' : '▶ Run'}
                            </button>
                            <button className={`btn btn-success ${darkMode ? 'text-white' : 'text-dark'}`}
                                onClick={handleSubmitCode}>
                                {loading ? 'Processing...' : 'Submit'}
                            </button>
                        </div>

                        {submitResult && (
                            <div className="submit-result mt-4">
                                <h5 className={`${darkMode ? 'text-light' : 'text-dark'}`}>
                                    Test Results ({testCasesPassed}/{totalTestCases} Passed)
                                </h5>
                                <div className="row">
                                    {submitResult.results.map((result, index) => (
                                        <div className="col-md-6" key={index}>
                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    <h6 className={`card-title ${darkMode ? 'text-light' : 'text-dark'}`}>
                                                        Test Case {index + 1}
                                                    </h6>
                                                    <p className={`card-text ${darkMode ? 'text-light' : 'text-dark'}`}>
                                                        Status: {result.success ? '✅ Passed' : '❌ Failed'}
                                                    </p>
                                                    {!result.success && (
                                                        <>
                                                            <p className={`card-text ${darkMode ? 'text-light' : 'text-dark'}`}>
                                                                Expected: {result.expected_output}
                                                            </p>
                                                            <p className={`card-text ${darkMode ? 'text-light' : 'text-dark'}`}>
                                                                Received: {atob(result.actual_output)}
                                                            </p>
                                                        </>
                                                    )}
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