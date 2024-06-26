
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
                "question": "I need help with my homework. ___ you help me with my homework?",
                "options": ["Can", "Should", "Would", "Which"],
                "answer": ["Can"],
                "selectedOption": null
            },
            {
                "id": 2,
                "question": "I'm choosing a color for my room. ___ is your favorite color?",
                "options": ["What", "Which", "Can", "Should"],
                "answer": ["What"],
                "selectedOption": null
            },
            {
                "id": 3,
                "question": "I forgot my pen. ___ I borrow your pen?",
                "options": ["Can", "Should", "Would", "Which"],
                "answer": ["Can"],
                "selectedOption": null
            },
            {
                "id": 4,
                "question": "We are going out for dinner. ___ you like to join us?",
                "options": ["Can", "Should", "Would", "What"],
                "answer": ["Would"],
                "selectedOption": null
            },
            {
                "id": 5,
                "question": "I have two pairs of shoes. ___ shoes should I wear with this dress?",
                "options": ["What", "Which", "Can", "Would"],
                "answer": ["Which"],
                "selectedOption": null
            }
        ]

        ,
        fillInTheBlank: [
            {
                "id": 6,
                "question": "I don't feel well. I ___ go to the doctor if I don't feel better tomorrow.",
                "options": [],
                "answer": ["should", "Should", "SHOULD"],
                "selectedOption": null
            },
            {
                "id": 7,
                "question": "Would you like something to drink? ___ you like a cup of tea?",
                "options": [],
                "answer": ["Would", "would", "WOULD"],
                "selectedOption": null
            },
            {
                "id": 8,
                "question": "We are in a foreign country. ___ you speak any other languages?",
                "options": [],
                "answer": ["Can", "can", "CAN"],
                "selectedOption": null
            },
            {
                "id": 9,
                "question": "There are many movies playing tonight. ___ movie do you want to watch?",
                "options": [],
                "answer": ["Which", "WHICH", "which"],
                "selectedOption": null
            },
            {
                "id": 10,
                "question": "I'm preparing a meal for you. ___ is your favorite food?",
                "options": [],
                "answer": ["What", "what", "WHAT"],
                "selectedOption": null
            }
        ]




        ,
        errorIdentification: [
            {
                "id": 11,
                "question": "Identify the error: He should goes to the gym more often.",
                "options": ["He", "should", "goes", "No error"],
                "answer": ["goes"],
                "selectedOption": null
            },
            {
                "id": 12,
                "question": "Identify the error: What you like to do this weekend?",
                "options": ["What", "you", "like", "No error"],
                "answer": ["What"],
                "selectedOption": null
            },
            {
                "id": 13,
                "question": "Identify the error: Can you tells me the time?",
                "options": ["Can", "you", "tells", "No error"],
                "answer": ["tells"],
                "selectedOption": null
            },
            {
                "id": 14,
                "question": "Identify the error: Which is your favorite season?",
                "options": ["Which", "is", "your", "No error"],
                "answer": ["No error"],
                "selectedOption": null
            },
            {
                "id": 15,
                "question": "Identify the error: Would you can help me with this project?",
                "options": ["Would", "you", "can", "No error"],
                "answer": ["can"],
                "selectedOption": null
            }
        ]

        ,
        sentenceCompletion: [
            {
                "id": 16,
                "question": "The restaurant is very popular. I ___ recommend it to anyone.",
                "options": ["would", "should", "can", "what"],
                "answer": ["would", "Would", "WOULD"],
                "selectedOption": null
            },
            {
                "id": 17,
                "question": "I'm reading a book right now. ___ book are you reading?",
                "options": ["Which", "What", "Can", "Should"],
                "answer": ["Which", "which", "WHICH"],
                "selectedOption": null
            },
            {
                "id": 18,
                "question": "It's getting cold. ___ you mind closing the door?",
                "options": ["Would", "Can", "Should", "What"],
                "answer": ["Would", "would", "WOULD"],
                "selectedOption": null
            },
            {
                "id": 19,
                "question": "You look tired. ___ you like to sit down for a while?",
                "options": ["Would", "Can", "Should", "What"],
                "answer": ["Would", "would", "WOULD"],
                "selectedOption": null
            },
            {
                "id": 20,
                "question": "I have a lot of work to do. ___ I start with this task?",
                "options": ["Should", "Would", "Can", "What"],
                "answer": ["Should", "should", "SHOULD"],
                "selectedOption": null
            }
        ]

        ,
        paragraphInterpretation: [
            {
                "id": 21,
                "question": "What did Sarah and her friends decide to do?",
                "options": ["Go shopping", "Plan a picnic", "Visit a museum", "Watch a movie"],
                "answer": ["Plan a picnic"],
                "selectedOption": null
            },
            {
                "id": 22,
                "question": "Which park did Tom suggest they go to?",
                "options": ["The park by the mall", "The park by the lake", "The park in the city", "The park with a playground"],
                "answer": ["The park by the lake"],
                "selectedOption": null
            },
            {
                "id": 23,
                "question": "What foods did Tom suggest they bring?",
                "options": ["Pizza and soda", "Sandwiches, fruit, and drinks", "Burgers and fries", "Hot dogs and chips"],
                "answer": ["Sandwiches, fruit, and drinks"],
                "selectedOption": null
            },
            {
                "id": 24,
                "question": "What games did they decide to bring?",
                "options": ["A soccer ball and a kite", "A frisbee and board games", "A basketball and cards", "A volleyball and a puzzle"],
                "answer": ["A frisbee and board games"],
                "selectedOption": null
            },
            {
                "id": 25,
                "question": "How was the weather on the day of the picnic?",
                "options": ["Rainy", "Cold", "Perfect", "Windy"],
                "answer": ["Perfect"],
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
            <div className='pt-7 flex flex-col items-center'>
                <h2>Planning a Picnic</h2>
                <p className='mb-2 px-10 text-justify font-light text-gray-700'>



                    Sarah and her friends decided to go on a picnic. They chose a beautiful park that was not too far from their homes. Sarah asked, "Which park should we go to?" Her friend, Tom, replied, "We should go to the park by the lake. It’s so peaceful there." They all agreed and started packing their picnic baskets. Sarah asked, "What foods should we bring?" Tom suggested sandwiches, fruit, and drinks. Sarah wondered, "Should we need any games to play?" They decided to bring a frisbee and some board games. On the day of the picnic, the weather was perfect. Sarah asked, "Can we leave now?" Everyone was ready, and they had a fantastic day at the park.</p>
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
