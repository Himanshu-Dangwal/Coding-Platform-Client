import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from '@monaco-editor/react';

const Attempt = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp');

    useEffect(() => {
        // Fetch problem details from the backend
        const fetchProblem = async () => {
            try {
                console.log(id)
                const response = await axios.get(`http://localhost:8080/api/problems/attempt/${id}`);
                setProblem(response.data);

                console.log(response.data)
                // Set the initial boilerplate code for the selected language
                const languageMapping = response.data.problemLanguageMapping.find(
                    (mapping) => mapping.language.toLowerCase() === language
                );

                if (languageMapping) {
                    setCode(languageMapping.problemLanguageCodeMapping[0].boilerplateCode);
                }
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

        // Find boilerplate code for the new language and set it
        const languageMapping = problem.problemLanguageMapping.find(
            (mapping) => mapping.language.toLowerCase() === e.target.value
        );
        if (languageMapping) {
            setCode(languageMapping.problemLanguageCodeMapping[0].boilerplateCode);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h3>{problem?.title}</h3>
                    <p>{problem?.description}</p>
                    <h5>Sample Test Cases</h5>
                    {problem?.sampleTestCases.map((testCase, idx) => (
                        <div key={idx}>
                            <strong>Input:</strong> {testCase.input} <br />
                            <strong>Output:</strong> {testCase.output}
                        </div>
                    ))}
                </div>

                <div className="col-md-6">
                    <div className="d-flex justify-content-between mb-2">
                        <select value={language} onChange={handleLanguageChange}>
                            <option value="cpp">C++</option>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                        </select>
                    </div>

                    <Editor
                        height="500px"
                        language={language}
                        theme="vs-dark"
                        value={code}
                        onChange={handleEditorChange}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 16,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Attempt;
