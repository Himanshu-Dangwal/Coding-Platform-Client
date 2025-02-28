import React from 'react'

function RunResult({ darkMode, testCasesPassed, totalTestCases, runResult }) {
    return (
        <div className="submit-result mt-4">
            <h5 className={`${darkMode ? 'text-light' : 'text-dark'}`}>
                Test Results ({testCasesPassed}/{totalTestCases} Passed)
            </h5>
            <div className="row">
                {runResult.results.map((result, index) => {
                    // Initialize variable for output
                    let yourOutput = "";

                    // Check for status and assign appropriate value to yourOutput
                    if (result.status === "Compilation Error") {
                        yourOutput = "Compilation Error";
                    } else if (result.status === "Time Limit Exceeded") {
                        yourOutput = "Time Limit Exceeded";
                    } else {
                        yourOutput = result.actual_output;
                    }

                    return (
                        <div className="col-md-6" key={index}>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h6 className={`card-title ${darkMode ? 'text-light' : 'text-dark'}`}>
                                        Test Case {index + 1}
                                    </h6>
                                    <p className={`card-text ${darkMode ? 'text-light' : 'text-dark'}`}>
                                        Status: {result.success ? '✅ Passed' : `❌ ${result.status}`}
                                    </p>
                                    <p className={`card-text ${darkMode ? 'text-light' : 'text-dark'}`}>Input: {result.input}</p>
                                    <p className={`card-text ${darkMode ? 'text-light' : 'text-dark'}`}>Expected: {result.expected_output}</p>
                                    <p className={`card-text ${darkMode ? 'text-light' : 'text-dark'}`}>
                                        Your Output : {yourOutput}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default RunResult;