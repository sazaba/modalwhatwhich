import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questionMark from './assets/question.png'
import questionAudio1 from './assets/julie.mp3'
import questionAudio2 from './assets/questionAudio2.mp3'
import questionAudio from './assets/audio.png'
const Quiz = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [questions, setQuestions] = useState([

        {
            id: 1,
            question: "She usually (go/goes) to the gym on Fridays.",
            options: ["go", "goes"],
            answer: "goes",
            selectedOption: null
        },
        {
            id: 2,
            question: "Tom (plays/play) soccer every weekend.",
            options: ["play", "plays"],
            answer: "plays",
            selectedOption: null
        },
        {
            id: 3,
            question: "Whose (book/books) is this?",
            options: ["book", "books"],
            answer: "book",
            selectedOption: null
        },
        {
            id: 4,
            question: "I lost (my/mine) keys.",
            options: ["my", "mine"],
            answer: "my",
            selectedOption: null
        },
        {
            id: 5,
            question: "She lives in (an/the) apartment near the park.",
            options: ["an", "the"],
            answer: "an",
            selectedOption: null
        },
        {
            id: 6,
            question: "The store is open from 9 a.m. to 6 p.m. (in/on) weekdays.",
            options: ["in", "on"],
            answer: "on",
            selectedOption: null
        },
        {
            id: 7,
            question: "He arrived (in/on) Paris last week.",
            options: ["in", "on"],
            answer: "in",
            selectedOption: null
        },
        {
            id: 8,
            question: "They have a meeting (in/on) Monday afternoon.",
            options: ["in", "on"],
            answer: "on",
            selectedOption: null
        },
        {
            id: 9,
            question: "She usually wakes up (at/in) 7 o'clock.",
            options: ["at", "in"],
            answer: "at",
            selectedOption: null
        },
        {
            id: 10,
            question: "My birthday is (on/in) December 25th.",
            options: ["on", "in"],
            answer: "on",
            selectedOption: null
        },
        {
            id: 11,
            question: "What is her favorite animal?",
            audio: questionAudio1,
            options: ["Dogs", "Cats"],
            answer: "Cats",
            selectedOption: null
        },
        {
            id: 12,
            question: "How does the speaker goes to her job?",
            audio: questionAudio2,
            options: ["Walking", "In Bus"],
            answer: "Walking",
            selectedOption: null
        },



        // Puedes agregar más preguntas aquí...
    ]);

    const handleAnswer = (questionId, selectedOption) => {
        const updatedAnswers = { ...answers, [questionId]: selectedOption };
        setAnswers(updatedAnswers);

        const updatedQuestions = questions.map(question => {
            if (question.id === questionId) {
                return { ...question, selectedOption };
            }
            return question;
        });
        setQuestions(updatedQuestions);
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        questions.forEach(question => {
            if (answers[question.id] === question.answer) {
                correctAnswers += 1;
            }
        });

        const newScore = correctAnswers;
        setScore(newScore);

        const percentage = (correctAnswers / questions.length) * 100;

        // Navegar a la página de resultados con el puntaje y el porcentaje
        navigate('/results', { state: { score: newScore, percentage: percentage } });
    };


    return (
        <div className='font-custom flex flex-col items-center space-y-3 mb-20'>
            <h1 className='font-semibold text-center px-5'>Read each question carefully before answering. Good luck!</h1>
            {questions.map(question => (
                <div className='text-center text-black bg-white shadow-xl rounded-lg p-10 w-[80%]' key={question.id}>
                    {question.audio && (
                        <>
                            <img className='w-20 m-auto' src={questionAudio} alt="Question Audio" />
                            <audio src={question.audio} controls preload="auto" className="mx-auto w-[100%]"></audio>
                            <p className='mb-2'>{question.question}</p>
                            <div className='flex space-x-2'>
                                {question.options.map(option => (
                                    <button
                                        key={option}
                                        className={`py-1 px-4 rounded w-[50%] ${question.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold`}
                                        onClick={() => handleAnswer(question.id, option)}
                                        disabled={submitted}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                    {!question.audio && (
                        <>
                            <img className='w-20 m-auto' src={questionMark} alt="Question Mark" />
                            <p className='mb-2'>{question.question}</p>
                            <div className='flex space-x-2'>
                                {question.options.map(option => (
                                    <button
                                        key={option}
                                        className={`py-1 px-4 rounded w-[50%] ${question.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold`}
                                        onClick={() => handleAnswer(question.id, option)}
                                        disabled={submitted}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            ))}

            <button onClick={handleSubmit} className=' bg-lime-400 hover:bg-white hover:text-slangup text-white font-bold py-2 px-4 rounded mx-auto 
                w-[80%]' disabled={submitted}>
                Submit
            </button>
        </div>
    );
};

export default Quiz;
