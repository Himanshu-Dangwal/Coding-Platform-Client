import React from 'react';

const ProblemListCompleted = ({ problems, darkMode }) => {
    return (
        <ul className={`list-group ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            {problems.map((problem) => (
                <li key={problem.problemId} className={`list-group-item ${darkMode ? 'text-dark' : 'text-dark'}`}>
                    {problem.title}
                </li>
            ))}
        </ul>
    );
};

export default ProblemListCompleted;


// import React from 'react';

// const ProblemListCompleted = ({ problems, darkMode }) => {
//     return (
//         <ul className={`list-group ${darkMode ? 'bg-dark text-light dark-mode' : 'bg-light text-dark'}`}>
//             {problems.map((problem) => (
//                 <li
//                     key={problem.problemId}
//                     className={`list-group-item ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
//                 >
//                     {problem.title}
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default ProblemListCompleted;
