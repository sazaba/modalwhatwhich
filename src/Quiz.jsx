
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingTimer from './FloatingTimer';
import questionMark from './assets/question.webp';
import questionAudio from './assets/audio.webp';
import YouTube from 'react-youtube';
import mchoice from './assets/mchoice.webp';
import fblank from './assets/fblank.webp';
import errorid from './assets/errorid.webp';
import completion from './assets/completion.webp';
import reading from './assets/reading.webp';
import acomprehension from './assets/acomprehension.webp';
import julie from './assets/julie.mp3'

const Quiz = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

    useEffect(() => {
        handleRetry();

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    navigate('/timeout');
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleRetry = () => {
        setAnswers({});
        setScore(0);
        setSubmitted(false);
    };

    const handleInputChange = (category, questionId, event) => {
        const { value } = event.target;
        handleAnswer(category, questionId, value);
    };


    const [questions, setQuestions] = useState({
        multipleChoice: [
            {
                "id": 1,
                "question": "___ is responsible for managing a company's finances.",
                "options": ["Who", "Why", "When", "How"],
                "answer": ["Who"],
                "selectedOption": null
            },
            {
                "id": 2,
                "question": "___ do plants need sunlight?",
                "options": ["Who", "Why", "When", "How"],
                "answer": ["Why"],
                "selectedOption": null
            },
            {
                "id": 3,
                "question": "___ do leaves typically change color?",
                "options": ["Who", "Why", "When", "How"],
                "answer": ["When"],
                "selectedOption": null
            },
            {
                "id": 4,
                "question": "___ does a computer process information?",
                "options": ["Who", "Why", "When", "How"],
                "answer": ["How"],
                "selectedOption": null
            },
            {
                "id": 5,
                "question": "___ wrote 'Romeo and Juliet'?",
                "options": ["Who", "Why", "When", "How"],
                "answer": ["Who"],
                "selectedOption": null
            }
        ]

        ,
        fillInTheBlank: [
            {
                "id": 6,
                "question": "___ do birds migrate south for the winter?",
                "options": [],
                "answer": ["Why", "why", "WHY"],
                "selectedOption": null
            },
            {
                "id": 7,
                "question": "___ should we recycle plastic bottles?",
                "options": [],
                "answer": ["Why", "why", "WHY"],
                "selectedOption": null
            },
            {
                "id": 8,
                "question": "___ did the Titanic sink?",
                "options": [],
                "answer": ["When", "when", "WHEN"],
                "selectedOption": null
            },
            {
                "id": 9,
                "question": "___ does a plant grow?",
                "options": [],
                "answer": ["How", "HOW", "how"],
                "selectedOption": null
            },
            {
                "id": 10,
                "question": "___ is the CEO of Microsoft?",
                "options": [],
                "answer": ["Who", "who", "WHO"],
                "selectedOption": null
            }
        ]


        ,
        errorIdentification: [
            {
                "id": 11,
                "question": " ___ is your best friend?",
                "options": ["Who", "Why", "When", "How"],
                "answer": ["Who"],
                "selectedOption": null
            },
            {
                "id": 12,
                "question": " ___ does it rain in the desert?",
                "options": ["Who", "Why", "When", "How"],
                "answer": ["Why"],
                "selectedOption": null
            },
            {
                "id": 13,
                "question": " ___ was George Washington born?",
                "options": ["Who", "Why", "When", "How"],
                "answer": ["When"],
                "selectedOption": null
            },
            {
                "id": 14,
                "question": " ___ can you speak Spanish?",
                "options": ["Who", "Why", "When", "How"],
                "answer": ["How"],
                "selectedOption": null
            },
            {
                "id": 15,
                "question": " ___ is your favorite color?",
                "options": ["Who", "Why", "When", "How"],
                "answer": ["What"],
                "selectedOption": null
            }
        ]


        ,
        sentenceCompletion: [
            {
                "id": 16,
                "question": "___ did you buy that book?",
                "options": [],
                "answer": ["Why", "why", "WHY"],
                "selectedOption": null
            },
            {
                "id": 17,
                "question": "___ can we improve air quality?",
                "options": [],
                "answer": ["How", "how", "HOW"],
                "selectedOption": null
            },
            {
                "id": 18,
                "question": "___ was Shakespeare born?",
                "options": [],
                "answer": ["When", "when", "WHEN"],
                "selectedOption": null
            },
            {
                "id": 19,
                "question": "___ wrote 'Hamlet'?",
                "options": [],
                "answer": ["Who", "who", "WHO"],
                "selectedOption": null
            },
            {
                "id": 20,
                "question": "___ do you cook pasta?",
                "options": [],
                "answer": ["How", "how", "HOW"],
                "selectedOption": null
            }
        ]


        ,
        paragraphInterpretation: [
            {
                "id": 21,
                "question": "When did the Industrial Revolution begin?",
                "options": ["Early 18th century", "Late 18th century", "Early 19th century", "Late 19th century"],
                "answer": ["Late 18th century"]
            },
            {
                "id": 22,
                "question": "What technological advancement played a crucial role in the Industrial Revolution?",
                "options": ["Telecommunication", "Steam engine", "Photography", "Electricity"],
                "answer": ["Steam engine"]
            },
            {
                "id": 23,
                "question": "Why did the Industrial Revolution lead to urbanization?",
                "options": ["To reduce overcrowding in rural areas", "To promote cultural diversity", "To centralize political power", "To accommodate factory workers"],
                "answer": ["To accommodate factory workers"]
            },
            {
                "id": 24,
                "question": "How did the Industrial Revolution impact social structures?",
                "options": ["It reduced social inequalities", "It strengthened feudal systems", "It led to the rise of the working class", "It promoted monarchy"],
                "answer": ["It led to the rise of the working class"]
            },
            {
                "id": 25,
                "question": "Who benefited the most from the economic changes during the Industrial Revolution?",
                "options": ["Farmers", "Artisans", "Factory owners", "Monarchs"],
                "answer": ["Factory owners"]
            }
        ]


        ,

        // audioComprehension: [
        //     {
        //         id: 100,
        //         question: " What is Julie's favorite color?",
        //         options: ["Blue", "Green"],
        //         answer: "Blue",
        //         selectedOption: null,
        //         audio: julie
        //     },
        // ],
    });



    const handleAnswer = (category, questionId, selectedOption) => {
        const updatedAnswers = { ...answers, [questionId]: selectedOption };
        setAnswers(updatedAnswers);

        const updatedQuestions = {
            ...questions,
            [category]: questions[category].map(question => {
                if (question.id === questionId) {
                    return { ...question, selectedOption };
                }
                if (question.questions) {
                    return {
                        ...question,
                        questions: question.questions.map(subQuestion => {
                            if (subQuestion.id === questionId) {
                                return { ...subQuestion, selectedOption };
                            }
                            return subQuestion;
                        }),
                    };
                }
                return question;
            }),
        };
        setQuestions(updatedQuestions);
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        Object.values(questions).flat().forEach(question => {
            const isCorrect = Array.isArray(question.answer)
                ? question.answer.includes(answers[question.id])
                : question.answer === answers[question.id];

            if (isCorrect) {
                correctAnswers += 1;
            }
        });

        const newScore = correctAnswers;
        setScore(newScore);

        const percentage = (correctAnswers / Object.values(questions).flat().length) * 100;

        navigate('/results', { state: { score: newScore, percentage: percentage } });
    };

    const renderQuestions = (category, questions) => (
        <div className='category-container'>
            {questions.map(question => (
                <div className='text-center my-20' key={question.id}>
                    {question.audio && (
                        <>
                            <audio src={question.audio} controls preload="auto" className="mx-auto w-[100%]"></audio>
                            <p className='mb-2 py-5'>{question.question}</p>
                        </>
                    )}
                    {question.video && (
                        <div className="relative">
                            <YouTube
                                videoId="cVsyJvxX48A"
                                className="mx-auto w-full"
                                opts={{ width: '100%' }}
                            />
                            <p className="mb-2 py-5">{question.question}</p>
                        </div>
                    )}
                    {!question.audio && !question.video && (
                        <>
                            <img className='w-24 m-auto' src={questionMark} alt="Question Mark" />
                            <p className=' mb-2 px-3'>{question.question}</p>
                        </>
                    )}

                    {!question.questions && (
                        <div className='flex flex-wrap justify-center'>
                            {category === 'fillInTheBlank' || category === 'sentenceCompletion' ? (
                                <input
                                    type="text"
                                    className='py-2 px-4 border-b-2 border-slangup focus:outline-none focus:border-b-2 focus:border-slangup'
                                    value={question.selectedOption || ''}
                                    onChange={(e) => handleInputChange(category, question.id, e)}
                                    disabled={submitted}
                                />
                            ) : (
                                question.options.map(option => (
                                    <button
                                        key={option}
                                        className={`py-1 px-5 rounded ${question.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
                                        onClick={() => handleAnswer(category, question.id, option)}
                                        disabled={submitted}
                                        style={{ width: question.options.length > 2 ? '80%' : '50%' }}
                                    >
                                        {option}
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                    {question.questions && question.questions.map(subQuestion => (
                        <div className='my-10' key={subQuestion.id}>
                            <p className='px-7'>{subQuestion.question}</p>
                            <div className='flex flex-wrap justify-center'>
                                {category === 'fillInTheBlank' || category === 'sentenceCompletion' ? (
                                    <input
                                        type="text"
                                        className='py-1 px-4 rounded border-2 border-gray-300 mb-2 mr-2'
                                        value={subQuestion.selectedOption || ''}
                                        onChange={(e) => handleInputChange(category, subQuestion.id, e)}
                                        disabled={submitted}
                                    />
                                ) : (
                                    subQuestion.options.map(option => (
                                        <button
                                            key={option}
                                            className={`py-1 px-5 rounded ${subQuestion.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
                                            onClick={() => handleAnswer(category, subQuestion.id, option)}
                                            disabled={submitted}
                                            style={{ width: subQuestion.options.length > 2 ? '80%' : '50%' }}
                                        >
                                            {option}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );


    return (
        <div className='font-custom flex flex-col items-center space-y-3 mb-20'>
            <h1 className='font-semibold text-center px-5 pb-7'>Read each question carefully before answering. Good luck!</h1>
            <FloatingTimer timeLeft={timeLeft} formatTime={formatTime} />

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Multiple Choice Questions</h2>
                <img className='w-[150px]' src={mchoice} alt='' />
            </div>
            {renderQuestions("multipleChoice", questions.multipleChoice)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Fill In The Blank</h2>
                <img className='w-[150px]' src={fblank} alt='' />
            </div>
            {renderQuestions("fillInTheBlank", questions.fillInTheBlank)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>What's The Error?</h2>
                <img className='w-[150px]' src={errorid} alt='' />
            </div>
            {renderQuestions("errorIdentification", questions.errorIdentification)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Complete The Sentence</h2>
                <img className='w-[150px]' src={completion} alt='' />
            </div>
            {renderQuestions("sentenceCompletion", questions.sentenceCompletion)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Paragraph Interpretation</h2>
                <img className='w-[150px]' src={reading} alt='' />
            </div>
            <div className='pt-7 '>
                <p className='mb-2 px-10 text-justify font-light text-gray-700'>The Industrial Revolution, a pivotal period in history, began in the late 18th century in Britain. It marked a significant shift from agrarian economies to industrialized societies, driven by technological advancements in manufacturing and transportation. Key inventions such as the steam engine revolutionized production processes, leading to the establishment of factories and urbanization. This period saw profound social and economic changes, including the rise of capitalism, urban poverty, and the emergence of the working class. The Industrial Revolution not only transformed the economic landscape but also had far-reaching impacts on culture, politics, and global trade.</p>
            </div>
            {renderQuestions("paragraphInterpretation", questions.paragraphInterpretation)}


            {/* <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Audio Comprehension</h2>
                <img className='w-[150px]' src={acomprehension} alt='' />
            </div>
            {renderQuestions("audioComprehension", questions.audioComprehension)} */}

            <button onClick={handleSubmit} className=' bg-green-500 hover:bg-white hover:text-slangup text-white font-bold py-2 px-4 rounded mx-auto 
                w-[80%]' disabled={submitted}>
                Submit
            </button>
        </div>
    );
};

export default Quiz;
