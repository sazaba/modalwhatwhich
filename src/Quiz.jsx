
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
                "question": "I will call you ___.",
                "options": ["in the morning", "on the morning", "at the morning"],
                "answer": ["in the morning"],
                "selectedOption": null
            },
            {
                "id": 2,
                "question": "We have lunch ___.",
                "options": ["in noon", "on noon", "at noon"],
                "answer": ["at noon"],
                "selectedOption": null
            },
            {
                "id": 3,
                "question": "She was born ___.",
                "options": ["in January", "on January", "at January"],
                "answer": ["in January"],
                "selectedOption": null
            },
            {
                "id": 4,
                "question": "The movie starts ___.",
                "options": ["in 7:00 PM", "on 7:00 PM", "at 7:00 PM"],
                "answer": ["at 7:00 PM"],
                "selectedOption": null
            },
            {
                "id": 5,
                "question": "They visit their grandparents ___.",
                "options": ["in the weekend", "on the weekend", "at the weekend"],
                "answer": ["on the weekend"],
                "selectedOption": null
            }
        ]
        ,
        fillInTheBlank: [
            {
                "id": 6,
                "question": "I usually wake up ___ 7:00 AM.",
                "options": [],
                "answer": ["at", "At", "AT"],
                "selectedOption": null
            },
            {
                "id": 7,
                "question": "My birthday is ___ May.",
                "options": [],
                "answer": ["in", "In", "IN"],
                "selectedOption": null
            },
            {
                "id": 8,
                "question": "We have a meeting ___ Friday.",
                "options": [],
                "answer": ["on", "On", "ON"],
                "selectedOption": null
            },
            {
                "id": 9,
                "question": "She likes to read books ___ the evening.",
                "options": [],
                "answer": ["in", "In", "IN"],
                "selectedOption": null
            },
            {
                "id": 10,
                "question": "The store closes ___ midnight.",
                "options": [],
                "answer": ["at", "At", "AT"],
                "selectedOption": null
            }
        ]

        ,
        errorIdentification: [
            {
                "id": 11,
                "question": "I will call you on the morning.",
                "options": ["I", "will call", "on", "the morning"],
                "answer": ["on"],
                "selectedOption": null
            },
            {
                "id": 12,
                "question": "We have lunch on noon.",
                "options": ["We", "have lunch", "on", "noon"],
                "answer": ["on"],
                "selectedOption": null
            },
            {
                "id": 13,
                "question": "She was born at January.",
                "options": ["She", "was born", "at", "January"],
                "answer": ["at"],
                "selectedOption": null
            },
            {
                "id": 14,
                "question": "The movie starts in 7:00 PM.",
                "options": ["The movie", "starts", "in", "7:00 PM"],
                "answer": ["in"],
                "selectedOption": null
            },
            {
                "id": 15,
                "question": "They visit their grandparents in the weekend.",
                "options": ["They", "visit", "in", "the weekend"],
                "answer": ["in"],
                "selectedOption": null
            }
        ]

        ,
        sentenceCompletion: [
            {
                "id": 16,
                "question": "I usually wake up ___.",
                "options": ["at 7:00 AM", "on 7:00 AM", "in 7:00 AM"],
                "answer": ["at 7:00 AM"],
                "selectedOption": null
            },
            {
                "id": 17,
                "question": "My birthday is ___.",
                "options": ["at May", "on May", "in May"],
                "answer": ["in May"],
                "selectedOption": null
            },
            {
                "id": 18,
                "question": "We have a meeting ___.",
                "options": ["at Friday", "on Friday", "in Friday"],
                "answer": ["on Friday"],
                "selectedOption": null
            },
            {
                "id": 19,
                "question": "She likes to read books ___.",
                "options": ["at the evening", "on the evening", "in the evening"],
                "answer": ["in the evening"],
                "selectedOption": null
            },
            {
                "id": 20,
                "question": "The store closes ___.",
                "options": ["at midnight", "on midnight", "in midnight"],
                "answer": ["at midnight"],
                "selectedOption": null
            }
        ]

        ,
        paragraphInterpretation: [
            {
                "id": 21,
                "question": "What time does the person usually wake up?",
                "options": ["7:00 AM", "8:00 AM", "9:00 AM"],
                "answer": ["7:00 AM"],
                "selectedOption": null
            },
            {
                "id": 22,
                "question": "When is the person's birthday?",
                "options": ["In May", "In June", "In July"],
                "answer": ["In May"],
                "selectedOption": null
            },
            {
                "id": 23,
                "question": "On which day is the meeting?",
                "options": ["Monday", "Wednesday", "Friday"],
                "answer": ["Friday"],
                "selectedOption": null
            },
            {
                "id": 24,
                "question": "When does the person like to read books?",
                "options": ["In the morning", "In the afternoon", "In the evening"],
                "answer": ["In the evening"],
                "selectedOption": null
            },
            {
                "id": 25,
                "question": "At what time does the store close?",
                "options": ["At 10:00 PM", "At midnight", "At 11:00 PM"],
                "answer": ["At midnight"],
                "selectedOption": null
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
                <p className='mb-2 px-10 text-justify font-light text-gray-700'>John is a very organized person with a well-established daily routine. Every day, John wakes up at 7:00 AM, ready to start his day. His birthday is in May, a time of year he loves because the weather is perfect for outdoor celebrations.

                    John is a manager at a company and has an important meeting every Friday. Despite his busy schedule, he always finds time for his hobbies. He likes to read books in the quiet of the evening. It's his way of relaxing after a long day of work.

                    John also has the habit of doing his shopping before midnight, as the store he regularly goes to closes at that time. This routine has allowed him to maintain a balance between his work and personal life, ensuring that he has time for himself and his personal interests.</p>
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
