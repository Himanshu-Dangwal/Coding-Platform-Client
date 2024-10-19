import React from 'react';

const ProblemListCompleted = ({ problems }) => {
    return (
        <ul>
            {problems.map((problem) => (
                <li key={problem.problemId}>
                    {problem.title}
                </li>
            ))}
        </ul>
    );
};

export default ProblemListCompleted;
